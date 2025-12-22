import { emailSchema } from "./schema";

export class Email {
  constructor(public readonly value: string) {
    emailSchema.parse(value);
  }

  equals(other: Email): boolean {
    return this.value === other.value;
  }
}