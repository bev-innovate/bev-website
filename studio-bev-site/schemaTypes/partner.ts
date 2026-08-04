import { defineField, defineType } from "sanity";

export const partner = defineType({
  name: "partner",
  title: "Partner",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "logo", type: "image" }),
    defineField({
      name: "logoUrl",
      title: "Logo URL",
      type: "string",
      description:
        "Fallback used only when no logo image is uploaded above, e.g. /images/logos-agfunder-logo.webp. Uploading an image always wins.",
    }),
    defineField({ name: "url", title: "Website", type: "url" }),
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
    defineField({
      name: "hidden",
      title: "Hide from logo marquees",
      type: "boolean",
      initialValue: false,
      description:
        "Keeps the partner out of the scrolling logo strips. Programme pages that reference this partner still show it.",
    }),
  ],
  preview: { select: { title: "name", subtitle: "tier", media: "logo" } },
});
