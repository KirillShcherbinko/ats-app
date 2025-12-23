import { IQuery } from "./query";

export interface IQueryHandler<T extends IQuery, R> {
  execute(query: T): Promise<R>;
}
