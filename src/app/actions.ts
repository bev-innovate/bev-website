"use server";

import { z } from "zod";

import {
  SOURCE_ENQUIRY,
  SOURCE_NEWSLETTER,
  createEnquiry,
  isCrmConfigured,
  upsertContact,
} from "@/lib/crm";
import { enquirySchema, flattenIssues, interestLabels } from "@/lib/enquiry";
import { sendEnquiryEmail, sendSubscribeEmail } from "@/lib/notify";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase";

export interface FormState {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Record<string, string>;
}

/**
 * Where a signup came from. An allowlist rather than free text: the field arrives from
 * the browser, and it ends up in a database column the team filters on.
 */
const subscribeSources = ["website_footer", "summit_page"] as const;

const subscribeSchema = z.object({
  email: z.string().trim().email("Enter a valid email address."),
  source: z.enum(subscribeSources).catch("website_footer"),
  // Honeypot: bots fill hidden fields, humans do not.
  company: z.string().max(0).optional(),
});

function flatten(error: z.ZodError): Record<string, string> {
  return flattenIssues(error);
}

async function persist(table: string, row: Record<string, unknown>) {
  const supabase = getSupabaseAdmin();
  if (!supabase) return { ok: false as const };

  const { error } = await supabase.from(table).insert(row);
  if (error) {
    console.error(`[forms] failed to insert into ${table}`, error);
    return { ok: false as const };
  }
  return { ok: true as const };
}

/** Which service is holding the submission, rather than merely copying it. */
type Store = "supabase" | "airtable" | "none";

/**
 * Writes a submission somewhere durable and says where it went.
 *
 * Supabase is the system of record whenever it is configured, with Airtable alongside as a
 * mirror that is never allowed to fail the request. When Supabase is not configured,
 * Airtable is promoted from mirror to system of record: one of the two is enough to go
 * live, so a submission is never logged and lost while the visitor is told it arrived.
 *
 * The mirror is awaited rather than fired off. A promise left running after the response
 * is returned can be killed with the serverless instance, and a lost signup is exactly
 * what this is here to prevent.
 */
async function capture(
  supabaseTable: string,
  row: Record<string, unknown>,
  mirror: () => Promise<{ ok: boolean }>,
): Promise<{ ok: boolean; store: Store }> {
  if (isSupabaseConfigured) {
    const [stored] = await Promise.all([persist(supabaseTable, row), mirror()]);
    return { ok: stored.ok, store: "supabase" };
  }

  if (isCrmConfigured) {
    const mirrored = await mirror();
    return { ok: mirrored.ok, store: "airtable" };
  }

  console.warn(
    `[forms] nothing configured: ${supabaseTable} submission was NOT stored anywhere`,
    row,
  );
  return { ok: true, store: "none" };
}

/**
 * True on the live site only.
 *
 * With nothing configured a submission goes nowhere. On a preview or a local run that is
 * fine and the form should still demo. In production it is data loss, and the visitor is
 * better off being told to email us than being thanked for a signup that did not happen.
 */
const isLive = process.env.VERCEL_ENV === "production";

const FALLBACK =
  "We could not save that. Email innovate@betterearthventures.com and we will add you.";

export async function subscribeAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const parsed = subscribeSchema.safeParse({
    email: formData.get("email"),
    source: formData.get("source") ?? "website_footer",
    company: formData.get("company") ?? "",
  });

  if (!parsed.success) {
    return { status: "error", fieldErrors: flatten(parsed.error) };
  }

  const email = parsed.data.email.toLowerCase();
  const source = parsed.data.source;

  /*
    Which page the signup came from is kept in Supabase, where it is a plain column. The
    CRM records it as the single Source option the team already filters on, because adding
    a per-page option to a field with 28 of them would be noise rather than information.
  */
  const stored = await capture("newsletter_subscribers", { email, source }, () =>
    upsertContact({ email, source: SOURCE_NEWSLETTER, subscribed: true }),
  );

  // Notification is a courtesy to the team and logs its own failures.
  await sendSubscribeEmail(email, source);

  if (!stored.ok) {
    return {
      status: "error",
      message: "Something went wrong on our side. Please try again shortly.",
    };
  }

  if (stored.store === "none" && isLive) {
    return { status: "error", message: FALLBACK };
  }

  return { status: "success", message: "You’re on the list. Look out for the next dispatch." };
}

export async function enquiryAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const parsed = enquirySchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    interest: formData.get("interest") ?? "",
    goals: formData.get("goals"),
    subscribe: formData.get("subscribe") === "on",
    company: formData.get("company") ?? "",
  });

  if (!parsed.success) {
    return { status: "error", fieldErrors: flatten(parsed.error) };
  }

  // `company` is the honeypot, validated above, never stored.
  const { firstName, lastName, interest, goals, subscribe } = parsed.data;
  const email = parsed.data.email.toLowerCase();
  const name = `${firstName} ${lastName}`;

  const interestLabel = interest ? (interestLabels[interest] ?? interest) : "Not specified";

  /*
    `name` is still written alongside first and last. The column predates the split and
    other things may read it; joining the two here costs nothing and breaks nothing.
  */
  /*
    Two writes, in order and not in parallel: the person goes into Contacts first so the
    enquiry can be filed against them. A failed upsert is not fatal to the enquiry, which
    is simply filed unlinked rather than dropped.
  */
  const stored = await capture(
    "enquiries",
    {
      name,
      first_name: firstName,
      last_name: lastName,
      email,
      interest: interest || null,
      message: goals,
      subscribe: Boolean(subscribe),
    },
    async () => {
      const contact = await upsertContact({
        email,
        firstName,
        lastName,
        source: SOURCE_ENQUIRY,
        subscribed: Boolean(subscribe),
      });

      return createEnquiry({
        name,
        firstName,
        lastName,
        email,
        interest: interestLabel,
        goals,
        subscribe: Boolean(subscribe),
        contactId: contact.ok ? contact.recordId : null,
      });
    },
  );

  /*
    Ticking the box puts them on the list as well as in the enquiry record. The CRM side is
    already done, since the upsert above set the subscription flag on the contact; what is
    left is the Supabase row, which is a separate table there. Its failure is not fatal:
    the enquiry itself is the thing that must not be lost.
  */
  await Promise.allSettled([
    sendEnquiryEmail({ name, email, interest: interestLabel, goals, subscribe: Boolean(subscribe) }),
    subscribe
      ? capture("newsletter_subscribers", { email, source: "enquiry_form" }, async () => ({
          ok: true,
        }))
      : Promise.resolve(),
  ]);

  if (!stored.ok || (stored.store === "none" && isLive)) {
    return {
      status: "error",
      message: "We couldn’t send that. Email innovate@betterearthventures.com and we’ll pick it up.",
    };
  }

  return {
    status: "success",
    message:
      stored.store === "none"
        ? "Thanks: message received."
        : "Thanks: we’ve got it. Expect a reply within a few working days.",
  };
}
