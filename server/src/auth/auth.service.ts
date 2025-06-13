import { randomUUID } from "node:crypto";

import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";

import { ConfigService } from "../config/config.service";

interface StateParams {
  organizationKey: string;
  redirectUrl?: string;
}

interface State {
  organizationKey: string;
  redirectUrl: URL | null;
  expiresAt: number;
}

@Injectable()
export class AuthService {
  private stateRecord = new Map<string, State>();

  constructor(private configService: ConfigService) {}

  private validateRedirectUrl(redirectUrl?: string): URL | null {
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
      this.configService.api.allowedOrigins.some((origin) =>
        origin.test(url.origin),
      )
    ) {
      return url;
    }

    throw new BadRequestException("Redirect URL not allowed");
  }

  setState(params: StateParams): string {
    const id = randomUUID();
    this.stateRecord.set(id, {
      organizationKey: params.organizationKey,
      redirectUrl: this.validateRedirectUrl(params.redirectUrl),
      expiresAt: Date.now() + this.configService.jwt.stateExpirationTime,
    });
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
