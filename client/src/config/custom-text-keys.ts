import { PhaseTypeEnum } from "@/gql/graphql.ts";
import { capitalize, toLowerCase } from "@/utils";

export const CUSTOM_TEXT_KEYS = [
  "homeTitle",
  `homeSubtitle${capitalize(toLowerCase(PhaseTypeEnum.Requests))}`,
  `homeSubtitle${capitalize(toLowerCase(PhaseTypeEnum.Assignments))}`,
  `homeSubtitle${capitalize(toLowerCase(PhaseTypeEnum.Results))}`,
  `homeSubtitle${capitalize(toLowerCase(PhaseTypeEnum.Shutdown))}`,
  `homeMessage${capitalize(toLowerCase(PhaseTypeEnum.Requests))}`,
  `homeMessage${capitalize(toLowerCase(PhaseTypeEnum.Assignments))}`,
  `homeMessage${capitalize(toLowerCase(PhaseTypeEnum.Results))}`,
  `homeMessage${capitalize(toLowerCase(PhaseTypeEnum.Shutdown))}`,
  "contact",
  "legalNotice",
] as const;

export type CustomTextKey = (typeof CUSTOM_TEXT_KEYS)[number];

export const isCustomTextKey = (key: unknown): key is CustomTextKey =>
  CUSTOM_TEXT_KEYS.includes(key as CustomTextKey);
