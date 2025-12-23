export interface ICommand<T = unknown> {
  readonly commandType: string;
  readonly payload: T;
}

export abstract class Command<T> implements ICommand<T> {
  abstract readonly commandType: string;
  
  constructor(public readonly payload: T) {}
}