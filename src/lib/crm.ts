import "server-only";

/**
 * Writes form submissions into the BEV CRM base in Airtable.
 *
 * The CRM is a curated table the team works in by hand every day, so this module is
 * deliberately conservative about what it touches. It upserts on email rather than
 * appending, it merges multi-select values instead of replacing them, and it never
 * invents a new select option. A signup should look like a row the team could have
 * typed themselves.
 *
 * Field ids rather than field names. Renaming a column in the Airtable UI is a normal
 * thing for the team to do, and a write keyed on the old label would fail silently with
 * nobody able to connect the two events.
 */

const AIRTABLE_ENDPOINT = "https://api.airtable.com/v0";

/** Give up rather than hold the visitor's form submission open. */
const TIMEOUT_MS = 6000;

/** Contacts, in the BEV CRM base. */
const CONTACTS_TABLE = process.env.AIRTABLE_CONTACTS_TABLE ?? "tbl0XppJlG1f4QPXz";

const FIELD = {
  firstName: "fldUdnihpfG8lw4sr",
  lastName: "fldZPlY1Tj40fEG4J",
  email: "fldMHaANPb45WipRf",
  newsletter: "fld2y9qtdQZzIlAoH",
  source: "fldBAc0wMorrkIG1L",
  engagement: "fldRM5NNeYDc1nj59",
} as const;

/**
 * Source options, which must already exist in the CRM.
 *
 * Both of these are pre-existing options the team already filters on. Writes go out with
 * `typecast` off precisely so that a renamed or deleted option fails loudly here rather
 * than quietly creating a near-duplicate option in a field that already has 28 of them.
 */
export const SOURCE_NEWSLETTER = "Newsletter Form";
export const SOURCE_ENQUIRY = "Contacted Us";

const SUBSCRIBED = "Yes";
const UNSUBSCRIBED = "Unsubscribe";

export const isCrmConfigured = Boolean(
  process.env.AIRTABLE_TOKEN && process.env.AIRTABLE_BASE_ID,
);

interface ContactRecord {
  id: string;
  fields: Record<string, unknown>;
}

async function request(
  path: string,
  init: { method: string; body?: unknown },
): Promise<{ ok: true; data: unknown } | { ok: false; detail: string }> {
  const token = process.env.AIRTABLE_TOKEN;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const response = await fetch(`${AIRTABLE_ENDPOINT}/${path}`, {
      method: init.method,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: init.body === undefined ? undefined : JSON.stringify(init.body),
      signal: controller.signal,
    });
    if (!response.ok) {
      return { ok: false, detail: `${response.status} ${await response.text()}` };
    }
    return { ok: true, data: await response.json() };
  } catch (error) {
    return { ok: false, detail: String(error) };
  } finally {
    clearTimeout(timer);
  }
}

