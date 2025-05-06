import { type AuthData, AuthDataSchema, makeClaims } from "@geyser/shared";
import axios from "axios";
import Keycloak from "keycloak-js";

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
    if (this.data.adminSecret) {
      return;
    }
    await this.verify();
    await this.setup();
  }

  async setup(): Promise<void> {
    if (this.isValid()) {
      return;
    }
    const refreshed = await this.refreshToken();
    if (refreshed) {
      return;
    }
    await this.login();
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
        return true;
      }
      if (response.status === 401) {
        return false;
      }
      throw new Error(
        `Server returned ${response.status} ${response.statusText}`,
      );
    } catch (error) {
      throw new Error(`Token refresh failed: ${errorMessage(error)}`);
    }
  }

  async login(): Promise<boolean> {
    try {
      const authenticated = await keycloak.init({
        onLoad: "login-required",
      });
      if (!authenticated) {
        throw new Error("Keycloak authentication failed");
      }
      const token = keycloak.token;
      if (!token) {
        throw new Error("Missing token");
      }
      const response = await api.post(
        "/auth/login",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      if (response.status === 200) {
        this.data = AuthDataSchema.parse(response.data);
        return true;
      }
      throw new Error(
        `Server returned ${response.status} ${response.statusText}`,
      );
    } catch (error) {
      throw new Error(`Login failed: ${errorMessage(error)}`);
    }
  }

  async refreshToken(): Promise<boolean> {
    try {
      const response = await api.post("/auth/refresh");
      if (response.status === 200) {
        this.data = AuthDataSchema.parse(response.data);
        return true;
      }
      if (response.status === 401) {
        return false;
      }
      throw new Error(
        `Server returned ${response.status} ${response.statusText}`,
      );
    } catch (error) {
      throw new Error(`Token refresh failed: ${errorMessage(error)}`);
    }
  }

  async logout(): Promise<void> {
    try {
      const response = await api.post("/auth/logout");
      if (response.status === 200) {
        this.data = {};
        await keycloak.logout();
        return;
      }
      throw new Error(
        `Server returned ${response.status} ${response.statusText}`,
      );
    } catch (error) {
      throw new Error(`Logout failed: ${errorMessage(error)}`);
    }
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

  role(): string | undefined {
    return this.data.role;
  }

  setRole(newRole?: string) {
    this.data.role = newRole;
  }

  isValid(): boolean {
    return (
      (this.data.expiresAt ?? 0) - Math.floor(Date.now() / 1000) >
      API_TOKEN_MIN_VALIDITY
    );
  }

  getHeaders(): Record<string, string> {
    return makeClaims(this.data);
  }
}
