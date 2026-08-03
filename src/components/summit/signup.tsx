"use client";

import { Check } from "lucide-react";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";

import { subscribeAction, type FormState } from "@/app/actions";
import { Label } from "@/components/summit/primitives";
import { Button } from "@/components/ui/button";

const initial: FormState = { status: "idle" };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="lg" variant="white" disabled={pending} className="sm:shrink-0">
      {pending ? "Adding you…" : "Notify me"}
    </Button>
  );
}

/**
 * Summit registration-interest form.
 *
 * Reuses the existing newsletter server action rather than adding a second list — the
 * source field already distinguishes where a signup came from, so segmentation stays
 * possible without a new table.
 */
export function SummitSignup({
  label,
  heading,
  body,
  footnote,
}: {
  label: string;
  heading: string;
  body: string;
  footnote: string;
}) {
  const [state, formAction] = useActionState(subscribeAction, initial);

  return (
    <section id="signup" className="scroll-mt-24 bg-bark py-20 text-canvas md:py-28">
      <div aria-hidden className="contours pointer-events-none absolute inset-x-0 text-clay opacity-20" />
      <div className="shell">
        <div className="mx-auto max-w-2xl text-center">
          <Label className="justify-center text-clay">{label}</Label>
          <h2 className="display mt-5 text-[clamp(1.75rem,3.6vw,2.6rem)]">{heading}</h2>
          <p className="mt-4 leading-relaxed text-canvas/75">{body}</p>

          {state.status === "success" ? (
            <p
              role="status"
              className="mt-10 inline-flex items-center gap-2 rounded-full bg-canvas/10 px-5 py-3 text-sm text-clay"
            >
              <Check className="size-4" aria-hidden />
              {state.message}
            </p>
          ) : (
            <form action={formAction} className="mt-10" noValidate>
              <div className="flex flex-col gap-3 sm:flex-row">
                <label htmlFor="summit-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="summit-email"
                  type="email"
                  name="email"
                  required
                  autoComplete="email"
                  placeholder="you@organisation.com"
                  aria-invalid={state.fieldErrors?.email ? true : undefined}
                  aria-describedby={state.fieldErrors?.email ? "summit-email-error" : undefined}
                  className="h-13 w-full rounded-full border border-canvas/25 bg-canvas/5 px-6 text-sm text-canvas placeholder:text-canvas/40 focus:border-clay focus:outline-none"
                />
                {/* Honeypot */}
                <input
                  type="text"
                  name="company"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden
                  className="absolute -left-[9999px] size-0"
                />
                <SubmitButton />
              </div>

              {state.fieldErrors?.email || state.message ? (
                <p id="summit-email-error" role="alert" className="mt-3 text-sm text-clay">
                  {state.fieldErrors?.email ?? state.message}
                </p>
              ) : null}
            </form>
          )}

          <p
            className="label-mono mt-8 normal-case text-canvas/45"
            style={{ letterSpacing: "0.04em" }}
          >
            {footnote}
          </p>
        </div>
      </div>
    </section>
  );
}
