"use client";

import { Check } from "lucide-react";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";

import { enquiryAction, type FormState } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const initial: FormState = { status: "idle" };

const field =
  "w-full rounded-xl border border-line bg-canvas-raised px-4 py-3 text-[0.9375rem] text-ink placeholder:text-ink-faint focus:border-orange focus:outline-none";

const topics = [
  { value: "programme", label: "Applying to a programme" },
  { value: "partnership", label: "Partnership or programme design" },
  { value: "media", label: "Media or speaking" },
  { value: "other", label: "Something else" },
];

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="lg" disabled={pending} className="w-full sm:w-auto">
      {pending ? "Sending…" : "Send message"}
    </Button>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1.5 text-xs text-orange-deep" role="alert">
      {message}
    </p>
  );
}

export function EnquiryForm({ className }: { className?: string }) {
  const [state, formAction] = useActionState(enquiryAction, initial);

  if (state.status === "success") {
    return (
      <div
        className={cn(
          "rounded-2xl border border-orange/30 bg-orange/8 p-8 text-center",
          className,
        )}
        role="status"
      >
        <div className="mx-auto grid size-11 place-items-center rounded-full bg-orange text-canvas">
          <Check className="size-5" aria-hidden />
        </div>
        <p className="mt-4 font-display text-xl font-semibold text-ink">Message received</p>
        <p className="mt-2 text-sm text-ink-muted">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className={cn("space-y-5", className)} noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-medium text-ink">
            Name
          </label>
          <input
            id="name"
            name="name"
            required
            autoComplete="name"
            className={field}
            aria-invalid={state.fieldErrors?.name ? true : undefined}
            aria-describedby={state.fieldErrors?.name ? "name-error" : undefined}
          />
          <FieldError id="name-error" message={state.fieldErrors?.name} />
        </div>

        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium text-ink">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={field}
            aria-invalid={state.fieldErrors?.email ? true : undefined}
            aria-describedby={state.fieldErrors?.email ? "email-error" : undefined}
          />
          <FieldError id="email-error" message={state.fieldErrors?.email} />
        </div>
      </div>

      <div>
        <label htmlFor="organisation" className="mb-2 block text-sm font-medium text-ink">
          Organisation <span className="text-ink-faint">(optional)</span>
        </label>
        <input id="organisation" name="organisation" className={field} />
      </div>

      <div>
        <label htmlFor="topic" className="mb-2 block text-sm font-medium text-ink">
          What&rsquo;s this about?
        </label>
        <select id="topic" name="topic" defaultValue="programme" className={field}>
          {topics.map((topic) => (
            <option key={topic.value} value={topic.value}>
              {topic.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-medium text-ink">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          className={cn(field, "resize-y")}
          aria-invalid={state.fieldErrors?.message ? true : undefined}
          aria-describedby={state.fieldErrors?.message ? "message-error" : undefined}
        />
        <FieldError id="message-error" message={state.fieldErrors?.message} />
      </div>

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
        <p className="text-sm text-orange-deep" role="alert">
          {state.message}
        </p>
      ) : null}

      <SubmitButton />
    </form>
  );
}
