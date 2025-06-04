import { randomUUID } from "node:crypto";

import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";

import { ConfigService } from "../config/config.service";

interface State {
  expiresAt: number;
  redirectUrl: URL | null;
}

@Injectable()
export class AuthService {
  private stateRecord = new Map<string, State>();

  constructor(private configService: ConfigService) {}

  validateRedirectUrl(redirectUrl: string | undefined): URL | null {
    if (!redirectUrl) {
      return null;
    }

    let url: URL;
    try {
      url = new URL(redirectUrl);
    } catch (_) {
      throw new BadRequestException("Invalid redirect URL");
    }

    if (
      url.protocol === this.configService.api.url.protocol &&
      url.hostname.endsWith(this.configService.parentDomain)
    ) {
      return url;
    }

    throw new BadRequestException("Redirect URL not allowed");
  }

  newState(url?: string): string {
    const id = randomUUID();
    const expiresAt = Date.now() + this.configService.jwt.stateExpirationTime;
    const redirectUrl = this.validateRedirectUrl(url);
    this.stateRecord.set(id, { expiresAt, redirectUrl });
    return id;
  }

  getState(id: string): State {
    const authState = this.stateRecord.get(id);
    this.stateRecord.delete(id);

    if (!authState) {
      throw new UnauthorizedException("State not found");
    }

    if (authState.expiresAt < Date.now()) {
      throw new UnauthorizedException("Authentication session expired");
    }

    return authState;
  }
}
