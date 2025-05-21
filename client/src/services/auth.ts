import {
  type AccessTokenPayload,
  type RoleType,
  accessTokenPayloadSchema,
} from "@geyser/shared";
import axios from "axios";
import { type ComputedRef, type Ref, computed, ref } from "vue";

import {
  API_REQUEST_TIMEOUT,
  API_TOKEN_MIN_VALIDITY,
} from "@/config/constants.ts";
import { apiUrl } from "@/config/env.ts";
import { RoleTypeEnum } from "@/gql/graphql.ts";
import { capitalize, toLowerCase } from "@/utils/misc.ts";

const api = axios.create({
  baseURL: apiUrl.href,
  timeout: API_REQUEST_TIMEOUT,
  withCredentials: true,
});

export class AuthManager {
  private _payload?: AccessTokenPayload;
  private _role: Ref<RoleType> = ref("teacher");

  readonly activeRole: ComputedRef<RoleTypeEnum> = computed(
    () => RoleTypeEnum[capitalize(this._role.value)],
  );

  async init(): Promise<void> {
    console.debug("[AuthManager] Initializing authentication...");
    const url = new URL(window.location.href);

    if (url.searchParams.get("post_logout") === "true") {
      console.debug("[AuthManager] Logged out");
      return;
    }

    const verified = await this.verify();
    if (verified || url.searchParams.get("post_login") === "true") {
      const authError = url.searchParams.get("auth_error");
      if (authError) {
        console.error(`[AuthManager] Authentication Error: ${authError}`);
      }
      return;
    }

    const refreshed = await this.refresh();
    if (refreshed) {
      // Verify access again to store the payload
      await this.verify();
      return;
    }

    await this.login();
  }

  async login(): Promise<void> {
    console.debug("[AuthManager] Logging in...");

    const redirectUrl = new URL(window.location.href);
    redirectUrl.searchParams.set("post_login", "true");

    window.location.href = api.getUri({
      url: "/auth/login",
      params: {
        redirect_url: window.location.href,
      },
    });

    // Prevent further execution since we're redirecting to login page
    await new Promise(() => {
      // This promise intentionally never resolves
    });
  }

  async verify(): Promise<boolean> {
    console.debug("[AuthManager] Verifying access token...");
    try {
      const response = await api.get("/auth/verify");
      this._payload = accessTokenPayloadSchema.parse(response.data);
      console.debug("[AuthManager] Verification succeeded:", this._payload);
      return true;
    } catch (error) {
      if (axios.isAxiosError<{ message?: string }>(error)) {
        console.debug(
          `[AuthManager] Verification failed: ${error.response?.data.message}`,
        );
      } else {
        console.debug("[AuthManager] Verification failed: Unknown error");
      }
      delete this._payload;
      return false;
    }
  }

  async refresh(): Promise<boolean> {
    console.debug("[AuthManager] Refreshing access token...");
    try {
      await api.post("/auth/refresh");
      console.debug("[AuthManager] Refresh succeeded");
      return true;
    } catch (error) {
      if (axios.isAxiosError<{ message?: string }>(error)) {
        console.debug(
          `[AuthManager] Refresh failed: ${error.response?.data.message}`,
        );
      } else {
        console.debug("[AuthManager] Refresh failed: Unknown error");
      }
      return false;
    }
  }

  async logout(): Promise<void> {
    console.debug("[AuthManager] Logging out...");

    const redirectUrl = new URL(window.location.href);
    redirectUrl.searchParams.set("post_logout", "true");

    window.location.href = api.getUri({
      url: "/auth/logout",
      params: {
        redirect_url: redirectUrl,
      },
    });

    // Prevent further execution since we're redirecting to login page
    await new Promise(() => {
      // This promise intentionally never resolves
    });
  }

  get isAuthenticated(): boolean {
    return !!this._payload;
  }

  get uid(): string {
    return this._payload?.uid ?? "";
  }

  get displayname(): string {
    return this._payload?.displayname ?? "";
  }

  get isActive(): boolean {
    return !!this._payload?.active;
  }

  get allowedRoles(): RoleTypeEnum[] {
    return (
      this._payload?.roles.map((role) => RoleTypeEnum[capitalize(role)]) ?? []
    );
  }

  setActiveRole(role: RoleTypeEnum): void {
    if (!this.allowedRoles.includes(role)) {
      console.warn("[AuthManager] Role not allowed");
      return;
    }
    this._role.value = toLowerCase(role);
  }

  getRoleHeader(): Record<string, string> {
    return {
      "X-Hasura-Role": this._role.value,
    };
  }

  shouldRefresh(): boolean {
    return (
      !this._payload ||
      this._payload.exp - Math.floor(Date.now() / 1000) < API_TOKEN_MIN_VALIDITY
    );
  }
}
