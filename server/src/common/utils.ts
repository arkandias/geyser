import type { Request } from "express";

export function getHeader(request: Request, name: string) {
  return Array.isArray(request.headers[name])
    ? request.headers[name].at(-1) // Last value
    : request.headers[name];
}
