import type { AxiosError } from "axios";
import type { z } from "zod";

export const errorMessage = (error: unknown, message?: string): string =>
  error instanceof Error ? error.message : (message ?? "Unknown error");

export const axiosErrorMessage = (error: AxiosError): string => {
  if (error.response) {
    // Server responded with error status
    const data =
      typeof error.response.data === "string"
        ? error.response.data
        : JSON.stringify(error.response.data);
    return `${error.response.status} ${data}`;
  } else if (error.request) {
    // Network error (no response received)
    return `Network error: ${error.message}`;
  } else {
    // Something else went wrong
    return `Unknown error: ${error.message}`;
  }
};

export const zodErrorMessage = (error: z.ZodError): string =>
  `${error.name} ${error.message}`;
