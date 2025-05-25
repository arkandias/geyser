import {
  Injectable,
  InternalServerErrorException,
  Logger,
  OnModuleInit,
  UnauthorizedException,
} from "@nestjs/common";
import axios from "axios";
import jose from "jose";
import { z } from "zod/v4";

import { ConfigService } from "../config/config.service";
import { OidcEndpoints, oidcEndpointsSchema } from "./oidc-endpoints.schema";
import {
  OidcTokenPayload,
  oidcTokenPayloadSchema,
} from "./oidc-token-payload.schema";
import { OidcTokenRequestParameters } from "./oidc-token-request-parameters.interface";
import {
  OidcTokenResponse,
  oidcTokenResponseSchema,
} from "./oidc-token-response.schema";

@Injectable()
export class OidcService implements OnModuleInit {
  private readonly logger = new Logger(OidcService.name);
  private _metadata: OidcEndpoints | null = null;
  private _jwks: ReturnType<typeof jose.createRemoteJWKSet> | null = null;

  constructor(private configService: ConfigService) {}

  async onModuleInit() {
    const response = await axios.get(this.configService.oidc.discoveryUrl.href);

    this._metadata = oidcEndpointsSchema.parse(response.data);
    this.logger.log(`Identity provider metadata loaded`);

    this._jwks = jose.createRemoteJWKSet(new URL(this._metadata.jwksUrl));
    this.logger.log("Identity provider JWKS loaded");
  }

  async verifyToken(token: string): Promise<OidcTokenPayload> {
    try {
      // Decode the token's protected header to get the key ID
      const protectedHeaderParameters = jose.decodeProtectedHeader(token);

      // Get the public key from JWKS
      const key = await this.jwks(protectedHeaderParameters);

      // Verify the token with the public key
      const { payload } = await jose.jwtVerify(token, key, {
        issuer: this.metadata.issuerUrl,
      });

      return oidcTokenPayloadSchema.parse(payload);
    } catch (error) {
      if (error instanceof jose.errors.JOSEError) {
        throw new UnauthorizedException({
          message: "Identity token verification failed",
          error: `${error.name}: ${error.message}`,
        });
      }
      if (error instanceof z.ZodError) {
        throw new UnauthorizedException({
          message: "Invalid identity token",
          error: `${error.name}: ${error.message}`,
        });
      }
      throw error;
    }
  }

  async requestToken(
    params: OidcTokenRequestParameters,
  ): Promise<OidcTokenResponse> {
    try {
      const response = await axios.post(
        this.metadata.tokenUrl,
        new URLSearchParams({ ...params }).toString(),
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } },
      );

      console.log(response.data);
      return oidcTokenResponseSchema.parse(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new UnauthorizedException({
          message: "Identity token request failed",
          error: `${error.name}: ${error.message}`,
        });
      }
      if (error instanceof z.ZodError) {
        throw new UnauthorizedException({
          message: "Invalid identity token",
          error: `${error.name}: ${error.message}`,
        });
      }
      throw error;
    }
  }

  get jwks() {
    if (!this._jwks) {
      throw new InternalServerErrorException("JWKS not loaded");
    }
    return this._jwks;
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
