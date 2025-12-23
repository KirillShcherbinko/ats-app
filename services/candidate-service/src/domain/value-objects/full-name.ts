import { z } from "zod";
import { ValueObject } from "../../shared/domain/value-object";

const fullNameSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .max(100, "First name must be at most 100 characters")
    .regex(
      /^[a-zA-Zа-яА-ЯёЁ\s\-]+$/,
      "First name can only contain letters, spaces and hyphens"
    ),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .max(100, "Last name must be at most 100 characters")
    .regex(
      /^[a-zA-Zа-яА-ЯёЁ\s\-]+$/,
      "Last name can only contain letters, spaces and hyphens"
    ),
  patronymic: z
    .string()
    .max(100, "Patronymic must be at most 100 characters")
    .regex(
      /^[a-zA-Zа-яА-ЯёЁ\s\-]*$/,
      "Patronymic can only contain letters, spaces and hyphens"
    )
    .nullable(),
});

export type FullNameValue = z.infer<typeof fullNameSchema>;

export class FullName extends ValueObject<FullNameValue> {
  constructor(value: FullNameValue) {
    super(value);
    this.validate(value);
  }

  private validate(value: FullNameValue): void {
    fullNameSchema.parse(value);
  }

  static create(
    firstName: string,
    lastName: string,
    patronymic: string | null
  ): FullName {
    return new FullName({ firstName, lastName, patronymic });
  }

  get fullName(): string {
    const parts = [this.value.lastName, this.value.firstName];
    if (this.value.patronymic) {
      parts.push(this.value.patronymic);
    }
    return parts.join(" ");
  }

  get initials(): string {
    return `${this.value.firstName.charAt(0)}.${this.value.lastName.charAt(
      0
    )}.`;
  }

  get firstName(): string {
    return this.value.firstName;
  }

  get lastName(): string {
    return this.value.lastName;
  }

  get patronymic(): string | null {
    return this.value.patronymic;
  }
}
