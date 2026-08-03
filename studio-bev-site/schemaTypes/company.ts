import { defineField, defineType } from "sanity";

export const company = defineType({
  name: "company",
  title: "Company",
  type: "document",
  description: "Cohort and portfolio companies.",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "name" } }),
    defineField({ name: "logo", type: "image" }),
    defineField({ name: "url", type: "url" }),
    defineField({ name: "country", type: "string" }),
    defineField({ name: "vertical", type: "string" }),
    defineField({ name: "blurb", type: "text", rows: 3 }),
    defineField({
      name: "womenCofounded",
      title: "Women co-founded",
      type: "boolean",
      initialValue: false,
    }),
    defineField({ name: "cohortYear", type: "number" }),
  ],
  preview: { select: { title: "name", subtitle: "vertical", media: "logo" } },
});
