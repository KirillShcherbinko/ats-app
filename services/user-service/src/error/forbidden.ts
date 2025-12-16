import { AppError } from "./base";

export class ForbiddenError extends AppError {
  statusCode = 403;

  constructor(message = "Forbidden") {
    super(message);
    Object.setPrototypeOf(this, ForbiddenError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}
