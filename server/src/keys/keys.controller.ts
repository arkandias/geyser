import { Controller, Get, Header } from "@nestjs/common";

import { KeysService } from "./keys.service";

@Controller(".well-known")
export class KeysController {
  constructor(private readonly keysService: KeysService) {}

  @Get("jwks.json")
  @Header("Content-Type", "application/json")
  getPublicKeyJwks() {
    return this.keysService.jwks;
  }
}
