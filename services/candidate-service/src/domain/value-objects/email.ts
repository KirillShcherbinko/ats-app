import { z } from "zod";
import { ValueObject } from "../../shared/domain/value-object";

const emailSchema = z
  .email("Invalid email format")
  .max(255, "Email must be at most 255 characters")
  .transform((email) => email.toLowerCase().trim());

export type EmailValue = z.infer<typeof emailSchema>;

export class Email extends ValueObject<EmailValue> {
  constructor(value: string) {
    super(value);
    this.validate(value);
  }

  private validate(value: string): void {
    emailSchema.parse(value);
  }

  static create(value: string): Email {
    return new Email(value);
  }

  static isValid(value: string): boolean {
    return emailSchema.safeParse(value).success;
  }

  get domain(): string {
    return this.value.split("@")[1];
  }

  get localPart(): string {
    return this.value.split("@")[0];
  }
}
