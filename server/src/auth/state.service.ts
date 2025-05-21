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

  private validateRedirectUrl(redirect: string | null | undefined): URL | null {
    if (!redirect) {
      return null;
    }

    const url = new URL(redirect);

    if (url.origin !== this.configService.apiUrl.origin) {
      // TODO: Allow redirections to http(s)://*.${GEYSER_DOMAIN}/*
      throw new UnauthorizedException("Redirect URL not allowed");
    }

    return new URL(redirect);
  }

  newState(redirect: string | undefined): string {
    const id = randomUUID();
    this.stateRecord.set(id, {
      expiresAt: Date.now() + this.configService.jwt.stateExpirationTime,
      redirectUrl: this.validateRedirectUrl(redirect),
    });
    return id;
  }

  getState(id: string, req: Request): State {
    const authState = this.stateRecord.get(id);
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
