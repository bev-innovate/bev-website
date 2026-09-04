/**
 * Checks that the Airtable mirror will actually work before a real submission depends on it.
 *
 *   npm run airtable:check           # read the base schema and diff it against what we write
 *   npm run airtable:check -- --send # also write one clearly-labelled test row per table
 *
 * The mirror is deliberately non-fatal: if Airtable rejects a write, the visitor still gets
 * a confirmation and the row still lands in Supabase. That is the right behaviour, and it
 * is also why a broken column name would go unnoticed for weeks. This makes it checkable.
 *
 * Reads AIRTABLE_TOKEN and AIRTABLE_BASE_ID from .env.local. Never pass a token on the
 * command line: it ends up in your shell history.
 */

import { config } from "dotenv";

config({ path: ".env.local" });
config({ path: ".env" });

const token = process.env.AIRTABLE_TOKEN;
const base = process.env.AIRTABLE_BASE_ID;

const enquiriesTable = process.env.AIRTABLE_ENQUIRIES_TABLE ?? "Enquiries";
const subscribersTable = process.env.AIRTABLE_SUBSCRIBERS_TABLE ?? "Subscribers";

/**
 * The columns src/lib/notify.ts writes, per table.
 *
 * Kept in step by hand: if the shape of a submission changes, both this and the mirror
 * need the same edit, and the check is what catches it if only one of them gets it.
 */
const expected: Record<string, string[]> = {
  [enquiriesTable]: [
    "Name",
    "First name",
    "Last name",
    "Email",
    "Interest",
    "Goals",
    "Subscribe",
  ],
  [subscribersTable]: ["Email", "Source"],
};

interface AirtableField {
  name: string;
  type: string;
}
interface AirtableTable {
  id: string;
  name: string;
  fields: AirtableField[];
}

function bail(message: string): never {
  console.error(`\n  ${message}\n`);
  process.exit(1);
}

async function call(path: string, init?: RequestInit) {
  const response = await fetch(`https://api.airtable.com/v0/${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });
  const text = await response.text();
  let body: unknown = text;
  try {
    body = JSON.parse(text);
  } catch {
    // Airtable returns HTML for a few error classes; keep the raw text in that case.
  }
  return { status: response.status, ok: response.ok, body };
}

/** Airtable nests its error message a couple of ways depending on the failure. */
function reason(body: unknown): string {
  const error = (body as { error?: unknown })?.error;
  if (typeof error === "string") return error;
  if (error && typeof error === "object") {
    const { type, message } = error as { type?: string; message?: string };
    return message ? `${type ?? "error"}: ${message}` : (type ?? JSON.stringify(error));
  }
  return typeof body === "string" ? body.slice(0, 200) : JSON.stringify(body).slice(0, 200);
}

async function checkSchema() {
  const result = await call(`meta/bases/${base}/tables`);

  if (result.status === 401) {
    bail("Airtable rejected the token (401). Check AIRTABLE_TOKEN in .env.local.");
  }

  if (result.status === 403) {
    console.log(
      "  The token cannot read the base schema, so column names could not be checked.\n" +
        "  Add the `schema.bases:read` scope to it if you want this check, or run with\n" +
        "  --send to verify by writing a real row instead.\n",
    );
    return null;
  }

  if (!result.ok) bail(`Could not read the base schema: ${reason(result.body)}`);

  const tables = (result.body as { tables: AirtableTable[] }).tables;
  console.log(`  Base ${base} has ${tables.length} table(s): ${tables.map((t) => t.name).join(", ")}\n`);

  let allGood = true;

  for (const [name, columns] of Object.entries(expected)) {
    const table = tables.find((t) => t.name === name);

    if (!table) {
      allGood = false;
      console.log(`  MISSING TABLE  ${name}`);
      console.log(
        `                 Create it, or point the env var at the table you already have\n` +
          `                 (AIRTABLE_${name === enquiriesTable ? "ENQUIRIES" : "SUBSCRIBERS"}_TABLE).\n`,
      );
      continue;
    }

    const present = new Set(table.fields.map((f) => f.name));
    const missing = columns.filter((c) => !present.has(c));

    if (missing.length === 0) {
      console.log(`  OK             ${name} — all ${columns.length} columns present`);
    } else {
      allGood = false;
      console.log(`  INCOMPLETE     ${name} — missing: ${missing.join(", ")}`);
      console.log(`                 Has: ${table.fields.map((f) => f.name).join(", ")}`);
    }
  }

  console.log("");
  if (!allGood) {
    console.log(
      "  Airtable is case-sensitive about column names, and a write that names an unknown\n" +
        "  column is rejected outright, so every column above has to match exactly. If your\n" +
        "  base already uses different names, do not rename them: say what they are and the\n" +
        "  mirror can map onto them instead.\n",
    );
  }

  return allGood;
}

/** Writes one obvious test row per table so the whole path can be seen working. */
async function sendTestRows() {
  const stamp = new Date().toISOString();
  const rows: [string, Record<string, unknown>][] = [
    [
      enquiriesTable,
      {
        Name: "Test Row",
        "First name": "Test",
        "Last name": "Row",
        Email: "test@betterearthventures.com",
        // A real option label from src/lib/enquiry.ts. `typecast` would happily invent a
        // new single-select option from anything else, which is not a mess a check should
        // leave behind.
        Interest: "Scale my startup with expert guidance",
        Goals: `Written by npm run airtable:check at ${stamp}. Safe to delete.`,
        Subscribe: false,
      },
    ],
    [
      subscribersTable,
      { Email: "test@betterearthventures.com", Source: "airtable_check" },
    ],
  ];

  console.log("  Writing test rows\n");

  for (const [table, fields] of rows) {
    const result = await call(`${base}/${encodeURIComponent(table)}`, {
      method: "POST",
      body: JSON.stringify({ records: [{ fields }], typecast: true }),
    });

    if (result.ok) {
      const id = (result.body as { records: { id: string }[] }).records[0]?.id;
      console.log(`  WROTE          ${table} — record ${id}, delete it once you have seen it`);
    } else {
      console.log(`  FAILED         ${table} — ${reason(result.body)}`);
    }
  }

  console.log("");
}

async function main() {
  console.log("");

  if (!token || !base) {
    bail(
      "AIRTABLE_TOKEN and AIRTABLE_BASE_ID are not both set.\n" +
        "  Copy .env.example to .env.local and fill them in. The base ID is the app… segment\n" +
        "  of the base URL; create the token at https://airtable.com/create/tokens.",
    );
  }

  const schemaOk = await checkSchema();

  if (process.argv.includes("--send")) {
    await sendTestRows();
  } else if (schemaOk) {
    console.log("  Looks right. Run with --send to write a test row and see it land.\n");
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
