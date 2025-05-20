import { createZodDto } from "nestjs-zod";
import { z } from "zod";

export const callbackQuerySchema = z.object({
  state: z.string(),
  code: z.string(),
});

export class CallbackQueryDto extends createZodDto(callbackQuerySchema) {}
