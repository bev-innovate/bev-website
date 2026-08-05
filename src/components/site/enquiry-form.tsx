"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check, ChevronDown } from "lucide-react";
import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";

import { enquiryAction, type FormState } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  enquirySchema,
  flattenIssues,
  interestOptions,
  validateField,
  type EnquiryInput,
} from "@/lib/enquiry";
import { cn } from "@/lib/utils";

/**
 * Enquiry form.
 *
 * Fields carried over from the Wix form: first and last name, email, the ecosystem
 * interest list, a goals textarea, and a newsletter opt-in. Layout and field grouping
 * from 21st.dev's "Contact 2" block by @shadcnblockscom, whose Input, Label and Textarea
 * primitives are vendored under components/ui.
 *
 * Validation runs twice against one schema in lib/enquiry: here as you leave a field and
 * again on the server. Client-side checking is a courtesy that saves a round trip; the
 * server never trusts it.
 */

const initial: FormState = { status: "idle" };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="lg" disabled={pending} className="w-full">
      {pending ? "Sending…" : "Submit"}
      {pending ? null : <ArrowRight className="size-4" aria-hidden />}
    </Button>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="text-sm text-destructive" role="alert">
      {message}
    </p>
  );
}

export function EnquiryForm({ className }: { className?: string }) {
  const [state, formAction] = useActionState(enquiryAction, initial);
  const [clientErrors, setClientErrors] = useState<Record<string, string>>({});
  const reduceMotion = useReducedMotion();

  // Server errors surface on submit; client errors replace them as fields are corrected.
  const errors = { ...state.fieldErrors, ...clientErrors };

  /** Validates on blur, but only once the field has something in it worth judging. */
  const checkOnBlur = (name: keyof EnquiryInput) => (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const value = event.target.value;
    setClientErrors((prev) => {
      const next = { ...prev };
      const message = value.trim() ? validateField(name, value) : undefined;
      if (message) next[name] = message;
      else delete next[name];
      return next;
    });
  };

  /** Clears a field's error as soon as the visitor starts fixing it. */
  const clearOnInput = (name: keyof EnquiryInput) => () =>
    setClientErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });

  /** Last gate before the action fires: catches empty required fields too. */
  const validateAll = (event: React.FormEvent<HTMLFormElement>) => {
    const data = new FormData(event.currentTarget);
    const result = enquirySchema.safeParse({
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      email: data.get("email"),
      interest: data.get("interest") ?? "",
      goals: data.get("goals"),
      subscribe: data.get("subscribe") === "on",
      company: data.get("company") ?? "",
    });

    if (!result.success) {
      event.preventDefault();
      const issues = flattenIssues(result.error);
      setClientErrors(issues);
      // Move focus to the first problem so a keyboard or screen-reader user is not
      // left guessing what the alert refers to.
      const first = Object.keys(issues)[0];
      event.currentTarget.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    setClientErrors({});
  };

  if (state.status === "success") {
    return (
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={className}
        role="status"
      >
        <Card variant="soft" className="p-10 text-center">
          <motion.div
            initial={reduceMotion ? false : { scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.34, 1.4, 0.64, 1] }}
            className="mx-auto grid size-12 place-items-center rounded-full bg-orange text-white"
          >
            <Check className="size-5" aria-hidden />
          </motion.div>
          <p className="mt-5 font-display text-xl font-semibold text-foreground">
            Message received
          </p>
          <p className="mt-2 text-muted-foreground">{state.message}</p>
        </Card>
      </motion.div>
    );
  }

  return (
    <Card variant="outlined" className={cn("p-6 md:p-8", className)}>
      <form action={formAction} onSubmit={validateAll} className="flex flex-col gap-6" noValidate>
        <div className="flex flex-col gap-6 sm:flex-row">
          <div className="grid w-full items-start gap-2">
            <Label htmlFor="firstName">
              First name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="firstName"
              name="firstName"
              required
              autoComplete="given-name"
              onBlur={checkOnBlur("firstName")}
              onInput={clearOnInput("firstName")}
              aria-invalid={errors.firstName ? true : undefined}
              aria-describedby={errors.firstName ? "firstName-error" : undefined}
            />
            <FieldError id="firstName-error" message={errors.firstName} />
          </div>

          <div className="grid w-full items-start gap-2">
            <Label htmlFor="lastName">
              Last name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="lastName"
              name="lastName"
              required
              autoComplete="family-name"
              onBlur={checkOnBlur("lastName")}
              onInput={clearOnInput("lastName")}
              aria-invalid={errors.lastName ? true : undefined}
              aria-describedby={errors.lastName ? "lastName-error" : undefined}
            />
            <FieldError id="lastName-error" message={errors.lastName} />
          </div>
        </div>

        <div className="grid w-full items-start gap-2">
          <Label htmlFor="email">
            Email <span className="text-destructive">*</span>
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            onBlur={checkOnBlur("email")}
            onInput={clearOnInput("email")}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          <FieldError id="email-error" message={errors.email} />
        </div>

        <div className="grid w-full items-start gap-2">
          <Label htmlFor="interest">
            How would you like to be a part of the Better Earth ecosystem?
          </Label>
          {/*
            A native select, styled to match Input. Radix's Select would look tidier but
            costs a dependency and keyboard behaviour the native control already has,
            especially on mobile.
          */}
          <div className="relative">
            <select
              id="interest"
              name="interest"
              defaultValue=""
              className={cn(
                "flex h-11 w-full appearance-none rounded-(--radius) border border-input bg-background px-4 pr-10 text-foreground",
                "transition-[color,box-shadow,border-color] duration-200",
                "focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/25 focus-visible:outline-none",
              )}
            >
              <option value="">Select an option</option>
              {interestOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown
              aria-hidden
              className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-muted-foreground"
            />
          </div>
        </div>

        <div className="grid w-full items-start gap-2">
          <Label htmlFor="goals">
            Could you tell us more about your goals? <span className="text-destructive">*</span>
          </Label>
          <Textarea
            id="goals"
            name="goals"
            rows={6}
            required
            onBlur={checkOnBlur("goals")}
            onInput={clearOnInput("goals")}
            aria-invalid={errors.goals ? true : undefined}
            aria-describedby={errors.goals ? "goals-error" : undefined}
          />
          <FieldError id="goals-error" message={errors.goals} />
        </div>

        {/* Ticked by default, as it was on the Wix form. */}
        <label htmlFor="subscribe" className="flex cursor-pointer items-center gap-3">
          <input
            id="subscribe"
            name="subscribe"
            type="checkbox"
            defaultChecked
            className="size-4.5 shrink-0 cursor-pointer rounded-sm border border-input accent-purple"
          />
          <span className="text-foreground">Sign up for news and updates</span>
        </label>

        {/* Honeypot */}
        <input
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden
          className="absolute -left-[9999px] size-0"
        />

        {state.status === "error" && state.message ? (
          <p className="text-sm text-destructive" role="alert">
            {state.message}
          </p>
        ) : null}

        <SubmitButton />
      </form>
    </Card>
  );
}
