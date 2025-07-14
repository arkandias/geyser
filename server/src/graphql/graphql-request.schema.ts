import { z } from "zod";

export const graphqlRequestSchema = z.strictObject({
  query: z.string(),
  variables: z.record(z.string(), z.unknown()).optional(),
  operationName: z.string().optional(),
  extensions: z.record(z.string(), z.unknown()).optional(),
});

export type GraphqlRequest = z.infer<typeof graphqlRequestSchema>;
