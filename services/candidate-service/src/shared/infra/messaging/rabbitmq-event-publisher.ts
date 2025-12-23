import amqp from "amqplib";
import { IEventPublisher } from "../../application/ports/event-publisher";
import { DomainEvent } from "../../domain/domain-event";
import { RabbitMQConnection } from "./rabbitmq-connection";

export interface RabbitMQPublisherConfig {
  exchangeName: string;
  exchangeType: "direct" | "topic" | "fanout" | "headers";
  routingKeyPrefix: string;
}

export class RabbitMQEventPublisher implements IEventPublisher {
  private channel: amqp.Channel | null = null;

  constructor(
    private readonly rabbitMQConnection: RabbitMQConnection,
    private readonly config: RabbitMQPublisherConfig
  ) {}

  async initialize(): Promise<void> {
    this.channel = await this.rabbitMQConnection.createChannel(
      "event-publisher"
    );

    await this.channel.assertExchange(
      this.config.exchangeName,
      this.config.exchangeType,
      {
        durable: true,
        autoDelete: false,
      }
    );
  }

  async publish(event: DomainEvent<any>): Promise<void> {
    if (!this.channel) {
      throw new Error(
        "RabbitMQEventPublisher not initialized. Call initialize() first."
      );
    }

    const routingKey = `${
      this.config.routingKeyPrefix
    }.${event.eventName.toLowerCase()}`;
    const message = Buffer.from(event.serialize());

    const success = this.channel.publish(
      this.config.exchangeName,
      routingKey,
      message,
      {
        persistent: true,
        contentType: "application/json",
        timestamp: Date.now(),
        messageId: event.eventId,
        headers: {
          aggregateId: event.aggregateId,
          eventName: event.eventName,
          occurredAt: event.occurredAt.toISOString(),
        },
      }
    );

    if (!success) {
      throw new Error(`Failed to publish event: ${event.eventName}`);
    }

    console.log(`📤 Event published: ${event.eventName} → ${routingKey}`);
  }

  async publishAll(events: readonly DomainEvent<any>[]): Promise<void> {
    for (const event of events) {
      await this.publish(event);
    }
  }

  async close(): Promise<void> {
    if (this.channel) {
      await this.rabbitMQConnection.closeChannel("event-publisher");
      this.channel = null;
    }
  }
}
