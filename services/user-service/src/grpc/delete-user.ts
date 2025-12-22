import { TDeleteUserResponse } from "@/types/responses";
import { handleError } from "@/utils/handle-error";
import { sendUnaryData, ServerUnaryCall } from "@grpc/grpc-js";
import { userService } from "./server";
import { DeleteUserRequest__Output } from "@/types/userService/DeleteUserRequest";
import { DeleteUserResponse__Output } from "@/types/userService/DeleteUserResponse";

export const DeleteUser = async (
  call: ServerUnaryCall<DeleteUserRequest__Output, TDeleteUserResponse>,
  callback: sendUnaryData<DeleteUserResponse__Output>
) => {
  try {
    await userService.deleteUser(call.request.id);
    callback(null, {});
  } catch (error: unknown) {
    const errorData = handleError(error);
    callback(errorData);
  }
};
