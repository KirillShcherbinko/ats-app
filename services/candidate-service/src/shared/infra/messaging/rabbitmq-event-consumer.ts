import amqp from "amqplib";
import { RabbitMQConnection } from "./rabbitmq-connection";

export interface IEventMessage {
  eventId: string;
  eventName: string;
  aggregateId: string;
  payload: Record<string, unknown>;
  occurredAt: string;
}

export interface IEventHandler {
  handle(event: IEventMessage): Promise<void>;
}

export interface IRabbitMQConsumerConfig {
  exchangeName: string;
  queueName: string;
  routingKeys: string[];
}

export class RabbitMQEventConsumer {
  private channel: amqp.Channel | null = null;

  constructor(
    private readonly rabbitMQConnection: RabbitMQConnection,
    private readonly config: IRabbitMQConsumerConfig
  ) {}

  async initialize(): Promise<void> {
    this.channel = await this.rabbitMQConnection.createChannel(
      "event-consumer"
    );

    await this.channel.assertExchange(this.config.exchangeName, "topic", {
      durable: true,
    });

    await this.channel.assertQueue(this.config.queueName, {
      durable: true,
      exclusive: false,
      autoDelete: false,
    });

    for (const routingKey of this.config.routingKeys) {
      await this.channel.bindQueue(
        this.config.queueName,
        this.config.exchangeName,
        routingKey
      );
    }
  }

  async consume(handler: IEventHandler): Promise<void> {
    if (!this.channel) {
      throw new Error(
        "RabbitMQEventConsumer not initialized. Call initialize() first."
      );
    }

    await this.channel.consume(
      this.config.queueName,
      async (msg) => {
        if (!msg) return;

        try {
          const content = msg.content.toString();
          const event: IEventMessage = JSON.parse(content);

          await handler.handle(event);

          this.channel!.ack(msg);
          console.log(`✅ Event processed: ${event.eventName}`);
        } catch (error) {
          console.error("❌ Error processing event:", error);
          this.channel!.nack(msg, false, false);
        }
      },
      {
        noAck: false,
      }
    );

    console.log(`👂 Started consuming from queue: ${this.config.queueName}`);
  }

  async close(): Promise<void> {
    if (this.channel) {
      await this.rabbitMQConnection.closeChannel("event-consumer");
      this.channel = null;
    }
  }
}
