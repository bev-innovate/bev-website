import { defineField, defineType } from "sanity";

export const programme = defineType({
  name: "programme",
  title: "Programme",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "kicker",
      type: "string",
      description: 'Short label above the title, e.g. "6-month accelerator".',
    }),
    defineField({ name: "summary", type: "text", rows: 3, validation: (r) => r.required() }),
    defineField({ name: "heroImage", type: "image", options: { hotspot: true } }),
    defineField({
      name: "status",
      type: "string",
      options: {
        list: [
          { title: "Applications open", value: "open" },
          { title: "Applications closed", value: "closed" },
          { title: "Coming soon", value: "upcoming" },
          { title: "Completed", value: "completed" },
        ],
        layout: "radio",
      },
      initialValue: "upcoming",
    }),
    defineField({ name: "applyUrl", title: "Apply / register URL", type: "url" }),
    defineField({ name: "applicationDeadline", type: "date" }),
    defineField({
      name: "keyFacts",
      title: "Key facts",
      description: 'Duration, cost, equity, location — rendered as a fact strip.',
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", type: "string" },
            { name: "value", type: "string" },
          ],
          preview: { select: { title: "value", subtitle: "label" } },
        },
      ],
    }),
    defineField({
      name: "verticals",
      title: "Focus areas",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", type: "string" },
            { name: "description", type: "text", rows: 2 },
          ],
          preview: { select: { title: "title", subtitle: "description" } },
        },
      ],
    }),
    defineField({ name: "eligibility", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "benefits", type: "array", of: [{ type: "string" }] }),
    defineField({
      name: "timeline",
      title: "Programme timeline",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "phase", type: "string", title: "Phase / date" },
            { name: "title", type: "string" },
            { name: "description", type: "text", rows: 3 },
          ],
          preview: { select: { title: "title", subtitle: "phase" } },
        },
      ],
    }),
    defineField({
      name: "faq",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "question", type: "string" },
            { name: "answer", type: "text", rows: 4 },
          ],
          preview: { select: { title: "question" } },
        },
      ],
    }),
    defineField({
      name: "partners",
      type: "array",
      of: [{ type: "reference", to: [{ type: "partner" }] }],
    }),
    defineField({
      name: "cohort",
      title: "Cohort companies",
      type: "array",
      of: [{ type: "reference", to: [{ type: "company" }] }],
    }),
    defineField({ name: "body", title: "Full description", type: "blockContent" }),
    defineField({
      name: "order",
      type: "number",
      description: "Lower numbers appear first.",
      initialValue: 10,
    }),
  ],
  preview: { select: { title: "title", subtitle: "kicker", media: "heroImage" } },
});
