export const CUSTOM_TEXT_KEYS = [
  "homeTitle",
  `homeSubtitleRequests`,
  `homeSubtitleAssignments`,
  `homeSubtitleResults`,
  `homeSubtitleShutdown`,
  `homeMessageRequests`,
  `homeMessageAssignments`,
  `homeMessageResults`,
  `homeMessageShutdown`,
  "contact",
  "legalNotice",
] as const;

export type CustomTextKey = (typeof CUSTOM_TEXT_KEYS)[number];

export const isCustomTextKey = (key: unknown): key is CustomTextKey =>
  CUSTOM_TEXT_KEYS.includes(key as CustomTextKey);
