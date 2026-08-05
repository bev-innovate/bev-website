"use server";

import { z } from "zod";

import { enquirySchema, flattenIssues, interestLabels } from "@/lib/enquiry";
import {
  mirrorToAirtable,
  sendEnquiryEmail,
  sendSubscribeEmail,
} from "@/lib/notify";
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

function flatten(error: z.ZodError): Record<string, string> {
  return flattenIssues(error);
}

/**
 * When Supabase is not configured the submission is logged and reported as received.
 * That keeps the first draft demoable; wire the env vars up and it starts persisting.
 */
async function persist(table: string, row: Record<string, unknown>) {
  const supabase = getSupabaseAdmin();

  if (!supabase) {
    console.info(`[forms] Supabase not configured: ${table} submission not persisted`, row);
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

  const email = parsed.data.email.toLowerCase();
  const source = "website_footer";
  const result = await persist("newsletter_subscribers", { email, source });

  // After the write, and never fatal: a mirror failing must not lose the signup.
  await Promise.allSettled([
    mirrorToAirtable("subscribers", { Email: email, Source: source }),
    sendSubscribeEmail(email, source),
  ]);

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

  // `company` is the honeypot — validated above, never stored.
  const { firstName, lastName, interest, goals, subscribe } = parsed.data;
  const email = parsed.data.email.toLowerCase();
  const name = `${firstName} ${lastName}`;

  /*
    `name` is still written alongside first and last. The column predates the split and
    other things may read it; joining the two here costs nothing and breaks nothing.
  */
  const result = await persist("enquiries", {
    name,
    first_name: firstName,
    last_name: lastName,
    email,
    interest: interest || null,
    message: goals,
    subscribe: Boolean(subscribe),
  });

  const interestLabel = interest ? (interestLabels[interest] ?? interest) : "Not specified";

  /*
    Notify after the write, and never let a notification failure fail the submission.
    `allSettled` rather than `all`: one channel being down must not take the other with it.
    Both log their own errors.
  */
  await Promise.allSettled([
    sendEnquiryEmail({ name, email, interest: interestLabel, goals, subscribe: Boolean(subscribe) }),
    mirrorToAirtable("enquiries", {
      Name: name,
      "First name": firstName,
      "Last name": lastName,
      Email: email,
      Interest: interestLabel,
      Goals: goals,
      Subscribe: Boolean(subscribe),
    }),
    // Ticking the box puts them on the list as well as in the enquiry record.
    subscribe
      ? mirrorToAirtable("subscribers", { Email: email, Source: "enquiry_form" })
      : Promise.resolve(),
  ]);

  if (subscribe) {
    await persist("newsletter_subscribers", { email, source: "enquiry_form" });
  }

  if (!result.ok) {
    return {
      status: "error",
      message: "We couldn’t send that. Email innovate@betterearthventures.com and we’ll pick it up.",
    };
  }

  return {
    status: "success",
    message: isSupabaseConfigured
      ? "Thanks: we’ve got it. Expect a reply within a few working days."
      : "Thanks: message received.",
  };
}
