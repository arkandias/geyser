import {
  type AccessTokenPayload,
  AccessTokenPayloadSchema,
  type JWTPayload,
  JWTPayloadSchema,
  errorMessage,
} from "@geyser/shared";
import axios, { isAxiosError } from "axios";

import {
  API_REQUEST_TIMEOUT,
  API_TOKEN_MIN_VALIDITY,
} from "@/config/constants.ts";
import { apiURL } from "@/config/env.ts";
import type { RoleTypeEnum } from "@/gql/graphql.ts";

const api = axios.create({
  baseURL: apiURL,
  timeout: API_REQUEST_TIMEOUT,
  withCredentials: true,
});

export class AuthManager {
  private payload?: JWTPayload & AccessTokenPayload;
  private activeRole?: RoleTypeEnum;

  async init(): Promise<void> {
    const verified = await this.verify();
    if (verified) {
      return;
    }

    const refreshed = await this.refresh();
    if (refreshed) {
      return;
    }

    this.login();
  }

  private async getPayload(endpoint: string): Promise<boolean> {
    try {
      const response = await api.get(endpoint);

      this.payload = JWTPayloadSchema.and(AccessTokenPayloadSchema).parse(
        response.data,
      );

      return true;
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        if (error.response.status !== 401) {
          console.warn(
            `Unexpected response from ${apiURL}/${endpoint}: ${error.response.status} ${error.response.statusText}`,
          );
        }
      } else {
        console.warn(
          `Request to ${apiURL}/${endpoint} failed:`,
          errorMessage(error),
        );
      }
      delete this.payload;
      return false;
    }
  }

  async verify(): Promise<boolean> {
    return this.getPayload("/auth/verify");
  }

  async refresh(): Promise<boolean> {
    return this.getPayload("/auth/refresh");
  }

  login(): void {
    const loginURL = new URL("/api/auth/login", apiURL);
    loginURL.searchParams.append("redirect", window.location.href);
    window.location.href = loginURL.toString();
  }

  logout(): void {
    const logoutURL = new URL("/api/auth/logout", apiURL);
    window.location.href = logoutURL.toString();
  }

  getUserId(): string | undefined {
    return this.payload?.uid;
  }

  getRoles(): string[] | undefined {
    return this.payload?.roles;
  }

  getActiveRole(): RoleTypeEnum | undefined {
    return this.activeRole;
  }

  setActiveRole(role?: RoleTypeEnum): void {
    this.activeRole = role;
  }

  shouldRefresh(): boolean {
    if (!this.payload) {
      return true;
    }

    return (
      this.payload.exp - Math.floor(Date.now() / 1000) > API_TOKEN_MIN_VALIDITY
    );
  }
}
