import type { StructureResolver } from "sanity/structure";

/** Pins site settings as a singleton and groups the rest by how editors think about them. */
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Better Earth Ventures")
    .items([
      S.listItem()
        .title("Site settings")
        .id("siteSettings")
        .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
      S.divider(),
      S.documentTypeListItem("programme").title("Programmes"),
      S.documentTypeListItem("event").title("Events"),
      S.documentTypeListItem("post").title("Insights & news"),
      S.divider(),
      S.documentTypeListItem("person").title("People"),
      S.documentTypeListItem("partner").title("Partners"),
      S.documentTypeListItem("company").title("Companies"),
    ]);
