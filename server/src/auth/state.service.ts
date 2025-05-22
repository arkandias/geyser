import { randomUUID } from "node:crypto";

import { Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import type { Request } from "express";

import { ConfigService } from "../config/config.service";
import { State } from "./state.interface";

@Injectable()
export class StateService {
  private stateRecord = new Map<string, State>();
  private readonly logger = new Logger(StateService.name);

  constructor(private configService: ConfigService) {}

  newState(redirectUrl: URL | null): string {
    const id = randomUUID();
    const expiresAt = Date.now() + this.configService.jwt.stateExpirationTime;
    this.stateRecord.set(id, { expiresAt, redirectUrl });
    return id;
  }

  getState(id: string, req: Request): State {
    const authState = this.stateRecord.get(id);
    this.stateRecord.delete(id);

    if (!authState) {
      this.logger.warn({
        message: "Potential CSRF attempt: State not found",
        stateId: id,
        request: {
          ip: req.ip,
          method: req.method,
          path: req.url,
          headers: req.headers,
        },
      });
      throw new UnauthorizedException("Authentication failed");
    }

    if (authState.expiresAt < Date.now()) {
      throw new UnauthorizedException("Authentication session expired");
    }

    return authState;
  }
}
