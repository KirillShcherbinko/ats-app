export interface IBaseEventPayload {
  candidateId: string;
}

export interface IAggregateId {
  value: string;
  equals(other: IAggregateId): boolean;
  toString(): string;
}