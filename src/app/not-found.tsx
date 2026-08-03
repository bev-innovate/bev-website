import { ButtonLink } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="shell grid min-h-[60vh] place-items-center py-24 text-center">
      <div>
        <p className="font-display text-7xl font-semibold text-orange">404</p>
        <h1 className="mt-6 font-display text-3xl font-semibold text-ink">
          This page has been composted
        </h1>
        <p className="mx-auto mt-4 max-w-md text-ink-muted">
          The page you were looking for isn&rsquo;t here. It may have moved when we rebuilt
          the site.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/">Back to home</ButtonLink>
          <ButtonLink href="/programmes" variant="outline">
            Browse programmes
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
