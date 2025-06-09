import { PhaseEnum } from "@/gql/graphql.ts";
import { capitalize, toLowerCase } from "@/utils";

export const CUSTOM_TEXT_KEYS = [
  "homeTitle",
  `homeSubtitle${capitalize(toLowerCase(PhaseEnum.Requests))}`,
  `homeSubtitle${capitalize(toLowerCase(PhaseEnum.Assignments))}`,
  `homeSubtitle${capitalize(toLowerCase(PhaseEnum.Results))}`,
  `homeSubtitle${capitalize(toLowerCase(PhaseEnum.Shutdown))}`,
  `homeMessage${capitalize(toLowerCase(PhaseEnum.Requests))}`,
  `homeMessage${capitalize(toLowerCase(PhaseEnum.Assignments))}`,
  `homeMessage${capitalize(toLowerCase(PhaseEnum.Results))}`,
  `homeMessage${capitalize(toLowerCase(PhaseEnum.Shutdown))}`,
  "contact",
  "legalNotice",
] as const;

export type CustomTextKey = (typeof CUSTOM_TEXT_KEYS)[number];

export const isCustomTextKey = (key: unknown): key is CustomTextKey =>
  CUSTOM_TEXT_KEYS.includes(key as CustomTextKey);
