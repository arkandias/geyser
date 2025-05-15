import {
  type AccessTokenPayload,
  AccessTokenPayloadSchema,
  errorMessage,
} from "@geyser/shared";
import axios, {
  type AxiosRequestConfig,
  type AxiosResponse,
  isAxiosError,
} from "axios";

import {
  API_REQUEST_TIMEOUT,
  API_TOKEN_MIN_VALIDITY,
} from "@/config/constants.ts";
import { apiURL } from "@/config/env.ts";
import type { RoleTypeEnum } from "@/gql/graphql.ts";

const api = axios.create({
  baseURL: apiURL.href,
  timeout: API_REQUEST_TIMEOUT,
  withCredentials: true,
});

export class AuthManager {
  private _payload?: AccessTokenPayload;
  private _role?: string;

  async init(): Promise<void> {
    const verified = await this.verify();
    if (verified) {
      return;
    }

    const refreshed = await this.refresh();
    if (refreshed) {
      // Verify access again to store the payload
      await this.verify();
      return;
    }

    this.login();
  }

  login(): void {
    window.location.href = api.getUri({
      url: "/auth/login",
      params: {
        redirect: window.location.href,
      },
    });
  }

  private async requestAPI(
    config: AxiosRequestConfig,
    callbacks?: {
      onSuccess?: (response: AxiosResponse) => void | Promise<void>;
      onError?: (response: AxiosResponse) => void | Promise<void>;
    },
  ): Promise<boolean> {
    try {
      const response = await api.request(config);

      await callbacks?.onSuccess?.(response);

      return true;
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        await callbacks?.onError?.(error.response);
      } else {
        console.warn(
          `Request to ${api.getUri(config)} failed:`,
          errorMessage(error),
        );
      }

      return false;
    }
  }

  async verify(): Promise<boolean> {
    return this.requestAPI(
      { url: "/auth/verify" },
      {
        onSuccess: (response) => {
          this._payload = AccessTokenPayloadSchema.parse(response.data);
        },
        onError: (response) => {
          if (response.status === 401) {
            delete this._payload;
          }
        },
      },
    );
  }

  async refresh(): Promise<boolean> {
    return this.requestAPI(
      { url: "/auth/refresh", method: "POST" },
      {
        onError: (response) => {
          if (response.status === 401) {
            delete this._payload;
          }
        },
      },
    );
  }

  async logout(): Promise<void> {
    await this.requestAPI({ url: "/auth/logout", method: "POST" });
    delete this._payload;
    window.location.href = "https://google.fr";
  }

  get payload(): AccessTokenPayload {
    if (!this._payload) {
      throw new Error("No stored payload");
    }
    return this._payload;
  }

  get uid(): string {
    return this.payload.uid;
  }

  get allowedRoles(): string[] {
    return this.payload.allowedRoles;
  }

  setActiveRole(role?: RoleTypeEnum): void {
    if (role !== undefined) {
      this._role = role.toLowerCase();
    } else {
      delete this._role;
    }
  }

  getRoleHeader(): Record<string, string> {
    return this._role
      ? {
          "X-Hasura-Role": this._role,
        }
      : {};
  }

  shouldRefresh(): boolean {
    if (!this._payload) {
      return true;
    }

    return (
      this._payload.exp - Math.floor(Date.now() / 1000) > API_TOKEN_MIN_VALIDITY
    );
  }
}
