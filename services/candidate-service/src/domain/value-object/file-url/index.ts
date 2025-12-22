import { fileUrlSchema } from "./schema";

export class FileUrl {
  constructor(public readonly value: string) {
    fileUrlSchema.parse(value);
  }

  equals(other: FileUrl): boolean {
    return this.value === other.value;
  }
}
