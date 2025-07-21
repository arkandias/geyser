import { LocaleEnum } from "@/gql/graphql.ts";

export const API_REQUEST_TIMEOUT = 10000; // in ms
export const API_TOKEN_MIN_VALIDITY = 60; // in s
export const TOOLTIP_DELAY = 500; // in ms
export const DEFAULT_LOCALE: LocaleEnum = LocaleEnum.Fr;
export const PRIMITIVE_TYPE_NAMES = ["string", "number", "boolean"] as const;
