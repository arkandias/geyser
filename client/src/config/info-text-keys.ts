export const INFO_TEXT_KEYS = ["contact", "legalNotice", "license"] as const;

export type InfoTextKey = (typeof INFO_TEXT_KEYS)[number];

export const isInfoTextKey = (key: unknown): key is InfoTextKey =>
  INFO_TEXT_KEYS.includes(key as InfoTextKey);
