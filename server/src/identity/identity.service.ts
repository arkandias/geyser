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

import { ConfigService } from "../config/config.service";
import {
  IdentityProviderConfiguration,
  identityProviderConfigurationSchema,
} from "./identity-provider-configuration.dto";
import {
  IdentityTokenPayload,
  identityTokenPayloadSchema,
} from "./identity-token-payload.dto";
import { IdentityTokenRequestParameters } from "./identity-token-request-parameters.interface";
import {
  TokenResponse,
  identityTokenResponseSchema,
} from "./identity-token-response.dto";

@Injectable()
export class IdentityService implements OnModuleInit {
  private readonly logger = new Logger(IdentityService.name);
  private _metadata: IdentityProviderConfiguration | null = null;
  private _jwks: ReturnType<typeof jose.createRemoteJWKSet> | null = null;

  constructor(private configService: ConfigService) {}

  async onModuleInit() {
    const response = await axios.get(this.configService.oidc.discoveryUrl);

    this._metadata = identityProviderConfigurationSchema.parse(response.data);
    this.logger.log(`Identity provider metadata loaded`);

    this._jwks = jose.createRemoteJWKSet(new URL(this._metadata.jwksUrl));
    this.logger.log("JWKS loaded");
  }

  async verifyToken(token: string): Promise<IdentityTokenPayload> {
    try {
      // Decode the token's protected header to get the key ID
      const protectedHeaderParameters = jose.decodeProtectedHeader(token);

      // Get the public key from JWKS
      const key = await this.jwks(protectedHeaderParameters);

      // Verify the token with the public key
      const { payload } = await jose.jwtVerify(token, key, {
        issuer: this.metadata.issuerUrl,
      });

      return identityTokenPayloadSchema.parse(payload);
    } catch (error) {
      if (error instanceof jose.errors.JOSEError) {
        throw new UnauthorizedException("Token verification failed");
      }
      if (error instanceof z.ZodError) {
        throw new UnauthorizedException("Invalid identity token");
      }
      throw error;
    }
  }

  async requestToken(
    params: IdentityTokenRequestParameters,
  ): Promise<TokenResponse> {
    try {
      const response = await axios.post(
        this.metadata.tokenUrl,
        new URLSearchParams({ ...params }).toString(),
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } },
      );

      return identityTokenResponseSchema.parse(response.data);
    } catch (error) {
      if (error instanceof InternalServerErrorException) {
        throw error;
      }
      throw new UnauthorizedException(`Identity token request failed`);
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
