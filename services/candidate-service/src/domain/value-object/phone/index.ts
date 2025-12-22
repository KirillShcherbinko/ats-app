import { phoneSchema } from "./schema";

export class Phone {
  constructor(public readonly value: string) {
    phoneSchema.parse(value);
  }

  equals(other: Phone): boolean {
    return this.value === other.value;
  }
}
