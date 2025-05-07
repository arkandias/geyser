export const errorMessage = (error: unknown, message?: string): string =>
  error instanceof Error ? error.message : (message ?? "Unknown error");
