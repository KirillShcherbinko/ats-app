export interface IQuery<T = unknown> {
  readonly queryType: string;
  readonly payload: T;
}

export abstract class Query<T> implements IQuery<T> {
  abstract readonly queryType: string;
  
  constructor(public readonly payload: T) {}
}