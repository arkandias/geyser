import { z } from "zod";

export const organizationDataSchema = z.looseObject({
  id: z.number(),
});

export type OrganizationData = z.infer<typeof organizationDataSchema>;
