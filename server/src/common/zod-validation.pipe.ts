import { BadRequestException, type PipeTransform } from "@nestjs/common";
import type { z } from "zod";

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: z.ZodType) {}

  transform(value: unknown) {
    try {
      return this.schema.parse(value);
    } catch (error) {
      throw new BadRequestException({ message: "Validation failed", error });
    }
  }
}
