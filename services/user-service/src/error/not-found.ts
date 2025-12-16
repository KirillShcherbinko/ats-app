import { AppError } from "./base";

export class NotFoundError extends AppError {
  statusCode = 404;

  constructor(public resource: string, public id?: string) {
    super(`${resource}${id ? ` with id ${id}` : ""} not found`);
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}
