import { PgSimplifyInflectionPreset } from "@graphile/simplify-inflection";
import {
  Injectable,
  InternalServerErrorException,
  OnModuleInit,
} from "@nestjs/common";
import type { ExecutionResult, GraphQLSchema } from "grafast/graphql";
import type { GraphileConfig } from "graphile-config";
import { makeSchema } from "postgraphile";
import { makePgService } from "postgraphile/adaptors/pg";
import { grafast } from "postgraphile/grafast";
import { PostGraphileAmberPreset } from "postgraphile/presets/amber";
import { makeV4Preset } from "postgraphile/presets/v4";

import { ConfigService } from "../config/config.service";
import { NonNullRelationsPlugin } from "./non-null-relations.plugin";

@Injectable()
export class GraphqlService implements OnModuleInit {
  private _schema?: GraphQLSchema;
  private _resolvedPreset?: GraphileConfig.ResolvedPreset;

  constructor(private configService: ConfigService) {}

  async onModuleInit() {
    const { schema, resolvedPreset } = await makeSchema({
      extends: [
        PostGraphileAmberPreset,
        makeV4Preset({
          // Remove Relay connection wrapper (nodes/edges)
          simpleCollections: "only",
        }),
        PgSimplifyInflectionPreset,
      ],

      schema: {
        // Remove "List" suffix from collection names
        pgOmitListSuffix: true,
      },

      plugins: [NonNullRelationsPlugin],

      pgServices: [
        makePgService({
          connectionString: this.configService.databaseUrl.href,
          schemas: ["public"],
        }),
      ],

      grafast: {
        context(requestContext) {
          const user = requestContext.user;

          return {
            pgSettings: {
              "jwt.claims.uid": user?.uid ?? undefined,
              "jwt.claims.role": user?.role ?? undefined,
            },
          };
        },
      },
    });

    this._schema = schema;
    this._resolvedPreset = resolvedPreset;
  }

  get schema(): GraphQLSchema {
    if (!this._schema) {
      throw new InternalServerErrorException("Schema not initialized");
    }
    return this._schema;
  }

  get resolvedPreset(): GraphileConfig.ResolvedPreset {
    if (!this._resolvedPreset) {
      throw new InternalServerErrorException("Resolved preset not initialized");
    }
    return this._resolvedPreset;
  }

  async executeGraphQL(
    source: string,
    variableValues?: Record<string, unknown>,
    operationName?: string,
    requestContext?: Grafast.RequestContext,
  ): Promise<ExecutionResult | AsyncIterable<ExecutionResult>> {
    return grafast({
      schema: this.schema,
      resolvedPreset: this.resolvedPreset,
      source,
      variableValues,
      operationName,
      requestContext,
    });
  }
}
