import { roleTypeSchema } from "@geyser/shared";
import {
  BadRequestException,
  Body,
  Controller,
  Headers,
  HttpStatus,
  InternalServerErrorException,
  Post,
  Res,
  UnauthorizedException,
} from "@nestjs/common";
import { Response } from "express";
import type { ExecutionResult } from "grafast/graphql";

import { JwtService } from "../auth/jwt.service";
import { Cookies } from "../common/cookies.decorator";
import { ZodValidationPipe } from "../common/zod-validation.pipe";
import { ConfigService } from "../config/config.service";
import { GraphqlRequest, graphqlRequestSchema } from "./graphql-request.schema";
import { GraphqlService } from "./graphql.service";

@Controller()
export class GraphqlController {
  constructor(
    private readonly configService: ConfigService,
    private readonly postgraphileService: GraphqlService,
    private readonly jwtService: JwtService,
  ) {}

  @Post("graphql")
  async graphql(
    @Body(new ZodValidationPipe(graphqlRequestSchema)) request: GraphqlRequest,
    @Cookies("access_token") accessToken: string | undefined,
    @Headers("X-User-Id") userId: string | undefined,
    @Headers("X-User-Role") userRole: string | undefined,
    @Headers("X-Admin-Secret") adminSecret: string | undefined,
    @Res() res: Response,
  ) {
    if (
      this.configService.nodeEnv === "development" &&
      adminSecret !== undefined &&
      adminSecret !== this.configService.graphql.adminSecret
    ) {
      throw new UnauthorizedException("Incorrect Graphql admin secret");
    }

    const parsed = roleTypeSchema.optional().safeParse(userRole);
    if (!parsed.success) {
      throw new UnauthorizedException("Invalid role");
    }
    const role = parsed.data;

    let requestContext: Grafast.RequestContext;
    if (
      this.configService.nodeEnv === "development" &&
      adminSecret === this.configService.graphql.adminSecret
    ) {
      requestContext = {
        user: {
          uid: userId ?? "admin",
          role: role ?? "admin",
        },
      };
    } else {
      if (!accessToken) {
        throw new UnauthorizedException("Missing access token");
      }
      if (!role) {
        throw new UnauthorizedException("Missing role");
      }

      const { uid, roles: allowedRoles } =
        await this.jwtService.verifyAccessToken(accessToken);

      if (!allowedRoles.includes(role)) {
        throw new UnauthorizedException("Role not allowed");
      }

      requestContext = {
        user: {
          uid,
          role,
        },
      };
    }

    let result: ExecutionResult | AsyncIterable<ExecutionResult>;
    try {
      result = await this.postgraphileService.executeGraphQL(
        request.query,
        request.variables,
        request.operationName,
        requestContext,
      );
    } catch (error) {
      throw new InternalServerErrorException({
        message: "GraphQL execution error",
        error,
      });
    }

    if (Symbol.asyncIterator in result) {
      throw new BadRequestException(
        "Subscriptions are not supported on this endpoint",
      );
    }

    const statusCode =
      result.errors && result.errors.length > 0
        ? HttpStatus.BAD_REQUEST
        : HttpStatus.OK;

    res.status(statusCode).json(result);
  }
}
