import { createZodDto } from "nestjs-zod";
import { z } from "zod";

export const redirectUrlSchema = z
  .object({
    redirect_url: z.string().optional(),
  })
  .transform((data) => ({
    redirectUrl: data.redirect_url,
  }));

export class RedirectUrlDto extends createZodDto(redirectUrlSchema) {}
