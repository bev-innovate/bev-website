"use server";

import { z } from "zod";

import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase";

export interface FormState {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Record<string, string>;
}

const subscribeSchema = z.object({
  email: z.string().trim().email("Enter a valid email address."),
  // Honeypot: bots fill hidden fields, humans do not.
  company: z.string().max(0).optional(),
});

const enquirySchema = z.object({
  name: z.string().trim().min(2, "Tell us your name."),
  email: z.string().trim().email("Enter a valid email address."),
  organisation: z.string().trim().max(160).optional(),
  topic: z.enum(["programme", "partnership", "media", "other"]),
  message: z.string().trim().min(20, "A little more detail helps us route this properly."),
  company: z.string().max(0).optional(),
});

function flatten(error: z.ZodError): Record<string, string> {
  return Object.fromEntries(
    error.issues.map((issue) => [String(issue.path[0] ?? "form"), issue.message]),
  );
}

/**
 * When Supabase is not configured the submission is logged and reported as received.
 * That keeps the first draft demoable; wire the env vars up and it starts persisting.
 */
async function persist(table: string, row: Record<string, unknown>) {
  const supabase = getSupabaseAdmin();

  if (!supabase) {
    console.info(`[forms] Supabase not configured — ${table} submission not persisted`, row);
    return { ok: true as const, persisted: false as const };
  }

  const { error } = await supabase.from(table).insert(row);
  if (error) {
    console.error(`[forms] failed to insert into ${table}`, error);
    return { ok: false as const, persisted: false as const };
  }
  return { ok: true as const, persisted: true as const };
}

export async function subscribeAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const parsed = subscribeSchema.safeParse({
    email: formData.get("email"),
    company: formData.get("company") ?? "",
  });

  if (!parsed.success) {
    return { status: "error", fieldErrors: flatten(parsed.error) };
  }

  const result = await persist("newsletter_subscribers", {
    email: parsed.data.email.toLowerCase(),
    source: "website_footer",
  });

  if (!result.ok) {
    return {
      status: "error",
      message: "Something went wrong on our side. Please try again shortly.",
    };
  }

  return { status: "success", message: "You’re on the list. Look out for the next dispatch." };
}

export async function enquiryAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const parsed = enquirySchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    organisation: formData.get("organisation") ?? "",
    topic: formData.get("topic"),
    message: formData.get("message"),
    company: formData.get("company") ?? "",
  });

  if (!parsed.success) {
    return { status: "error", fieldErrors: flatten(parsed.error) };
  }

  // `company` is the honeypot — validated above, never stored.
  const result = await persist("enquiries", {
    name: parsed.data.name,
    email: parsed.data.email.toLowerCase(),
    organisation: parsed.data.organisation || null,
    topic: parsed.data.topic,
    message: parsed.data.message,
  });

  if (!result.ok) {
    return {
      status: "error",
      message: "We couldn’t send that. Email hello@betterearthventures.com and we’ll pick it up.",
    };
  }

  return {
    status: "success",
    message: isSupabaseConfigured
      ? "Thanks — we’ve got it. Expect a reply within a few working days."
      : "Thanks — message received.",
  };
}
