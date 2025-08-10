import { Module } from "@nestjs/common";

import { KeysController } from "@/keys/keys.controller";
import { KeysService } from "@/keys/keys.service";

@Module({
  controllers: [KeysController],
  providers: [KeysService],
  exports: [KeysService],
})
export class KeysModule {}
