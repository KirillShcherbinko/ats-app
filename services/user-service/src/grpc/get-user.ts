import { TGetUserResponse } from "@/types/responses";
import { getGrpcUserResponse } from "@/utils/get-grpc-user-response";
import { handleError } from "@/utils/handle-error";
import { ServerUnaryCall, sendUnaryData } from "@grpc/grpc-js";
import { userService } from "./server";
import { GetUserRequest__Output } from "@/types/userService/GetUserRequest";
import { GetUserResponse__Output } from "@/types/userService/GetUserResponse";

export const GetUser = async (
  call: ServerUnaryCall<GetUserRequest__Output, TGetUserResponse>,
  callback: sendUnaryData<GetUserResponse__Output>
) => {
  try {
    const result = await userService.getUser(call.request.id);
    const user = getGrpcUserResponse(result);
    callback(null, { user });
  } catch (error: unknown) {
    const errorData = handleError(error);
    callback(errorData);
  }
};
