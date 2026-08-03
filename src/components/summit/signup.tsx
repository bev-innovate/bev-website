"use client";

import { Check } from "lucide-react";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";

import { subscribeAction, type FormState } from "@/app/actions";
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
  heading,
  body,
  footnote,
}: {
  heading: string;
  body: string;
  footnote: string;
}) {
  const [state, formAction] = useActionState(subscribeAction, initial);

  return (
    <section id="signup" className="relative scroll-mt-24 overflow-hidden bg-mangrove py-16 text-white md:py-20">
      <div aria-hidden className="contours pointer-events-none absolute inset-0 text-white opacity-20" />
      <div className="shell">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="display text-[clamp(1.75rem,3.6vw,2.6rem)]">{heading}</h2>
          <p className="mt-4 leading-relaxed text-white/80">{body}</p>

          {state.status === "success" ? (
            <p
              role="status"
              className="mt-10 inline-flex items-center gap-2 rounded-full bg-white/15 px-5 py-3 text-sm text-white"
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
                  className="h-13 w-full rounded-full border border-white/30 bg-white/10 px-6 text-sm text-white placeholder:text-white/50 focus:border-white focus:outline-none"
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
                <p id="summit-email-error" role="alert" className="mt-3 text-sm text-white">
                  {state.fieldErrors?.email ?? state.message}
                </p>
              ) : null}
            </form>
          )}

          <p className="mt-8 text-xs text-white/65">
            {footnote}
          </p>
        </div>
      </div>
    </section>
  );
}
