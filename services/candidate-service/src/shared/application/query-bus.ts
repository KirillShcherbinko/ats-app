import { IQuery } from "./query";
import { IQueryHandler } from "./query-handler";

export class QueryBus {
  private handlers = new Map<string, IQueryHandler<IQuery, unknown>>();

  register<T extends IQuery, R>(
    queryType: string,
    handler: IQueryHandler<T, R>
  ): void {
    this.handlers.set(queryType, handler as IQueryHandler<IQuery, unknown>);
  }

  async execute<T extends IQuery, R>(query: T): Promise<R> {
    const handler = this.handlers.get(query.queryType);

    if (!handler) {
      throw new Error(`No handler registered for query: ${query.queryType}`);
    }

    return handler.execute(query) as Promise<R>;
  }
}
