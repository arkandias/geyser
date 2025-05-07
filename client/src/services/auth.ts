import { type AuthData, AuthDataSchema, errorMessage } from "@geyser/shared";
import axios from "axios";

import {
  API_REQUEST_TIMEOUT,
  API_TOKEN_MIN_VALIDITY,
} from "@/config/constants.ts";
import { apiURL } from "@/config/env.ts";

const api = axios.create({
  baseURL: apiURL,
  timeout: API_REQUEST_TIMEOUT,
  withCredentials: true,
  validateStatus: () => true,
});

export class AuthManager {
  private data: AuthData = {};

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

  async verify(): Promise<boolean> {
    try {
      const response = await api.get("/auth/verify");

      if (response.status === 200) {
        console.debug("Authentication successfully verified");
        return true;
      }

      if (response.status === 401) {
        console.debug("Authentication has expired");
        return false;
      }

      console.warn(
        `Unexpected response from /auth/verify: ${response.status} ${response.statusText}`,
      );
      return false;
    } catch (error) {
      console.error("Authentication verification failed:", error);
      return false;
    }
  }

  async refresh(): Promise<boolean> {
    try {
      const response = await api.post("/auth/refresh");

      if (response.status === 200) {
        this.data = AuthDataSchema.parse(response.data);
        console.debug("Authentication refreshed");
        return true;
      }

      if (response.status === 401) {
        console.debug("Authentication could not refresh");
        return false;
      }

      console.warn(
        `Unexpected response from /auth/refresh: ${response.status} ${response.statusText}`,
      );
      return false;
    } catch (error) {
      throw new Error(`Token refresh failed: ${errorMessage(error)}`);
    }
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

  userId(): string | undefined {
    return this.data.userId;
  }

  allowedRoles(): string[] | undefined {
    return this.data.allowedRoles;
  }

  defaultRole(): string | undefined {
    return this.data.defaultRole;
  }

  shouldRefresh(): boolean {
    return (
      (this.data.expiresAt ?? 0) - Math.floor(Date.now() / 1000) >
      API_TOKEN_MIN_VALIDITY
    );
  }
}
