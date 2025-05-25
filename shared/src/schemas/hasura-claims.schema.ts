import { z } from "zod/v4";

import { roleTypeSchema } from "./role-type.schema.js";

export const hasuraClaimsSchema = z.strictObject({
  "X-Hasura-User-Id": z.string(),
  "X-Hasura-Allowed-Roles": z.array(roleTypeSchema),
  "X-Hasura-Default-Role": roleTypeSchema,
});

export type HasuraClaims = z.infer<typeof hasuraClaimsSchema>;
