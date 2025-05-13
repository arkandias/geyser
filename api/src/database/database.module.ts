import { ConfigModule } from "../config/config.module";
import { ConfigService } from "../config/config.service";
import { Role } from "../roles/role.entity";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        url: configService.databaseURL,
        entities: [Role],
      }),
    }),
  ],
})
export class DatabaseModule {}
