import { z } from "zod";
import { ValueObject } from "../../shared/domain/value-object";

const contentSchema = z
  .string()
  .min(1, "Content cannot be empty")
  .max(5000, "Content must be at most 5000 characters")
  .transform((content) => content.trim());

export type ContentValue = z.infer<typeof contentSchema>;

export class Content extends ValueObject<ContentValue> {
  constructor(value: string) {
    super(value);
    this.validate(value);
  }

  private validate(value: string): void {
    contentSchema.parse(value);
  }

  static create(value: string): Content {
    return new Content(value);
  }

  get wordCount(): number {
    return this.value.split(/\s+/).filter((word) => word.length > 0).length;
  }

  get isEmpty(): boolean {
    return this.value.trim().length === 0;
  }
}
