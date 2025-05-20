import { z } from "zod";

import { roleTypeSchema } from "./role-type.dto.js";

export const hasuraClaimsSchema = z.object({
  "X-Hasura-User-Id": z.string(),
  "X-Hasura-Allowed-Roles": z.array(roleTypeSchema),
  "X-Hasura-Default-Role": roleTypeSchema,
});

export type HasuraClaims = z.infer<typeof hasuraClaimsSchema>;
