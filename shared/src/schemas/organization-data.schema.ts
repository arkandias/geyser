import { z } from "zod/v4";

export const organizationDataSchema = z.looseObject({
  id: z.number(),
});

export type OrganizationData = z.infer<typeof organizationDataSchema>;
