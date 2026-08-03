import "server-only";

/**
 * Outbound notifications for form submissions.
 *
 * Both channels are deliberately *after* the database write and deliberately non-fatal.
 * Supabase is the system of record; email and Airtable are copies. If Resend is having a
 * bad morning the enquiry is still captured, and the visitor still gets a confirmation.
 *
 * Everything here is a no-op until its env vars are set, so the site deploys and runs with
 * none of them configured.
 */

const RESEND_ENDPOINT = "https://api.resend.com/emails";
const AIRTABLE_ENDPOINT = "https://api.airtable.com/v0";

/** Give up rather than hold the visitor's form submission open. */
const TIMEOUT_MS = 6000;

async function post(url: string, token: string, body: unknown) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
    if (!response.ok) {
      return { ok: false as const, detail: `${response.status} ${await response.text()}` };
    }
    return { ok: true as const };
  } catch (error) {
    return { ok: false as const, detail: String(error) };
  } finally {
    clearTimeout(timer);
  }
}

function escapeHtml(value: string) {
  return value.replace(
    /[&<>"']/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!,
  );
}

export interface Enquiry {
  name: string;
  email: string;
  organisation?: string | null;
  topic: string;
  message: string;
}

const topicLabels: Record<string, string> = {
  programme: "Programme enquiry",
  partnership: "Partnership",
  media: "Media",
  other: "Other",
};

export const isEmailConfigured = Boolean(process.env.RESEND_API_KEY);
export const isAirtableConfigured = Boolean(
  process.env.AIRTABLE_TOKEN && process.env.AIRTABLE_BASE_ID,
);

/**
 * Emails the team a copy of the enquiry.
 *
 * `replyTo` is the sender, so hitting reply in the inbox answers the person directly
 * rather than starting a thread with the robot.
 */
export async function sendEnquiryEmail(enquiry: Enquiry) {
  const key = process.env.RESEND_API_KEY;
  if (!key) return { ok: true as const, sent: false as const };

  const to = (process.env.ENQUIRY_NOTIFY_TO ?? "innovate@betterearthventures.com")
    .split(",")
    .map((address) => address.trim())
    .filter(Boolean);

  const rows: [string, string][] = [
    ["Name", enquiry.name],
    ["Email", enquiry.email],
    ["Organisation", enquiry.organisation || "Not given"],
    ["Topic", topicLabels[enquiry.topic] ?? enquiry.topic],
  ];

  const result = await post(RESEND_ENDPOINT, key, {
    from: process.env.ENQUIRY_NOTIFY_FROM ?? "Better Earth Ventures <onboarding@resend.dev>",
    to,
    reply_to: enquiry.email,
    subject: `${topicLabels[enquiry.topic] ?? "Enquiry"} from ${enquiry.name}`,
    html: `
      <div style="font-family:ui-sans-serif,system-ui,sans-serif;font-size:15px;line-height:1.6;color:#2f2b33">
        <h2 style="margin:0 0 16px;font-size:18px">New website enquiry</h2>
        <table cellpadding="0" cellspacing="0" style="margin-bottom:20px">
          ${rows
            .map(
              ([label, value]) =>
                `<tr><td style="padding:2px 16px 2px 0;color:#5b545f">${label}</td><td style="padding:2px 0"><strong>${escapeHtml(value)}</strong></td></tr>`,
            )
            .join("")}
        </table>
        <div style="border-left:3px solid #540178;padding-left:16px;white-space:pre-wrap">${escapeHtml(enquiry.message)}</div>
      </div>
    `,
  });

  if (!result.ok) console.error("[notify] enquiry email failed", result.detail);
  return { ok: result.ok, sent: result.ok };
}

/** Notifies the team of a newsletter signup. Quieter than the enquiry mail: one line. */
export async function sendSubscribeEmail(email: string, source: string) {
  const key = process.env.RESEND_API_KEY;
  if (!key || process.env.NOTIFY_ON_SUBSCRIBE !== "true") {
    return { ok: true as const, sent: false as const };
  }

  const result = await post(RESEND_ENDPOINT, key, {
    from: process.env.ENQUIRY_NOTIFY_FROM ?? "Better Earth Ventures <onboarding@resend.dev>",
    to: (process.env.ENQUIRY_NOTIFY_TO ?? "innovate@betterearthventures.com").split(",").map((a) => a.trim()),
    subject: `New subscriber: ${email}`,
    html: `<p style="font-family:ui-sans-serif,system-ui,sans-serif">${escapeHtml(email)} subscribed from <strong>${escapeHtml(source)}</strong>.</p>`,
  });

  if (!result.ok) console.error("[notify] subscribe email failed", result.detail);
  return { ok: result.ok, sent: result.ok };
}

/**
 * Mirrors a submission into Airtable.
 *
 * `typecast: true` lets Airtable coerce a string into a single-select option, so the topic
 * field works without the option having to pre-exist with an exact-match name.
 *
 * Field names are read from env rather than hardcoded, because renaming a column in the
 * Airtable UI silently breaks a hardcoded key and nobody would connect the two.
 */
export async function mirrorToAirtable(
  table: "enquiries" | "subscribers",
  fields: Record<string, unknown>,
) {
  const token = process.env.AIRTABLE_TOKEN;
  const base = process.env.AIRTABLE_BASE_ID;
  if (!token || !base) return { ok: true as const, mirrored: false as const };

  const tableName =
    table === "enquiries"
      ? (process.env.AIRTABLE_ENQUIRIES_TABLE ?? "Enquiries")
      : (process.env.AIRTABLE_SUBSCRIBERS_TABLE ?? "Subscribers");

  const result = await post(
    `${AIRTABLE_ENDPOINT}/${base}/${encodeURIComponent(tableName)}`,
    token,
    { records: [{ fields }], typecast: true },
  );

  if (!result.ok) console.error(`[notify] Airtable mirror to ${tableName} failed`, result.detail);
  return { ok: result.ok, mirrored: result.ok };
}
