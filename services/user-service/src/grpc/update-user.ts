import { TUpdateUserResponse } from "@/types/responses";
import { getGrpcUserResponse } from "@/utils/get-grpc-user-response";
import { handleError } from "@/utils/handle-error";
import { sendUnaryData, ServerUnaryCall } from "@grpc/grpc-js";
import { userService } from "./server";
import { UpdateUserRequest__Output } from "@/types/userService/UpdateUserRequest";
import { UpdateUserResponse__Output } from "@/types/userService/UpdateUserResponse";

export const UpdateUser = async (
  call: ServerUnaryCall<UpdateUserRequest__Output, TUpdateUserResponse>,
  callback: sendUnaryData<UpdateUserResponse__Output>
) => {
  try {
    const result = await userService.updateUser(
      call.request.id,
      call.request.email || undefined,
      call.request.lastName || undefined,
      call.request.firstName || undefined,
      call.request.patronymic || undefined
    );
    const user = getGrpcUserResponse(result);
    callback(null, { user });
  } catch (error: unknown) {
    const errorData = handleError(error);
    callback(errorData);
  }
};
