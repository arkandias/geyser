// src/health/health.controller.ts
import { Controller, Get } from "@nestjs/common";
import {
  DiskHealthIndicator,
  HealthCheck,
  HealthCheckService,
  HttpHealthIndicator,
  MemoryHealthIndicator,
  TypeOrmHealthIndicator,
} from "@nestjs/terminus";

import { ConfigService } from "../config/config.service";

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
      // Database connection health check
      () => this.db.pingCheck("database"),

      // OIDC issuer health check
      () => this.http.pingCheck("oidc", this.configService.oidc.issuerURL),

      // Disk storage health check
      () =>
        this.disk.checkStorage("storage", { path: "/", thresholdPercent: 80 }),

      // Memory health check
      () => this.memory.checkHeap("memory_heap", 250 * 1024 * 1024),
    ]);
  }
}
