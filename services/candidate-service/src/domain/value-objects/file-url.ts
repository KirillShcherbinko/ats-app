import { z } from "zod";
import { ValueObject } from "../../shared/domain/value-object";

export const fileUrlSchema = z.url().max(2048);

export type FileUrlValue = z.infer<typeof fileUrlSchema>;

export class FileUrl extends ValueObject<FileUrlValue> {
  constructor(value: FileUrlValue) {
    super(value);
    this.validate(value);
  }

  private validate(value: FileUrlValue): void {
    fileUrlSchema.parse(value);
  }

  static create(value: string): FileUrl {
    return new FileUrl(value);
  }
}
