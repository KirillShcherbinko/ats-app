export abstract class ValueObject<T> {
  constructor(protected readonly _value: T) {}

  get value(): T {
    return this._value;
  }

  equals(other: ValueObject<T>): boolean {
    if (other === null || other === undefined) {
      return false;
    }
    if (this.constructor !== other.constructor) {
      return false;
    }
    return JSON.stringify(this._value) === JSON.stringify(other.value);
  }

  toString(): string {
    if (typeof this._value === 'object') {
      return JSON.stringify(this._value);
    }
    return String(this._value);
  }
}