import {
  Injectable,
  InternalServerErrorException,
  Logger,
  OnModuleInit,
  UnauthorizedException,
} from "@nestjs/common";
import axios from "axios";
import jose from "jose";

import { ConfigService } from "../config/config.service";
import {
  IdentityProviderConfiguration,
  IdentityProviderConfigurationSchema,
} from "./identity-provider-configuration.dto";
import {
  IdentityTokenPayload,
  IdentityTokenPayloadSchema,
} from "./identity-token-payload.dto";
import { IdentityTokenRequestParameters } from "./identity-token-request-parameters.interface";
import {
  IdentityTokenResponseSchema,
  TokenResponse,
} from "./identity-token-response.dto";

@Injectable()
export class IdentityService implements OnModuleInit {
  private readonly logger = new Logger(IdentityService.name);
  private _metadata: IdentityProviderConfiguration | null = null;
  private _jwks: ReturnType<typeof jose.createRemoteJWKSet> | null = null;

  constructor(private configService: ConfigService) {}

  async onModuleInit() {
    const response = await axios.get(this.configService.oidc.discoveryURL);

    this._metadata = IdentityProviderConfigurationSchema.parse(response.data);
    this.logger.log(`Identity provider metadata loaded`);

    this._jwks = jose.createRemoteJWKSet(new URL(this._metadata.jwksURL));
    this.logger.log("JWKS loaded");
  }

  async verifyToken(token: string): Promise<IdentityTokenPayload> {
    try {
      // Decode the token's protected header to get the key ID
      const protectedHeaderParameters = jose.decodeProtectedHeader(token);

      // Get the public key from JWKS
      const key = await this.jwks(protectedHeaderParameters);

      // Verify the token with the public key
      const verified = await jose.jwtVerify(token, key, {
        issuer: this.metadata.issuerURL,
      });

      return IdentityTokenPayloadSchema.parse(verified.payload);
    } catch (error) {
      if (error instanceof InternalServerErrorException) {
        throw error;
      }
      throw new UnauthorizedException("Identity token verification failed");
    }
  }

  async requestToken(
    params: IdentityTokenRequestParameters,
  ): Promise<TokenResponse> {
    try {
      const response = await axios.post(
        this.metadata.tokenURL,
        new URLSearchParams({ ...params }).toString(),
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } },
      );

      return IdentityTokenResponseSchema.parse(response.data);
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
