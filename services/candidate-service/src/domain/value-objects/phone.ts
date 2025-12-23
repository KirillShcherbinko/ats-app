import { z } from "zod";
import { ValueObject } from "../../shared/domain/value-object";

const phoneSchema = z
  .string()
  .regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number format (E.164)")
  .max(20, "Phone number must be at most 20 characters")
  .transform((phone) => phone.replace(/\s+/g, ""));

export type PhoneValue = z.infer<typeof phoneSchema>;

export class Phone extends ValueObject<PhoneValue> {
  constructor(value: string) {
    super(value);
    this.validate(value);
  }

  private validate(value: string): void {
    phoneSchema.parse(value);
  }

  static create(value: string): Phone {
    return new Phone(value);
  }

  get countryCode(): string | null {
    const match = this.value.match(/^\+(d{1,3})/);
    return match ? match[1] : null;
  }

  get formatted(): string {
    if (this.value.startsWith("+")) {
      return this.value.replace(
        /(\+\d{1,3})(\d{3})(\d{3})(\d{4})/,
        "$1 $2 $3 $4"
      );
    }
    return this.value;
  }
}
