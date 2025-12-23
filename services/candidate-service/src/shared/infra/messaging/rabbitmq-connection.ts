import amqp from "amqplib";

export class RabbitMQConnection {
  private connection: Awaited<ReturnType<typeof amqp.connect>> | null = null;
  private channels = new Map<
    string,
    Awaited<ReturnType<typeof this.createRawChannel>>
  >();

  constructor(private readonly url: string) {}

  async connect(): Promise<void> {
    this.connection = await amqp.connect(this.url);
  }

  async disconnect(): Promise<void> {
    if (!this.connection) return;
    await this.connection.close();
    this.connection = null;
    this.channels.clear();
  }

  private async createRawChannel() {
    if (!this.connection) {
      throw new Error("Not connected to RabbitMQ");
    }
    return this.connection.createChannel();
  }

  async createChannel(name: string) {
    const existing = this.channels.get(name);
    if (existing) return existing;

    const channel = await this.createRawChannel();
    this.channels.set(name, channel);
    return channel;
  }

  getChannel(name: string) {
    return this.channels.get(name);
  }

  async closeChannel(name: string): Promise<void> {
    const channel = this.channels.get(name);
    if (channel) {
      await channel.close();
      this.channels.delete(name);
    }
  }

  isConnected(): boolean {
    return this.connection !== null;
  }
}
