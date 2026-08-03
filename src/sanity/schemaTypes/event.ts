import { defineField, defineType } from "sanity";

export const event = defineType({
  name: "event",
  title: "Event",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "title" } }),
    defineField({ name: "startDate", type: "datetime", validation: (r) => r.required() }),
    defineField({ name: "endDate", type: "datetime" }),
    defineField({ name: "location", type: "string" }),
    defineField({ name: "summary", type: "text", rows: 3 }),
    defineField({ name: "image", type: "image", options: { hotspot: true } }),
    defineField({ name: "registerUrl", type: "url" }),
    defineField({ name: "body", type: "blockContent" }),
  ],
  orderings: [
    { title: "Soonest first", name: "startAsc", by: [{ field: "startDate", direction: "asc" }] },
  ],
  preview: { select: { title: "title", subtitle: "location", media: "image" } },
});
