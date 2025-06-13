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
import {
  adminSecret,
  apiUrl,
  bypassAuth,
  orgId,
  userId,
} from "@/config/env.ts";
import { RoleEnum } from "@/gql/graphql.ts";
import { capitalize, toLowerCase } from "@/utils";

const api = axios.create({
  baseURL: apiUrl.href,
  timeout: API_REQUEST_TIMEOUT,
  withCredentials: true,
});

export class AuthManager {
  private _payload?: AccessTokenPayload;
  private _role: RoleType | null = null;
  private _postLogin = false;
  private _postLogout = false;
  private _authError: string | null = null;

  async init(): Promise<void> {
    if (bypassAuth) {
      if (!adminSecret) {
        throw new Error(
          "Missing admin secret to bypass authentication. Set VITE_ADMIN_SECRET environment variable",
        );
      }
      if (!orgId) {
        throw new Error(
          "Missing organisation id to bypass authentication. Set VITE_ORG_ID environment variable",
        );
      }
      if (!userId) {
        throw new Error(
          "Missing user id to bypass authentication. Set VITE_USER_ID environment variable",
        );
      }
      return;
    }

    console.debug("[AuthManager] Initializing authentication...");
    const url = new URL(window.location.href);

    // Step 1: Check for authentication errors from API
    this._authError = url.searchParams.get("auth_error");
    if (this._authError) {
      console.error(`[AuthManager] Authentication error: ${this._authError}`);
      return;
    }

    // Step 2: Parse login/logout state from URL parameters (set by API)
    this._postLogin = url.searchParams.get("post_login") === "true";
    this._postLogout = url.searchParams.get("post_logout") === "true";

    // Validate that both post_login and post_logout aren't set simultaneously
    if (this._postLogin && this._postLogout) {
      this._authError =
        "Query parameters 'post_login' and 'post_logout' cannot be simultaneously set to 'true'";
      console.error(`[AuthManager] Authentication error: ${this._authError}`);
      return;
    }

    // Step 3: Handle post-logout state - user has been logged out, no further action needed
    if (this._postLogout) {
      console.debug("[AuthManager] Logged out");
      return;
    }

    // Step 4: Verify current authentication status using existing tokens
    const verified = await this.verify();

    // Step 5: If already authenticated OR just completed login flow, we're done
    if (verified) {
      console.debug("[AuthManager] Logged in");
      return;
    }
    if (this._postLogin) {
      console.warn("[AuthManager] Login failed");
      return;
    }

    // Step 6: Authentication failed - attempt to refresh tokens
    const refreshed = await this.refresh();
    if (refreshed) {
      // Refresh succeeded - verify again to store payload
      await this.verify();
      return;
    }

    // Step 7: Refresh failed - redirect to login
    await this.login();
  }

  async login(): Promise<void> {
    if (bypassAuth) {
      return;
    }

    console.debug("[AuthManager] Logging in...");

    const redirectUrl = new URL(window.location.href);
    redirectUrl.searchParams.set("post_login", "true");
    redirectUrl.searchParams.delete("post_logout");
    redirectUrl.searchParams.delete("auth_error");

    window.location.href = api.getUri({
      url: "/auth/login",
      params: {
        redirect_url: redirectUrl,
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

    const redirectUrl = new URL(window.location.href);
    redirectUrl.searchParams.set("post_logout", "true");
    redirectUrl.searchParams.delete("post_login");
    redirectUrl.searchParams.delete("auth_error");

    window.location.href = api.getUri({
      url: "/auth/logout",
      params: {
        redirect_url: redirectUrl,
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
      this._role = this._payload.defaultRole;
      console.debug("[AuthManager] Verification succeeded:");
      console.debug(this._payload);
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.debug("[AuthManager] Verification failed: Invalid token");
        console.debug(error.issues);
      }
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.debug(
            `[AuthManager] Verification failed: ${error.response.status} ${error.response.statusText}`,
          );
        } else {
          console.debug("[AuthManager] Verification failed: Network error");
          console.debug(error.message);
        }
      } else {
        console.debug("[AuthManager] Verification failed: Unknown error");
        console.debug(error);
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
          console.debug(error.message);
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

  get authError(): string | null {
    return this._authError;
  }

  get hasAccess(): boolean {
    return bypassAuth || !!this._payload;
  }

  get isLoggedOut(): boolean {
    return !bypassAuth && this._postLogout;
  }

  get orgId(): number {
    return (bypassAuth ? orgId : this._payload?.orgId) ?? -1;
  }

  get userId(): number {
    return (bypassAuth ? userId : this._payload?.userId) ?? -1;
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
      if (adminSecret) {
        headers["X-Admin-Secret"] = adminSecret;
      }
      if (orgId) {
        headers["X-Org-Id"] = orgId.toString();
      }
      if (userId) {
        headers["X-User-Id"] = userId.toString();
      }
    }
    if (this._role) {
      headers["X-User-Role"] = this._role;
    }
    return headers;
  }
}
