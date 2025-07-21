export const CUSTOM_TEXTS = [
  {
    key: "homeTitle",
    defaultKey: "home.title",
    markdown: false,
  },
  {
    key: "homeSubtitleRequests",
    defaultKey: "home.subtitle.requests",
    markdown: false,
  },
  {
    key: "homeSubtitleAssignments",
    defaultKey: "home.subtitle.assignments",
    markdown: false,
  },
  {
    key: "homeSubtitleResults",
    defaultKey: "home.subtitle.results",
    markdown: false,
  },
  {
    key: "homeSubtitleShutdown",
    defaultKey: "home.subtitle.shutdown",
    markdown: false,
  },
  {
    key: "homeMessageRequests",
    defaultKey: "home.message.requests",
    markdown: true,
  },
  {
    key: "homeMessageAssignments",
    defaultKey: "home.message.assignments",
    markdown: true,
  },
  {
    key: "homeMessageResults",
    defaultKey: "home.message.results",
    markdown: true,
  },
  {
    key: "homeMessageShutdown",
    defaultKey: "home.message.shutdown",
    markdown: true,
  },
] as const;

export type CustomTextKey = (typeof CUSTOM_TEXTS)[number]["key"];

export const isCustomTextKey = (key: unknown): key is CustomTextKey =>
  CUSTOM_TEXTS.some((text) => text.key === key);
