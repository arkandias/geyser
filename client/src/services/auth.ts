import {
  type AccessTokenPayload,
  type RoleType,
  accessTokenPayloadSchema,
  organizationDataSchema,
} from "@geyser/shared";
import axios from "axios";
import { z } from "zod/v4";

import {
  API_REQUEST_TIMEOUT,
  API_TOKEN_MIN_VALIDITY,
} from "@/config/constants.ts";
import {
  adminSecret,
  apiUrl,
  bypassAuth,
  organizationKey,
} from "@/config/environment.ts";
import { RoleEnum } from "@/gql/graphql.ts";
import { capitalize, toLowerCase } from "@/utils";

const api = axios.create({
  baseURL: apiUrl,
  timeout: API_REQUEST_TIMEOUT,
  withCredentials: true,
});

export class AuthManager {
  private _postLogin = false;
  private _postLogout = false;
  private _authError: string | null = null;
  private _organizationKey: string | null = null;
  private _organizationId: number | null = null;
  private _payload: AccessTokenPayload | null = null;
  private _role: RoleType | null = null;

  async init(): Promise<void> {
    // Get organization id
    await this.getOrganizationId();
    if (!this._organizationId) {
      return;
    }

    // Check URL params for authentication state
    const url = new URL(window.location.href);
    this._postLogin = url.searchParams.get("post_login") === "true";
    this._postLogout = url.searchParams.get("post_logout") === "true";
    this._authError = url.searchParams.get("auth_error");

    // Exit early if error or logout
    if (this._authError) {
      console.error(`[AuthManager] Authentication error: ${this._authError}`);
      return;
    }
    if (this._postLogout) {
      console.debug(`[AuthManager] Logged out`);
      return;
    }

    // Bypass authentication (dev only)
    if (bypassAuth) {
      this._payload = {
        orgId: this._organizationId,
        userId: 0,
        isAdmin: true,
        allowedRoles: ["organizer", "commissioner", "teacher"],
        defaultRole: "teacher",
        iss: "",
        sub: 0,
        aud: "",
        exp: Infinity,
        iat: 0,
        jti: "",
        typ: "",
      };
      return;
    }

    // Try to verify existing token
    const verified = await this.verify();
    if (verified) {
      console.debug("[AuthManager] Logged in");
      return;
    }

    // Don't retry if we just came from login
    if (this._postLogin) {
      console.error("[AuthManager] Verification failed post login");
      return;
    }

    // Try to refresh token
    const refreshed = await this.refresh();
    if (refreshed) {
      // Re-verify to store payload
      await this.verify();
      return;
    }

    // Redirect to login
    await this.login();
  }

  async getOrganizationId(): Promise<void> {
    // Set organization key from environment if provided
    if (organizationKey) {
      this._organizationKey = organizationKey;
      console.debug(
        `[AuthManager] Organization key from environment: ${this._organizationKey}`,
      );
      return;
    }

    // If not provided, use current location hostname
    const domainLabels = window.location.hostname.split(".");
    if (domainLabels.length < 3 || !domainLabels[0]) {
      console.error("[AuthManager] Could not determine organization key");
      return;
    }
    this._organizationKey = domainLabels[0];
    console.debug(
      `[AuthManager] Organization key from subdomain: ${this._organizationKey}`,
    );

    try {
      const response = await api.get(`/organization/${this._organizationKey}`);
      this._organizationId = organizationDataSchema.parse(response.data).id;
      console.debug(`[AuthManager] Organization id: ${this._organizationId}`);
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error("[AuthManager] Invalid organization data");
      } else if (axios.isAxiosError(error)) {
        if (error.response) {
          console.debug(
            `[AuthManager] Could not get organization data: ${error.response.status} ${error.response.statusText}`,
          );
        } else {
          console.debug(
            "[AuthManager] Could not get organization data: Network error",
          );
        }
      } else {
        console.debug(
          "[AuthManager] Could not get organization data: Unknown error",
        );
      }
    }
  }

  async login(): Promise<void> {
    if (bypassAuth) {
      return;
    }

    const redirectUrl = new URL(window.location.href);
    redirectUrl.searchParams.delete("post_login");
    redirectUrl.searchParams.delete("post_logout");
    redirectUrl.searchParams.delete("auth_error");

    console.debug("[AuthManager] Logging in...");
    window.location.href = api.getUri({
      url: "/auth/login",
      params: {
        redirect_url: redirectUrl,
        org_id: this._organizationId,
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

    const redirectUrl = new URL(window.location.href);
    redirectUrl.searchParams.delete("post_login");
    redirectUrl.searchParams.delete("post_logout");
    redirectUrl.searchParams.delete("auth_error");

    console.debug("[AuthManager] Logging out...");
    window.location.href = api.getUri({
      url: "/auth/logout",
      params: {
        redirect_url: redirectUrl,
        org_id: this._organizationId,
      },
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
      console.debug("[AuthManager] Verification succeeded");
      console.debug("[AuthManager] Token payload:", this._payload);
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.debug("[AuthManager] Verification failed: Invalid token");
      } else if (axios.isAxiosError(error)) {
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
      this._payload = null;
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
    return (
      !this._payload ||
      this._payload.exp - Math.floor(Date.now() / 1000) < API_TOKEN_MIN_VALIDITY
    );
  }

  get postLogin(): boolean {
    return this._postLogin;
  }

  get postLogout(): boolean {
    return this._postLogout;
  }

  get authError(): string | null {
    return this._authError;
  }

  get organizationFound(): boolean {
    return !!this._organizationId;
  }

  get hasAccess(): boolean {
    return !!this._payload;
  }

  get orgId(): number {
    return this._payload?.orgId ?? -1;
  }

  get userId(): number {
    return this._payload?.userId ?? -1;
  }

  get isAdmin(): boolean {
    return this._payload?.isAdmin ?? false;
  }

  get allowedRoles(): RoleEnum[] {
    return (
      this._payload?.allowedRoles.map((role) => RoleEnum[capitalize(role)]) ??
      []
    );
  }

  get role(): RoleEnum | null {
    if (!this._role) {
      return null;
    }
    return RoleEnum[capitalize(this._role)];
  }

  setRole(role: RoleEnum | null) {
    this._role = role ? toLowerCase(role) : null;

    if (role && !this.allowedRoles.includes(role)) {
      console.warn("[AuthManager] Role not allowed");
    }
  }

  get headers(): Record<string, string> {
    const headers: Record<string, string> = {};
    if (this.isAdmin) {
      headers["X-Admin-Secret"] = adminSecret ?? "";
      headers["X-Org-Id"] = this.orgId.toString();
      headers["X-User-Id"] = this.userId.toString();
    }
    if (this._role) {
      headers["X-Role"] = this._role;
    }
    return headers;
  }
}
