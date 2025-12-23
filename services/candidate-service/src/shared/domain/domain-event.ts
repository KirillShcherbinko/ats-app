export abstract class DomainEvent<TPayload extends Object> {
  public readonly eventId: string;
  public readonly aggregateId: string;
  public readonly eventName: string;
  public readonly payload: TPayload;
  public readonly occurredAt: Date;

  protected constructor(
    eventName: string,
    aggregateId: string,
    payload: TPayload
  ) {
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
      occurredAt: this.occurredAt.toISOString(),
    });
  }
}
