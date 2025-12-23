export interface IRabbitMQMessage {
  content: Buffer;
  fields: {
    exchange: string;
    routingKey: string;
  };
  properties: {
    messageId?: string;
    timestamp?: number;
    contentType?: string;
    persistent: boolean;
    headers?: Record<string, unknown>;
  };
}

export interface IEventHandler {
  handle(event: unknown): Promise<void>;
}

export interface IRabbitMQConfig {
  url: string;
  exchangeName: string;
  exchangeType: 'direct' | 'topic' | 'fanout' | 'headers';
  queueName: string;
  routingKeyPrefix: string;
}