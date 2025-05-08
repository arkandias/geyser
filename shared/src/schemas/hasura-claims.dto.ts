import { z } from "zod";

export const HasuraClaimsSchema = z.object({
  "X-Hasura-User-Id": z.string(),
  "X-Hasura-Allowed-Roles": z.array(z.string()),
  "X-Hasura-Default-Role": z.string(),
});

export type HasuraClaims = z.infer<typeof HasuraClaimsSchema>;
