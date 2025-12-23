import { DomainEvent } from "./domain-event";
import { Entity } from "./entity";

export abstract class AggregateRoot<
  TProps,
  TEvent extends DomainEvent<any> = DomainEvent<any>
> extends Entity<TProps> {
  private _domainEvents: TEvent[] = [];

  protected addDomainEvent(event: TEvent): void {
    this._domainEvents.push(event);
  }

  get domainEvents(): ReadonlyArray<TEvent> {
    return [...this._domainEvents];
  }

  clearDomainEvents(): void {
    this._domainEvents = [];
  }

  protected apply(event: TEvent): void {
    this.addDomainEvent(event);
  }
}
