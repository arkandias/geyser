import { Controller, Get } from "@nestjs/common";
import {
  DiskHealthIndicator,
  HealthCheck,
  HealthCheckService,
  HttpHealthIndicator,
  MemoryHealthIndicator,
  TypeOrmHealthIndicator,
} from "@nestjs/terminus";

import { ConfigService } from "@/config/config.service";

@Controller("health")
export class HealthController {
  constructor(
    private configService: ConfigService,
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private db: TypeOrmHealthIndicator,
    private disk: DiskHealthIndicator,
    private memory: MemoryHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      // Database healthcheck
      () => this.db.pingCheck("database"),

      // GraphQL healthcheck
      () =>
        this.http.pingCheck("graphql", this.configService.graphql.url.href, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Hasura-Admin-Secret": this.configService.graphql.adminSecret,
          },
          data: JSON.stringify({
            query: "{ __typename }",
          }),
        }),

      // OIDC issuer healthcheck
      () =>
        this.http.pingCheck("oidc", this.configService.oidc.discoveryUrl.href),

      // Disk storage healthcheck
      () =>
        this.disk.checkStorage("storage", { path: "/", thresholdPercent: 80 }),

      // Memory healthcheck
      () => this.memory.checkHeap("memory_heap", 250 * 1024 * 1024),
    ]);
  }
}
