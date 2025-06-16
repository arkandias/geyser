import {
  type AccessTokenPayload,
  type RoleType,
  accessTokenPayloadSchema,
} from "@geyser/shared";
import axios from "axios";
import { z } from "zod/v4";

import {
  API_REQUEST_TIMEOUT,
  API_TOKEN_MIN_VALIDITY,
} from "@/config/constants.ts";
import { apiUrl, bypassAuth, organizationKey } from "@/config/environment.ts";
import { RoleEnum } from "@/gql/graphql.ts";
import { capitalize, toLowerCase } from "@/utils";

const api = axios.create({
  baseURL: apiUrl,
  timeout: API_REQUEST_TIMEOUT,
  withCredentials: true,
});

export class AuthManager {
  private _organizationKey: string | null = null;
  private _payload?: AccessTokenPayload;
  private _role: RoleType | null = null;
  private _authError: string | null = null;

  async init(): Promise<void> {
    if (bypassAuth) {
      return;
    }

    // Get organization key
    await this.getOrganizationKey();
    if (!this._organizationKey) {
      return;
    }

    // Check for authentication errors from API in query params
    const url = new URL(window.location.href);
    this._authError = url.searchParams.get("auth_error");
    if (this._authError) {
      console.error(`[AuthManager] Authentication error: ${this._authError}`);
      return;
    }

    // Verify access token
    const verified = await this.verify();

    // Verification succeeded - we're done
    if (verified) {
      console.debug("[AuthManager] Logged in");
      return;
    }

    // Verification failed - attempt to refresh tokens
    const refreshed = await this.refresh();
    if (refreshed) {
      // Refresh succeeded - verify again to store payload
      await this.verify();
      return;
    }

    // Refresh failed - redirect to login
    await this.login();
  }

  async getOrganizationKey(): Promise<void> {
    // Set organization key from environment
    this._organizationKey = organizationKey;

    // If not provided, use current location hostname
    if (!this._organizationKey) {
      const domainLabels = window.location.hostname.split(".");
      if (domainLabels.length < 3) {
        console.debug(
          "[AuthManager] Could not determine organization key: no subdomain",
        );
        return;
      }

      this._organizationKey = domainLabels[0] ?? null;
      if (!this._organizationKey) {
        console.debug("[AuthManager] Could not determine organization key");
        return;
      }
    }
    console.debug(`[AuthManager] Organization key: ${this._organizationKey}`);

    try {
      await api.head(`/auth/org/${this._organizationKey}`);
      console.debug("[AuthManager] Organization key checked successfully");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.debug(
            `[AuthManager] Organization check failed: ${error.response.status} ${error.response.statusText}`,
          );
        } else {
          console.debug(
            "[AuthManager] Organization check failed: Network error",
          );
        }
      } else {
        console.debug("[AuthManager] Organization check failed: Unknown error");
      }
      this._organizationKey = null;
    }
  }

  async login(): Promise<void> {
    if (bypassAuth) {
      return;
    }

    const redirectUrl = new URL(window.location.href);
    redirectUrl.searchParams.delete("auth_error");

    console.debug("[AuthManager] Logging in...");
    window.location.href = api.getUri({
      url: "/auth/login",
      params: {
        redirect_url: redirectUrl,
        organization_key: this._organizationKey,
      },
    });

    // Prevent further execution since we're redirecting to login page
    await new Promise(() => {
      // This promise intentionally never resolves
    });
  }

  async logout(): Promise<void> {
    if (bypassAuth) {
      return;
    }

    console.debug("[AuthManager] Logging out...");
    window.location.href = api.getUri({
      url: "/auth/logout",
    });

    // Prevent further execution since we're redirecting to logout page
    await new Promise(() => {
      // This promise intentionally never resolves
    });
  }

  async verify(): Promise<boolean> {
    if (bypassAuth) {
      return true;
    }

    console.debug("[AuthManager] Verifying access token...");
    try {
      const response = await api.get("/auth/token/verify");
      this._payload = accessTokenPayloadSchema.parse(response.data);
      this._role = this._payload.defaultRole;
      console.debug("[AuthManager] Verification succeeded:");
      console.debug(this._payload);
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.debug("[AuthManager] Verification failed: Invalid token");
      }
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.debug(
            `[AuthManager] Verification failed: ${error.response.status} ${error.response.statusText}`,
          );
        } else {
          console.debug("[AuthManager] Verification failed: Network error");
        }
      } else {
        console.debug("[AuthManager] Verification failed: Unknown error");
      }
      delete this._payload;
      return false;
    }
  }

  async refresh(): Promise<boolean> {
    if (bypassAuth) {
      return true;
    }

    console.debug("[AuthManager] Refreshing access token...");
    try {
      await api.post("/auth/token/refresh");
      console.debug("[AuthManager] Refresh succeeded");
      return true;
    } catch (error) {
      if (axios.isAxiosError<{ message?: string }>(error)) {
        if (error.response) {
          console.debug(
            `[AuthManager] Refresh failed: ${error.response.status} ${error.response.statusText}`,
          );
        } else {
          console.debug("[AuthManager] Refresh failed: Network error");
        }
      } else {
        console.debug("[AuthManager] Refresh failed: Unknown error");
      }
      return false;
    }
  }

  shouldRefresh(): boolean {
    return bypassAuth
      ? false
      : !this._payload ||
          this._payload.exp - Math.floor(Date.now() / 1000) <
            API_TOKEN_MIN_VALIDITY;
  }

  get organizationKey(): string | null {
    return this._organizationKey;
  }

  get authError(): string | null {
    return this._authError;
  }

  get hasAccess(): boolean {
    return !!bypassAuth || !!this._payload;
  }

  get orgId(): number {
    return bypassAuth?.orgId ?? this._payload?.orgId ?? -1;
  }

  get userId(): number {
    return bypassAuth?.userId ?? this._payload?.userId ?? -1;
  }

  get allowedRoles(): RoleEnum[] {
    return bypassAuth
      ? Object.values(RoleEnum)
      : (this._payload?.allowedRoles.map(
          (role) => RoleEnum[capitalize(role)],
        ) ?? []);
  }

  get role(): RoleEnum | null {
    return this._role ? RoleEnum[capitalize(this._role)] : null;
  }

  setRole(role?: RoleEnum | null) {
    if (!role) {
      this._role = null;
      return;
    }

    if (this.allowedRoles.includes(role)) {
      this._role = toLowerCase(role);
    } else {
      console.warn("[AuthManager] Role not allowed");
    }
  }

  get headers(): Record<string, string> {
    const headers: Record<string, string> = {};
    if (bypassAuth) {
      headers["X-Admin-Secret"] = bypassAuth.adminSecret;
      headers["X-Org-Id"] = bypassAuth.orgId.toString();
      headers["X-User-Id"] = bypassAuth.userId.toString();
    }
    if (this._role) {
      headers["X-User-Role"] = this._role;
    }
    return headers;
  }
}
