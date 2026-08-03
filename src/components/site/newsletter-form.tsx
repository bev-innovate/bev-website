"use client";

import { ArrowRight, Check } from "lucide-react";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";

import { subscribeAction, type FormState } from "@/app/actions";
import { cn } from "@/lib/utils";

const initial: FormState = { status: "idle" };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      aria-label="Subscribe"
      className="absolute top-1.5 right-1.5 grid size-9 place-items-center rounded-full bg-yellow text-purple transition-transform hover:scale-105 disabled:opacity-60"
    >
      <ArrowRight className={cn("size-4", pending && "animate-pulse")} aria-hidden />
    </button>
  );
}

export function NewsletterForm({ className }: { className?: string }) {
  const [state, formAction] = useActionState(subscribeAction, initial);

  if (state.status === "success") {
    return (
      <p
        className={cn("flex items-center gap-2 text-sm text-yellow", className)}
        role="status"
      >
        <Check className="size-4" aria-hidden />
        {state.message}
      </p>
    );
  }

  return (
    <form action={formAction} className={className} noValidate>
      <div className="relative">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          name="email"
          required
          autoComplete="email"
          placeholder="you@organisation.com"
          aria-invalid={state.fieldErrors?.email ? true : undefined}
          aria-describedby={state.fieldErrors?.email ? "newsletter-error" : undefined}
          className="h-12 w-full rounded-full border border-canvas/20 bg-canvas/5 pr-12 pl-5 text-sm text-canvas placeholder:text-canvas/40 focus:border-yellow focus:outline-none"
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
        <p id="newsletter-error" className="mt-2 text-xs text-orange-deep" role="alert">
          {state.fieldErrors?.email ?? state.message}
        </p>
      ) : null}
    </form>
  );
}
