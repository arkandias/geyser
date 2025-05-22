import { Injectable, UnauthorizedException } from "@nestjs/common";

import { ConfigService } from "../config/config.service";

@Injectable()
export class UrlService {
  readonly protocol: string;
  readonly rootDomain: string;
  readonly subdomains: string;
  readonly loginCallbackUrl: URL;
  readonly logoutCallbackUrl: URL;

  constructor(private configService: ConfigService) {
    this.protocol = this.configService.apiUrl.protocol;

    const domains = this.configService.apiUrl.hostname.split(".");
    if (domains.length > 2) {
      this.rootDomain = domains.slice(1).join(".");
    } else {
      this.rootDomain = this.configService.apiUrl.hostname;
    }
    this.loginCallbackUrl = new URL(
      "/auth/login/callback",
      this.configService.apiUrl,
    );
    this.logoutCallbackUrl = new URL(
      "/auth/logout/callback",
      this.configService.apiUrl,
    );

    this.subdomains = this.protocol + "//*." + this.rootDomain;
  }

  validateRedirectUrl(redirectUrl: string | null | undefined): URL | null {
    if (!redirectUrl) {
      return null;
    }

    let url: URL;
    try {
      url = new URL(redirectUrl);
    } catch (_) {
      throw new UnauthorizedException("Invalid redirect URL");
    }

    if (
      url.protocol === this.configService.apiUrl.protocol &&
      url.hostname.endsWith(this.rootDomain)
    ) {
      return url;
    }

    throw new UnauthorizedException("Redirect URL not allowed");
  }
}
