import { AppError } from "./base";

export class BadRequestError extends AppError {
  statusCode = 400;
  
  constructor(public message: string) {
    super(message);
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
  
  serializeErrors() {
    return [{ message: this.message }];
  }
}