import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ConfigService } from "@/config/config.service";
import { Organization } from "@/organization/organization.entity";
import { Role } from "@/role/role.entity";
import { User } from "@/user/user.entity";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        url: configService.databaseUrl.href,
        entities: [Organization, Role, User],
      }),
    }),
  ],
})
export class DatabaseModule {}
