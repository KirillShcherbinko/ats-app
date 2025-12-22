import { ZodError } from "zod";
import * as grpc from "@grpc/grpc-js";
import { ServerStatusResponse } from "@grpc/grpc-js/build/src/server-call";
import { NotFoundError } from "@/error/not-found";
import { AlreadyExistsError } from "@/error/already-exists";

export const handleError = (
  error: unknown
): grpc.ServerErrorResponse | ServerStatusResponse => {
  if (error instanceof ZodError) {
    return {
      code: grpc.status.INVALID_ARGUMENT,
      message: error.message,
    };
  }

  if (error instanceof NotFoundError) {
    return {
      code: grpc.status.NOT_FOUND,
      message: error.message,
    };
  }

  if (error instanceof AlreadyExistsError) {
    return {
      code: grpc.status.ALREADY_EXISTS,
      message: error.message,
    };
  }

  if (error instanceof Error) {
    return {
      code: grpc.status.INTERNAL,
      message: error.message,
    };
  }

  return {
    code: grpc.status.INTERNAL,
    message: "Unknown Error",
  };
};
