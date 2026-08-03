import type { SchemaTypeDefinition } from "sanity";

import { blockContent } from "./blockContent";
import { company } from "./company";
import { event } from "./event";
import { partner } from "./partner";
import { person } from "./person";
import { post } from "./post";
import { programme } from "./programme";
import { siteSettings } from "./siteSettings";

export const schemaTypes: SchemaTypeDefinition[] = [
  siteSettings,
  programme,
  post,
  event,
  person,
  partner,
  company,
  blockContent,
];
