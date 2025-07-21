/**
 * Custom text keys for editable contents
 *
 * N.B. The default values for these contents are stored in locale files with
 * the same keys but written in dot notation (e.g., "homeTitle" → "home.title").
 * The camelCase keys are converted to dot.case when looking up default values.
 * Organizers can override these defaults with custom text stored in the
 * database.
 */

export const CUSTOM_TEXT_KEYS = [
  "homeTitle",
  "homeSubtitleRequests",
  "homeSubtitleAssignments",
  "homeSubtitleResults",
  "homeSubtitleShutdown",
  "homeMessageRequests",
  "homeMessageAssignments",
  "homeMessageResults",
  "homeMessageShutdown",
] as const;

export const CUSTOM_TEXT_MARKDOWN_KEYS: CustomTextKey[] = [
  "homeMessageRequests",
  "homeMessageAssignments",
  "homeMessageResults",
  "homeMessageShutdown",
] as const;

export type CustomTextKey = (typeof CUSTOM_TEXT_KEYS)[number];

export const isCustomTextKey = (key: unknown): key is CustomTextKey =>
  CUSTOM_TEXT_KEYS.includes(key as CustomTextKey);
