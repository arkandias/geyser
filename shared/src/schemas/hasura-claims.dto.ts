import { z } from "zod";

import { RoleTypeSchema } from "./role-type.dto.js";

export const HasuraClaimsSchema = z.object({
  "X-Hasura-User-Id": z.string(),
  "X-Hasura-Allowed-Roles": z.array(RoleTypeSchema),
  "X-Hasura-Default-Role": RoleTypeSchema,
});

export type HasuraClaims = z.infer<typeof HasuraClaimsSchema>;
