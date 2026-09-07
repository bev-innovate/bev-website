/**
 * Sets up and checks the Airtable mirror, so nothing about it has to be taken on trust.
 *
 *   npm run airtable:setup           # ask for the token, verify it, offer the rest
 *   npm run airtable:check           # verify what is already configured
 *   npm run airtable:check -- --send # also write one clearly-labelled test row per table
 *
 * The mirror is deliberately non-fatal: if Airtable rejects a write, the visitor still gets
 * a confirmation and the row still lands in Supabase. That is the right behaviour, and it
 * is also why a broken column name would go unnoticed for weeks. This makes it checkable.
 *
 * The token is typed at a hidden prompt or read from .env.local. Never pass it as a command
 * line argument: it would be recorded in your shell history in the clear.
 */

import { execFileSync, execSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { createInterface } from "node:readline";

import { config } from "dotenv";

config({ path: ".env.local" });
config({ path: ".env" });

/** Filled in by resolveCredentials(), which may prompt in setup mode. */
let token = process.env.AIRTABLE_TOKEN;
let base = process.env.AIRTABLE_BASE_ID;

/** The base the enquiry form lives in. Only used as a prompt default. */
const DEFAULT_BASE = "appxKGcCrGkqLk1vM";

const enquiriesTable = process.env.AIRTABLE_ENQUIRIES_TABLE ?? "Enquiries";
const subscribersTable = process.env.AIRTABLE_SUBSCRIBERS_TABLE ?? "Subscribers";

const setupMode = process.argv.includes("--setup");

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

/* ── Prompts ────────────────────────────────────────────────────────────────── */

/*
  One interface for the whole run, created on first use.

  Deliberately not one per question: closing a readline interface discards whatever it has
  already buffered from stdin, so a second interface silently never sees the rest of the
  input. That is invisible on a terminal, where you type one line at a time, and breaks the
  moment anything is piped in.
*/
let rl: ReturnType<typeof createInterface> | null = null;
let muted = false;
let currentPrompt = "";

function prompts() {
  if (rl) return rl;

  rl = createInterface({ input: process.stdin, output: process.stdout, terminal: true });

  /*
    Mute the echo for secrets, so a token is not left on screen or in a scrollback buffer
    that gets pasted into a bug report later. readline writes the prompt through the same
    channel as the typed characters, so the prompt is let through and the rest swallowed.
  */
  const target = rl as unknown as { _writeToOutput: (chunk: string) => void };
  const original = target._writeToOutput.bind(rl);
  target._writeToOutput = (chunk: string) => {
    if (!muted || chunk.includes(currentPrompt)) original(chunk);
  };

  return rl;
}

function ask(question: string, { secret = false } = {}): Promise<string> {
  return new Promise((resolve) => {
    const io = prompts();
    currentPrompt = question;
    muted = secret;

    io.question(question, (answer) => {
      muted = false;
      if (secret) process.stdout.write("\n");
      resolve(answer.trim());
    });
  });
}

async function confirm(question: string) {
  const answer = await ask(`${question} [y/N] `);
  return /^y(es)?$/i.test(answer);
}

/* ── Credentials ────────────────────────────────────────────────────────────── */

async function resolveCredentials() {
  if (token && base) return;

  if (!setupMode) {
    bail(
      "AIRTABLE_TOKEN and AIRTABLE_BASE_ID are not both set.\n" +
        "  Run `npm run airtable:setup` to be walked through it, or fill them into\n" +
        "  .env.local by hand. Create the token at https://airtable.com/create/tokens.",
    );
  }

  if (!base) {
    base =
      (await ask(`  Base ID [${DEFAULT_BASE}]: `)) || DEFAULT_BASE;
  }

  if (!token) {
    console.log(
      "\n  Create a token at https://airtable.com/create/tokens, scoped to this base with\n" +
        "  `data.records:write`, plus `schema.bases:read` if you want the column check.\n" +
        "  It is not echoed as you type or paste it.\n",
    );
    token = await ask("  Airtable token: ", { secret: true });
    if (!token) bail("No token given, so there is nothing to check.");
  }
}

/** Adds or replaces the two keys in .env.local, leaving every other line alone. */
function saveToEnvLocal() {
  const path = ".env.local";
  const existing = existsSync(path) ? readFileSync(path, "utf8") : "";
  const values: Record<string, string> = {
    AIRTABLE_TOKEN: token!,
    AIRTABLE_BASE_ID: base!,
  };

  let output = existing;
  for (const [key, value] of Object.entries(values)) {
    const line = `${key}=${value}`;
    const pattern = new RegExp(`^${key}=.*$`, "m");
    output = pattern.test(output)
      ? output.replace(pattern, line)
      : `${output.replace(/\n*$/, "")}\n${line}\n`;
  }

  writeFileSync(path, output.startsWith("\n") ? output.slice(1) : output);
  console.log(`  Saved to ${path}, which is gitignored.\n`);
}

/* ── Vercel ─────────────────────────────────────────────────────────────────── */

const VERCEL_ENVIRONMENTS = ["production", "preview", "development"] as const;

function hasVercelCli() {
  try {
    execSync("vercel --version", { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
}

/**
 * Pushes both values to Vercel, which is the step that actually makes the mirror live.
 *
 * `vercel env add` refuses to overwrite, by design. Rather than removing a value someone
 * may have set deliberately, a clash is reported with the command to clear it.
 */
function pushToVercel() {
  if (!existsSync(".vercel/project.json")) {
    console.log(
      "  This checkout is not linked to a Vercel project. Run `vercel link` first, then\n" +
        "  `npm run airtable:setup` again.\n",
    );
    return;
  }

  const values: Record<string, string> = {
    AIRTABLE_TOKEN: token!,
    AIRTABLE_BASE_ID: base!,
  };

  for (const [key, value] of Object.entries(values)) {
    for (const environment of VERCEL_ENVIRONMENTS) {
      try {
        execFileSync("vercel", ["env", "add", key, environment], {
          input: `${value}\n`,
          stdio: ["pipe", "ignore", "pipe"],
        });
        console.log(`  SET            ${key} → ${environment}`);
      } catch (error) {
        const detail = String((error as { stderr?: Buffer }).stderr ?? error).trim();
        const clash = /already exists/i.test(detail);
        console.log(
          clash
            ? `  EXISTS         ${key} → ${environment}. To replace it: vercel env rm ${key} ${environment}`
            : `  FAILED         ${key} → ${environment}: ${detail.split("\n")[0]}`,
        );
      }
    }
  }

  console.log(
    "\n  Environment variables are picked up by the next deployment, so redeploy before\n" +
      "  expecting a submission to reach Airtable.\n",
  );
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

  const cameFromEnv = Boolean(token && base);
  await resolveCredentials();

  const schemaOk = await checkSchema();

  // In check mode the flags decide; in setup mode each step is offered in turn, because
  // the whole point is that nobody has to remember what the next step was.
  if (!setupMode) {
    if (process.argv.includes("--send")) {
      await sendTestRows();
    } else if (schemaOk) {
      console.log("  Looks right. Run with --send to write a test row and see it land.\n");
    }
    return;
  }

  if (schemaOk === false && !(await confirm("  Columns are missing. Carry on anyway?"))) {
    console.log(
      "\n  Nothing was changed. Fix the columns, or tell me the names your base already\n" +
        "  uses and the mirror can be mapped onto them instead.\n",
    );
    return;
  }

  if (!cameFromEnv && (await confirm("  Save these to .env.local?"))) saveToEnvLocal();

  if (await confirm("  Write a test row into each table?")) await sendTestRows();

  if (!hasVercelCli()) {
    console.log(
      "  The Vercel CLI is not installed, so the last step has to be done in the dashboard:\n" +
        "  Project → Settings → Environment Variables. Add AIRTABLE_TOKEN and\n" +
        "  AIRTABLE_BASE_ID to all three environments, then redeploy.\n",
    );
    return;
  }

  if (await confirm("  Set both variables on Vercel now? This is what makes it live.")) {
    pushToVercel();
  } else {
    console.log(
      "\n  Left alone. Until they are set on Vercel the mirror stays inert on the deployed\n" +
        "  site, whatever .env.local says.\n",
    );
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => rl?.close());
