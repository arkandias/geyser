import { Body, Controller, Post, Res } from "@nestjs/common";
import axios from "axios";
import { Response } from "express";

import { OrgId, UserId, UserRole } from "../auth/auth.decorators";
import { Auth } from "../auth/guards/auth.guard";
import { ZodValidationPipe } from "../common/zod-validation.pipe";
import { ConfigService } from "../config/config.service";
import { GraphqlRequest, graphqlRequestSchema } from "./graphql-request.schema";

@Controller()
export class GraphqlController {
  constructor(private readonly configService: ConfigService) {}

  @Post("graphql")
  @Auth()
  async graphql(
    @Body(new ZodValidationPipe(graphqlRequestSchema)) request: GraphqlRequest,
    @OrgId() orgId: string | undefined,
    @UserId() userId: string | undefined,
    @UserRole() userRole: string | undefined,
    @Res() res: Response,
  ) {
    // Build headers for Hasura GraphQL endpoint
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      "X-Hasura-Admin-Secret": this.configService.graphql.adminSecret,
    };
    if (orgId) {
      headers["X-Hasura-Org-Id"] = orgId;
    }
    if (userId) {
      headers["X-Hasura-User-Id"] = userId;
    }
    if (userRole) {
      headers["X-Hasura-Role"] = userRole;
    }

    // Send request to Hasura using axios
    const response = await axios.post(
      this.configService.graphql.url.href,
      request,
      {
        headers,
        timeout: this.configService.graphql.timeout,
        validateStatus: () => true,
      },
    );

    // Set Hasura's response code and data
    res.status(response.status).json(response.data);
  }
}