/** Airtable formula strings are double quoted, so a quote or backslash has to be escaped. */
function quote(value: string) {
  return `"${value.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
}

/**
 * Finds an existing contact by email.
 *
 * Alternative Email is checked too. People hand a work address to one form and a personal
 * one to another, and the team has already done the work of recording both; matching on
 * only the primary would create a second row for someone already in the CRM.
 *
 * Formulas address fields by name rather than id, which is an Airtable constraint and the
 * one place in this module where a rename would bite.
 */
async function findContact(base: string, email: string): Promise<ContactRecord | null> {
  const target = quote(email);
  const formula = `OR(LOWER({Email})=${target},LOWER({Alternative Email})=${target})`;
  const query = new URLSearchParams({
    filterByFormula: formula,
    maxRecords: "1",
    returnFieldsByFieldId: "true",
  });

  const result = await request(`${base}/${CONTACTS_TABLE}?${query}`, { method: "GET" });
  if (!result.ok) {
    console.error("[crm] contact lookup failed", result.detail);
    return null;
  }

  const records = (result.data as { records?: ContactRecord[] }).records ?? [];
  return records[0] ?? null;
}

function asStringArray(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((v): v is string => typeof v === "string") : [];
}

/**
 * Has the team marked this person as someone not to mail?
 *
 * "Do Not Engage" is set by hand, usually for a reason that is not visible from here: a
 * bounced address, a duplicate, or somebody who asked to be left alone. A web form must
 * not be able to undo it, so the signup is still recorded against Source and only the
 * subscription flag is withheld.
 */
function isSuppressed(fields: Record<string, unknown>) {
  return asStringArray(fields[FIELD.engagement]).some((value) =>
    value.startsWith("Do Not Engage"),
  );
}

export interface ContactInput {
  email: string;
  firstName?: string;
  lastName?: string;
  /** One of the exported SOURCE_ constants. */
  source: string;
  /** Whether this submission is an explicit opt in to the newsletter. */
  subscribed: boolean;
}

export type CrmResult =
  | { ok: true; recordId: string | null; created: boolean }
  | { ok: false };

/**
 * Adds or updates a person in Contacts.
 *
 * New people are created outright. Existing people are patched with the narrowest change
 * that records what just happened: the new Source is merged into whatever is already
 * there, and a name is only filled in when the CRM has none, so a form submission can
 * never overwrite a name the team corrected by hand.
 */
export async function upsertContact(input: ContactInput): Promise<CrmResult> {
  const base = process.env.AIRTABLE_BASE_ID;
  if (!process.env.AIRTABLE_TOKEN || !base) return { ok: true, recordId: null, created: false };

  const email = input.email.trim().toLowerCase();
  const existing = await findContact(base, email);

  if (!existing) {
    const fields: Record<string, unknown> = {
      [FIELD.email]: email,
      [FIELD.source]: [input.source],
    };
    if (input.firstName) fields[FIELD.firstName] = input.firstName;
    if (input.lastName) fields[FIELD.lastName] = input.lastName;
    if (input.subscribed) fields[FIELD.newsletter] = SUBSCRIBED;

    const result = await request(`${base}/${CONTACTS_TABLE}`, {
      method: "POST",
      body: { records: [{ fields }], typecast: false, returnFieldsByFieldId: true },
    });
    if (!result.ok) {
      console.error("[crm] failed to create contact", result.detail);
      return { ok: false };
    }
    const created = (result.data as { records?: ContactRecord[] }).records?.[0];
    return { ok: true, recordId: created?.id ?? null, created: true };
  }

  const fields: Record<string, unknown> = {};

  const sources = asStringArray(existing.fields[FIELD.source]);
  if (!sources.includes(input.source)) {
    fields[FIELD.source] = [...sources, input.source];
  }

  if (input.firstName && !existing.fields[FIELD.firstName]) {
    fields[FIELD.firstName] = input.firstName;
  }
  if (input.lastName && !existing.fields[FIELD.lastName]) {
    fields[FIELD.lastName] = input.lastName;
  }

  /*
    An explicit signup is consent, so it overrides a previous "Unsubscribe": the person
    has just asked again, in their own words. A team-set "Do Not Engage" is different and
    is left alone, because that decision was not the visitor's to reverse.
  */
  if (input.subscribed && !isSuppressed(existing.fields)) {
    if (existing.fields[FIELD.newsletter] !== SUBSCRIBED) {
      fields[FIELD.newsletter] = SUBSCRIBED;
    }
  }

  // Nothing new to say about someone already on file.
  if (Object.keys(fields).length === 0) {
    return { ok: true, recordId: existing.id, created: false };
  }

  const result = await request(`${base}/${CONTACTS_TABLE}`, {
    method: "PATCH",
    body: {
      records: [{ id: existing.id, fields }],
      typecast: false,
      returnFieldsByFieldId: true,
    },
  });
  if (!result.ok) {
    console.error("[crm] failed to update contact", result.detail);
    return { ok: false };
  }
  return { ok: true, recordId: existing.id, created: false };
}

/** Exported for the unsubscribe path and for tests: the value the CRM uses for opting out. */
export const UNSUBSCRIBED_VALUE = UNSUBSCRIBED;

/** Enquiries, in the BEV CRM base. One row per message. */
const ENQUIRIES_TABLE = process.env.AIRTABLE_ENQUIRIES_TABLE ?? "tblgqznGLPaQqXFaW";

const ENQUIRY_FIELD = {
  name: "fldNbY6hBsBuz9Xrc",
  email: "fldPcL0OfhzlYBnvB",
  firstName: "fldEZk1u8rWgNCPOE",
  lastName: "fldUVi8PhK1gp0LtY",
  interest: "fldtJYWgbujAOSTwY",
  goals: "fldqaPVRThOVI2Hhx",
  subscribe: "fldOgSJm40rGnHeLe",
  status: "fldAxeDPMBhnvayWO",
  contact: "fldQgwteweQOzEosD",
} as const;

export interface EnquiryInput {
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  /** Already resolved to its display label by the caller. */
  interest: string;
  goals: string;
  subscribe: boolean;
  /** The Contacts record this enquiry belongs to, when the upsert produced one. */
  contactId: string | null;
}

/**
 * Files one enquiry.
 *
 * The message lives here rather than in Contacts because a person can write in more than
 * once, and squashing several enquiries into one contact's notes would lose all but the
 * last. The link back to Contacts is what keeps the two views joined up.
 *
 * Status opens as "New" so an unworked enquiry is visible in a view without anyone having
 * to remember to set it.
 */
export async function createEnquiry(input: EnquiryInput): Promise<CrmResult> {
  const base = process.env.AIRTABLE_BASE_ID;
  if (!process.env.AIRTABLE_TOKEN || !base) return { ok: true, recordId: null, created: false };

  const fields: Record<string, unknown> = {
    [ENQUIRY_FIELD.name]: input.name,
    [ENQUIRY_FIELD.firstName]: input.firstName,
    [ENQUIRY_FIELD.lastName]: input.lastName,
    [ENQUIRY_FIELD.email]: input.email.trim().toLowerCase(),
    [ENQUIRY_FIELD.interest]: input.interest,
    [ENQUIRY_FIELD.goals]: input.goals,
    [ENQUIRY_FIELD.subscribe]: input.subscribe,
    [ENQUIRY_FIELD.status]: "New",
  };
  if (input.contactId) fields[ENQUIRY_FIELD.contact] = [input.contactId];

  const result = await request(`${base}/${ENQUIRIES_TABLE}`, {
    method: "POST",
    body: { records: [{ fields }], typecast: false, returnFieldsByFieldId: true },
  });
  if (!result.ok) {
    console.error("[crm] failed to file enquiry", result.detail);
    return { ok: false };
  }

  const created = (result.data as { records?: ContactRecord[] }).records?.[0];
  return { ok: true, recordId: created?.id ?? null, created: true };
}
