import { AppError } from "./base";

export class AlreadyExistsError extends AppError {
  statusCode = 409;

  constructor(message = "Already Exists") {
    super(message);
    Object.setPrototypeOf(this, AlreadyExistsError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}
