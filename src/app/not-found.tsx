import { ButtonLink } from "@/components/ui/button";
import { Text } from "@/components/ui/typography";

export default function NotFound() {
  return (
    <div className="shell grid min-h-[60vh] place-items-center py-24 text-center">
      <div>
        <p className="font-display text-7xl font-bold text-orange">404</p>
        <Text variant="headline" as="h1" className="mt-6">
          This page has been composted
        </Text>
        <Text className="mx-auto mt-4 max-w-md">
          The page you were looking for isn&rsquo;t here. It may have moved when we rebuilt
          the site.
        </Text>
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
