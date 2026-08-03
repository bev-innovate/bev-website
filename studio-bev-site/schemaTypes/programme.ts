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
    defineField({
      name: "stage",
      title: "Journey stage",
      type: "string",
      description: "Which band the programme appears under on the programmes page.",
      options: {
        list: [
          { title: "Early stage", value: "early" },
          { title: "Growth stage", value: "growth" },
        ],
        layout: "radio",
      },
      initialValue: "early",
    }),
    defineField({
      name: "themes",
      title: "Themes",
      description: "Subject-matter labels shown on the programme card.",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
        list: [
          "Agrifood",
          "Agritech",
          "Climate innovation",
          "Cleantech",
          "Market expansion",
          "Gender equity",
          "Competition",
          "Convening",
        ],
      },
    }),
    defineField({
      name: "accent",
      title: "Accent colour",
      type: "string",
      options: {
        list: [
          { title: "Purple", value: "purple" },
          { title: "Orange", value: "orange" },
          { title: "Teal", value: "teal" },
          { title: "Yellow", value: "yellow" },
          { title: "Sky", value: "sky" },
        ],
      },
      initialValue: "purple",
    }),
    defineField({ name: "summary", type: "text", rows: 3, validation: (r) => r.required() }),
    defineField({
      name: "body",
      title: "Description paragraphs",
      description: "Long-form copy shown beneath the summary on the programmes page.",
      type: "array",
      of: [{ type: "text", rows: 4 }],
    }),
    defineField({ name: "heroImage", type: "image", options: { hotspot: true } }),
    defineField({
      name: "heroImageUrl",
      title: "Hero image URL (migration)",
      type: "url",
      description:
        "Temporary fallback for content still served from Wix. Prefer uploading to heroImage.",
    }),
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
    defineField({ name: "richBody", title: "Full description (rich text)", type: "blockContent" }),
    defineField({
      name: "order",
      type: "number",
      description: "Lower numbers appear first.",
      initialValue: 10,
    }),
  ],
  preview: { select: { title: "title", subtitle: "kicker", media: "heroImage" } },
});
