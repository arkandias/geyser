import {
  type AccessTokenPayload,
  DEFAULT_ORGANIZATION_KEY,
  MASTER_ORGANIZATION_KEY,
  type OrganizationData,
  accessTokenPayloadSchema,
  axiosErrorMessage,
  errorMessage,
  organizationDataSchema,
} from "@geyser/shared";
import axios from "axios";
import { z } from "zod";

import {
  API_REQUEST_TIMEOUT,
  API_TOKEN_MIN_VALIDITY,
} from "@/config/constants.ts";
import {
  adminSecret,
  apiUrl,
  baseDomain,
  bypassAuth,
  multiTenant,
  organizationKey,
} from "@/config/environment.ts";
import { RoleEnum } from "@/gql/graphql.ts";
import { isRole } from "@/utils";

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
  private _organization: OrganizationData | null = null;
  private _payload: AccessTokenPayload | null = null;
  private _role: string | null = null;

  async init(): Promise<void> {
    // Get organization
    this.getOrganizationKey();
    if (!this._organizationKey) {
      return;
    }
    await this.getOrganization();
    if (!this._organization) {
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
      console.debug("[AuthManager] Bypassing authentication...");
      this._payload = {
        orgId: this._organization.id,
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

  getOrganizationKey(): void {
    // Get organization key from environment if provided
    if (organizationKey) {
      this._organizationKey = organizationKey;
      console.debug(
        `[AuthManager] Organization key (from environment): '${this._organizationKey}'`,
      );
      return;
    }

    // Multi-tenant mode: Get organization key from current location if possible
    if (multiTenant) {
      const hostname = window.location.hostname;

      // Check if hostname is a subdomain of base domain
      if (!hostname.endsWith("." + baseDomain)) {
        throw new Error(
          `[AuthManager] Current hostname '${hostname}' is not a subdomain of '${baseDomain}'`,
        );
      }

      // Extract subdomain
      const subdomain = hostname.slice(0, -(baseDomain.length + 1)); // +1 for the dot

      // Validate subdomain
      if (/^[a-z-]+$/.test(subdomain)) {
        this._organizationKey = subdomain;
        console.debug(
          `[AuthManager] Organization key (from subdomain): '${this._organizationKey}'`,
        );
        return;
      } else {
        throw new Error(`[AuthManager] Invalid subdomain: '${subdomain}'`);
      }
    }

    // Fallback to default organization key
    this._organizationKey = DEFAULT_ORGANIZATION_KEY;
    console.debug(
      `[AuthManager] Organization key (fallback to default): '${this._organizationKey}'`,
    );
  }

  async getOrganization(): Promise<void> {
    try {
      const response = await api.get(`/organization/${this._organizationKey}`);
      this._organization = organizationDataSchema.parse(response.data);
      console.debug(
        `[AuthManager] Organization id: '${this._organization.id}'`,
      );
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.debug(
          "[AuthManager] Could not get organization data: Invalid data",
        );
      } else {
        const message = axios.isAxiosError(error)
          ? axiosErrorMessage(error)
          : errorMessage(error);
        console.debug(
          `[AuthManager] Could not get organization data: ${message}`,
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
        org_id: this._organization?.id,
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
        org_id: this._organization?.id,
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
      } else {
        const message = axios.isAxiosError(error)
          ? axiosErrorMessage(error)
          : errorMessage(error);
        console.debug(`[AuthManager] Verification failed: ${message}`);
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
      const message = axios.isAxiosError(error)
        ? axiosErrorMessage(error)
        : errorMessage(error);
      console.debug(`[AuthManager] Refresh failed: ${message}`);
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

  get masterOrganization(): boolean {
    return this._organizationKey === MASTER_ORGANIZATION_KEY;
  }

  get organizationFound(): boolean {
    return !!this._organization;
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

  get allowedRoles(): RoleEnum[] {
    return this._payload?.isAdmin
      ? Object.values(RoleEnum)
      : (this._payload?.allowedRoles
          .map((role) => role.toUpperCase())
          .filter((role) => isRole(role)) ?? []);
  }

  get isAdmin(): boolean {
    return this._payload?.isAdmin ?? false;
  }

  setRole(role: RoleEnum | null) {
    this._role = role?.toLowerCase() ?? null;

    if (role && !this.allowedRoles.includes(role)) {
      console.warn("[AuthManager] Role not allowed");
    }
  }

  setAdminRole(): void {
    this._role = "admin";
  }

  get headers(): Record<string, string> {
    const headers: Record<string, string> = {};
    if (adminSecret) {
      headers["X-Admin-Secret"] = adminSecret;
    }
    if (this.isAdmin) {
      headers["X-Org-Id"] = this.orgId.toString();
      headers["X-User-Id"] = this.userId.toString();
    }
    if (this._role) {
      headers["X-Role"] = this._role;
    }
    return headers;
  }
}
