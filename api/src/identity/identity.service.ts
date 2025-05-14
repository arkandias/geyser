import { errorMessage } from "@geyser/shared";
import {
  Injectable,
  OnModuleInit,
  UnauthorizedException,
} from "@nestjs/common";
import axios from "axios";
import jose from "jose";

import { ConfigService } from "../config/config.service";
import {
  IdentityProviderMetadata,
  IdentityProviderMetadataSchema,
} from "./identity-provider-metadata.dto";
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
  private _metadata: IdentityProviderMetadata | null = null;
  private _jwks: ReturnType<typeof jose.createRemoteJWKSet> | null = null;

  constructor(private configService: ConfigService) {}

  async onModuleInit() {
    const response = await axios.get(this.configService.oidc.discoveryURL);

    this._metadata = IdentityProviderMetadataSchema.parse(response.data);
    this._jwks = jose.createRemoteJWKSet(new URL(this._metadata.jwksURL));
  }

  async verifyToken(token: string): Promise<IdentityTokenPayload> {
    try {
      // Decode the token's protected header to get the key ID
      const protectedHeaderParameters = jose.decodeProtectedHeader(token);

      // Get the public key from JWKS
      if (!this._jwks) {
        throw new Error("JWKS is not loaded");
      }
      const key = await this._jwks(protectedHeaderParameters);

      // Verify the token with the public key
      const verified = await jose.jwtVerify(token, key, {
        issuer: this.metadata.issuerURL,
      });

      return IdentityTokenPayloadSchema.parse(verified.payload);
    } catch (error) {
      throw new UnauthorizedException(
        `Identity token verification failed: ${errorMessage(error)}`,
      );
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
      throw new UnauthorizedException(
        `Identity token request failed: ${errorMessage(error)}`,
      );
    }
  }

  get metadata() {
    if (!this._metadata) {
      throw new Error("Provider metadata are not loaded");
    }
    return this._metadata;
  }
}
