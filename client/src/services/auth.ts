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
  baseURL: apiURL,
  timeout: API_REQUEST_TIMEOUT,
  withCredentials: true,
});

export class AuthManager {
  private payload?: AccessTokenPayload;
  private activeRole?: RoleTypeEnum;

  async init(): Promise<void> {
    const verified = await this.verify();
    if (verified) {
      return;
    }

    const refreshed = await this.refresh();
    if (refreshed) {
      // Verify access to get the payload
      await this.verify();
      return;
    }

    this.login();
  }

  login(): void {
    const loginURL = new URL(apiURL + "/auth/login");
    loginURL.searchParams.append("redirect", window.location.href);
    window.location.href = loginURL.toString();
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
          this.payload = AccessTokenPayloadSchema.parse(response.data);
        },
        onError: (response) => {
          if (response.status === 401) {
            delete this.payload;
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
            delete this.payload;
          }
        },
      },
    );
  }

  async logout(): Promise<void> {
    await this.requestAPI({ url: "/auth/logout", method: "POST" });
    delete this.payload;
    window.location.href = "https://google.fr";
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
