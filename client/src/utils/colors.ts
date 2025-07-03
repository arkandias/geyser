import type { NamedColor } from "quasar";

export const bgColor = import.meta.env.DEV ? "bg-negative" : "bg-primary";

export const buttonColor = (active: boolean): NamedColor =>
  active ? "accent" : "white";

export const priorityColor = (
  isPriority: boolean | null | undefined,
): NamedColor => {
  switch (isPriority) {
    case true:
      return "positive";
    case false:
      return "negative";
    default:
      return "info";
  }
};
