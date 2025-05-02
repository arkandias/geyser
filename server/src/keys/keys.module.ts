import { Module, OnModuleInit } from "@nestjs/common";

import { KeysController } from "./keys.controller";
import { KeysService } from "./keys.service";

@Module({
  providers: [KeysService],
  controllers: [KeysController],
  exports: [KeysService],
})
export class KeysModule implements OnModuleInit {
  constructor(private readonly keysService: KeysService) {}

  async onModuleInit() {
    await this.keysService.init();
  }
}
