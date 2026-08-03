import { defineField, defineType } from "sanity";

export const person = defineType({
  name: "person",
  title: "Person",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "role", type: "string" }),
    defineField({
      name: "group",
      type: "string",
      options: {
        list: [
          { title: "Team", value: "team" },
          { title: "Mentor", value: "mentor" },
          { title: "Advisor", value: "advisor" },
        ],
        layout: "radio",
      },
      initialValue: "team",
    }),
    defineField({ name: "photo", type: "image", options: { hotspot: true } }),
    defineField({ name: "bio", type: "text", rows: 4 }),
    defineField({ name: "linkedin", title: "LinkedIn URL", type: "url" }),
    defineField({ name: "order", type: "number", initialValue: 10 }),
  ],
  preview: { select: { title: "name", subtitle: "role", media: "photo" } },
});
