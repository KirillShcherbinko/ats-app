import { AppError } from "./base";

export class UnauthorizedError extends AppError {
  statusCode = 401;
  
  constructor(message = 'Not authorized') {
    super(message);
    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }
  
  serializeErrors() {
    return [{ message: this.message }];
  }
}