import { axiosErrorMessage, zodErrorMessage } from "@geyser/shared";
import {
  Injectable,
  InternalServerErrorException,
  Logger,
  OnModuleInit,
  UnauthorizedException,
} from "@nestjs/common";
import axios from "axios";
import jose from "jose";
import { z } from "zod";

import {
  OidcEndpoints,
  oidcEndpointsSchema,
} from "@/auth/oidc-endpoints.schema";
import {
  OidcTokenPayload,
  oidcTokenPayloadSchema,
} from "@/auth/oidc-token-payload.schema";
import { OidcTokenRequestParameters } from "@/auth/oidc-token-request-parameters.interface";
import { oidcTokenResponseSchema } from "@/auth/oidc-token-response.schema";
import { joseErrorMessage } from "@/common/utils";
import { ConfigService } from "@/config/config.service";

@Injectable()
export class OidcService implements OnModuleInit {
  private readonly logger = new Logger(OidcService.name);
  private _metadata?: OidcEndpoints;
  private _getKey: ReturnType<typeof jose.createRemoteJWKSet> | null = null;

  constructor(private configService: ConfigService) {}

  async onModuleInit() {
    const response = await axios.get(this.configService.oidc.discoveryUrl.href);

    this._metadata = oidcEndpointsSchema.parse(response.data);
    this.logger.log(`Identity provider metadata loaded`);

    this._getKey = jose.createRemoteJWKSet(new URL(this._metadata.jwksUrl));
    this.logger.log("Identity provider JWKS loaded");
  }

  async verifyToken(token: string): Promise<OidcTokenPayload> {
    try {
      const { payload } = await jose.jwtVerify(token, this.getKey, {
        issuer: this.metadata.issuerUrl,
      });
      return oidcTokenPayloadSchema.parse(payload);
    } catch (error) {
      if (error instanceof jose.errors.JOSEError) {
        throw new UnauthorizedException({
          message: "Identity token verification failed",
          error: joseErrorMessage(error),
        });
      }
      if (error instanceof z.ZodError) {
        throw new UnauthorizedException({
          message: "Invalid identity token",
          error: zodErrorMessage(error),
        });
      }
      throw error;
    }
  }

  async requestToken(params: OidcTokenRequestParameters): Promise<string> {
    try {
      const response = await axios.post(
        this.metadata.tokenUrl,
        new URLSearchParams({ ...params }).toString(),
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } },
      );
      const { accessToken } = oidcTokenResponseSchema.parse(response.data);
      return accessToken;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new UnauthorizedException({
          message: "Identity token request failed",
          error: axiosErrorMessage(error),
        });
      }
      if (error instanceof z.ZodError) {
        throw new UnauthorizedException({
          message: "Invalid identity token",
          error: zodErrorMessage(error),
        });
      }
      throw error;
    }
  }

  get getKey() {
    if (!this._getKey) {
      throw new InternalServerErrorException("JWKS not loaded");
    }
    return this._getKey;
  }

  get metadata() {
    if (!this._metadata) {
      throw new InternalServerErrorException(
        "Identity provider metadata not loaded",
      );
    }
    return this._metadata;
  }
}
