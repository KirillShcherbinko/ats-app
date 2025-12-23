export type TEventPayload = Record<string, unknown>;

export abstract class DomainEvent {
  public readonly eventId: string;
  public readonly aggregateId: string;
  public readonly eventName: string;
  public readonly payload: TEventPayload;
  public readonly occurredAt: Date;

  constructor(eventName: string, aggregateId: string, payload: TEventPayload) {
    this.eventId = crypto.randomUUID();
    this.eventName = eventName;
    this.aggregateId = aggregateId;
    this.payload = payload;
    this.occurredAt = new Date();
  }

  serialize(): string {
    return JSON.stringify({
      eventId: this.eventId,
      eventName: this.eventName,
      aggregateId: this.aggregateId,
      payload: this.payload,
      occurredAt: this.occurredAt.toISOString()
    });
  }
}