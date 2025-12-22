import { fullNameSchema } from "./schema";

export class FullName {
  constructor(
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly patronymic: string | null
  ) {
    fullNameSchema.parse({ firstName, lastName, patronymic });
  }

  get fullName(): string {
    return [this.lastName, this.firstName, this.patronymic]
      .filter(Boolean)
      .join(" ");
  }

  equals(other: FullName): boolean {
    return (
      this.firstName === other.firstName &&
      this.lastName === other.lastName &&
      this.patronymic === other.patronymic
    );
  }
}
