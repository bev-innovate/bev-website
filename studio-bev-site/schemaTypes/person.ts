import { defineField, defineType } from "sanity";

export const person = defineType({
  name: "person",
  title: "Person",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "role", type: "string" }),
    defineField({
      name: "location",
      type: "string",
      description: "Staff only. Groups the team list on /about, e.g. Singapore, Europe, India.",
    }),
    defineField({
      name: "organisation",
      type: "string",
      description: "Advisors only: where they work. Shown under their role.",
    }),
    defineField({
      name: "group",
      type: "string",
      options: {
        list: [
          { title: "Team", value: "team" },
          { title: "Expert", value: "expert" },
          { title: "Mentor", value: "mentor" },
          { title: "Advisory board", value: "advisor" },
        ],
        layout: "radio",
      },
      initialValue: "team",
    }),
    defineField({ name: "photo", type: "image", options: { hotspot: true } }),
    defineField({
      name: "photoUrl",
      title: "Photo URL",
      type: "string",
      description:
        "Fallback used only when no photo is uploaded above, e.g. /images/people/jamie-heng.webp. Uploading an image always wins.",
    }),
    defineField({ name: "bio", type: "text", rows: 4 }),
    defineField({ name: "linkedin", title: "LinkedIn URL", type: "url" }),
    defineField({ name: "order", type: "number", initialValue: 10 }),
  ],
  preview: { select: { title: "name", subtitle: "role", media: "photo" } },
});
