import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", initialValue: "Better Earth Ventures" }),
    defineField({
      name: "tagline",
      type: "string",
      description: "Used in the browser title and social cards.",
    }),
    defineField({ name: "description", type: "text", rows: 3 }),
    defineField({ name: "logo", type: "image" }),
    defineField({ name: "ogImage", title: "Social share image", type: "image" }),
    defineField({
      name: "stats",
      title: "Headline numbers",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "value", type: "string", title: "Value" },
            { name: "label", type: "string", title: "Label" },
            { name: "detail", type: "string", title: "Supporting detail" },
          ],
          preview: { select: { title: "value", subtitle: "label" } },
        },
      ],
    }),
    defineField({
      name: "contact",
      type: "object",
      fields: [
        { name: "email", type: "string" },
        { name: "location", type: "string" },
      ],
    }),
    defineField({
      name: "social",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "platform",
              type: "string",
              options: { list: ["LinkedIn", "Instagram", "YouTube", "X", "Substack"] },
            },
            { name: "url", type: "url" },
          ],
          preview: { select: { title: "platform", subtitle: "url" } },
        },
      ],
    }),
    defineField({
      name: "navigation",
      title: "Primary navigation",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", type: "string" },
            { name: "href", type: "string" },
          ],
          preview: { select: { title: "label", subtitle: "href" } },
        },
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Site settings" }) },
});
