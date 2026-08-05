import { z } from "zod";

/**
 * The enquiry form's shape, shared by the client form and the server action.
 *
 * One schema, imported by both: the form validates against it as you leave a field, and
 * the action validates against it again on submit. Client validation is a courtesy, never
 * a control, so the server repeats every check.
 */

/**
 * "How would you like to be a part of the Better Earth ecosystem?"
 *
 * Carried over from the Wix form. Values are stable slugs so the wording can be edited
 * without orphaning rows already stored against the old label.
 */
export const interestOptions = [
  { value: "scale-startup", label: "Scale my startup with expert guidance" },
  {
    value: "collaborate-innovation",
    label: "Collaborate to develop and launch groundbreaking innovations",
  },
  { value: "invest", label: "Discover and invest in high-impact startups" },
  { value: "share-expertise", label: "Share my expertise to empower startups" },
  {
    value: "embed-programme",
    label: "Embed a new innovation programme or collaborate on an existing one",
  },
] as const;

export const interestValues = interestOptions.map((o) => o.value);

export const interestLabels: Record<string, string> = Object.fromEntries(
  interestOptions.map((o) => [o.value, o.label]),
);

export const enquirySchema = z.object({
  firstName: z.string().trim().min(1, "Please tell us your first name."),
  lastName: z.string().trim().min(1, "Please tell us your last name."),
  email: z.string().trim().min(1, "We need an email to reply to.").email("That email does not look right."),
  // Optional on the Wix form, and optional here: it has no asterisk and no default.
  interest: z.enum(interestValues as [string, ...string[]]).optional().or(z.literal("")),
  goals: z
    .string()
    .trim()
    .min(20, "A sentence or two helps us route this to the right person."),
  subscribe: z.boolean().optional(),
  // Honeypot: bots fill hidden fields, humans do not.
  company: z.string().max(0).optional(),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;

/**
 * Field-keyed messages, which is what both the form and the action want to render.
 *
 * First issue per field wins. Zod reports every failed check, so an empty email fails
 * both `min(1)` and `email()`; building this with `Object.fromEntries` kept the last one
 * and told people their blank field "does not look right".
 */
export function flattenIssues(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    if (!(key in out)) out[key] = issue.message;
  }
  return out;
}

/** Validates one field in isolation, for on-blur feedback. */
export function validateField(name: keyof EnquiryInput, value: unknown): string | undefined {
  const field = enquirySchema.shape[name];
  const result = field.safeParse(value);
  return result.success ? undefined : result.error.issues[0]?.message;
}
