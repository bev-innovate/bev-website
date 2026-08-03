import { defineField, defineType } from "sanity";

export const partner = defineType({
  name: "partner",
  title: "Partner",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "logo", type: "image" }),
    defineField({ name: "url", type: "url" }),
    defineField({
      name: "tier",
      type: "string",
      options: {
        list: [
          { title: "Programme partner", value: "programme" },
          { title: "Ecosystem partner", value: "ecosystem" },
          { title: "Supporter", value: "supporter" },
        ],
      },
      initialValue: "ecosystem",
    }),
    defineField({ name: "order", type: "number", initialValue: 10 }),
  ],
  preview: { select: { title: "name", subtitle: "tier", media: "logo" } },
});
