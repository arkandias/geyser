import { z } from "zod";

export const HasuraClaimsSchema = z.object({
  "x-hasura-user-id": z.string(),
  "x-hasura-allowed-roles": z.array(z.string()),
  "x-hasura-default-role": z.string(),
});

export type HasuraClaims = z.infer<typeof HasuraClaimsSchema>;
