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
import { GraphqlRequest, graphqlRequestSchema } from "./graphql-request.schema";
import { GraphqlService } from "./graphql.service";

@Controller("graphql")
export class GraphqlController {
  constructor(
    private readonly postgraphileService: GraphqlService,
    private readonly jwtService: JwtService,
  ) {}

  @Post()
  async graphql(
    @Body(new ZodValidationPipe(graphqlRequestSchema)) request: GraphqlRequest,
    @Cookies("access_token") accessToken: string | undefined,
    @Headers("X-User-Role") role: string | undefined,
    @Res() res: Response,
  ) {
    if (!accessToken) {
      throw new UnauthorizedException("Missing access token");
    }
    if (!role) {
      throw new UnauthorizedException("Missing role");
    }

    const parsed = roleTypeSchema.safeParse(role);
    if (!parsed.success) {
      throw new UnauthorizedException("Invalid role");
    }

    const { uid, roles: allowedRoles } =
      await this.jwtService.verifyAccessToken(accessToken);

    if (!allowedRoles.includes(parsed.data)) {
      throw new UnauthorizedException("Role not allowed");
    }

    const requestContext = {
      user: {
        uid,
        role: parsed.data,
      },
    };

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
