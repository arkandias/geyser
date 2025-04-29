import { PhaseEnum } from "@/gql/graphql.ts";
import { capitalize } from "@/utils/misc.ts";

export const CUSTOM_TEXT_KEYS = [
  "homeTitle",
  `homeSubtitle${capitalize(PhaseEnum.Requests)}`,
  `homeSubtitle${capitalize(PhaseEnum.Assignments)}`,
  `homeSubtitle${capitalize(PhaseEnum.Results)}`,
  `homeSubtitle${capitalize(PhaseEnum.Shutdown)}`,
  `homeMessage${capitalize(PhaseEnum.Requests)}`,
  `homeMessage${capitalize(PhaseEnum.Assignments)}`,
  `homeMessage${capitalize(PhaseEnum.Results)}`,
  `homeMessage${capitalize(PhaseEnum.Shutdown)}`,
  "contact",
  "legalNotice",
] as const;

export type CustomTextKey = (typeof CUSTOM_TEXT_KEYS)[number];

export const isCustomTextKey = (key: unknown): key is CustomTextKey =>
  CUSTOM_TEXT_KEYS.includes(key as CustomTextKey);
