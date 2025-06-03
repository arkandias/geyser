import { TYPES } from "postgraphile/@dataplan/pg";
import { makeAddPgTableConditionPlugin } from "postgraphile/utils";

export const RequestConditionPlugin = makeAddPgTableConditionPlugin(
  { schemaName: "public", tableName: "request" },
  "programId",
  (build) => {
    const { sql } = build;
    return {
      description:
        "Filters the list of requests to only those whose related course " +
        "belongs to the specified program.",
      type: build.graphql.GraphQLInt,
      applyPlan(
        $condition /* : PgConditionStep<PgSelectStep<any>> */,
        value /* : FieldArgs */,
      ) {
        const sqlIdentifier = sql.identifier(Symbol("requestCourse"));
        $condition.where(sql`exists(
          select 1
          from public.course as ${sqlIdentifier}
          where ${sqlIdentifier}.request = ${$condition.alias}.id
          and ${sqlIdentifier}.user_id = ${$condition.placeholder(
            value.get(),
            TYPES.int,
          )}
        )`);
      },
    };
  },
);
