import { defineField, defineType } from "sanity";

export const post = defineType({
  name: "post",
  title: "Insight / news",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({ name: "excerpt", type: "text", rows: 3 }),
    defineField({ name: "coverImage", type: "image", options: { hotspot: true } }),
    defineField({
      name: "coverImageUrl",
      title: "Cover image URL (migration)",
      type: "url",
      description:
        "Temporary field for content migrated from Wix. Prefer uploading to coverImage.",
    }),
    defineField({ name: "publishedAt", type: "datetime", validation: (r) => r.required() }),
    defineField({ name: "readingTime", title: "Minutes to read", type: "number" }),
    defineField({
      name: "category",
      type: "string",
      options: {
        list: ["News", "Programme", "Field notes", "Ecosystem", "Research"],
      },
      initialValue: "News",
    }),
    defineField({ name: "tags", type: "array", of: [{ type: "string" }], options: { layout: "tags" } }),
    defineField({ name: "author", type: "reference", to: [{ type: "person" }] }),
    defineField({
      name: "programme",
      type: "reference",
      to: [{ type: "programme" }],
      description: "Optional — links this post to a programme page.",
    }),
    defineField({ name: "featured", type: "boolean", initialValue: false }),
    defineField({ name: "body", type: "blockContent" }),
  ],
  orderings: [
    {
      title: "Newest first",
      name: "publishedDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "publishedAt", media: "coverImage" },
  },
});
