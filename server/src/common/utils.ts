import type { Request } from "express";
import type jose from "jose";

export function getHeader(request: Request, name: string) {
  return Array.isArray(request.headers[name])
    ? request.headers[name].at(-1) // Last value
    : request.headers[name];
}

export const joseErrorMessage = (error: jose.errors.JOSEError): string =>
  `${error.name} ${error.message}`;
