export const inputToNumber = (input: string | number | null) =>
  typeof input === "string" ? (input === "" ? null : Number(input)) : input;
