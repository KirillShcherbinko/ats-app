// src/shared/kernel/unique-id.ts
export class UniqueId {
  private readonly _value: string;

  private constructor(value: string) {
    this._value = value;
  }

  static create(): UniqueId {
    return new UniqueId(crypto.randomUUID());
  }

  static fromString(value: string): UniqueId {
    if (!this.isValid(value)) {
      throw new Error(`Invalid UUID: ${value}`);
    }
    return new UniqueId(value);
  }

  private static isValid(value: string): boolean {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(value);
  }

  equals(other: UniqueId | null | undefined): boolean {
    if (!other) return false;
    return this._value === other._value;
  }

  toString(): string {
    return this._value;
  }

  get value(): string {
    return this._value;
  }
}