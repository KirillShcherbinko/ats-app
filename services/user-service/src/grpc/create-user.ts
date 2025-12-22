import { ROLE_MAP } from "@/config/role-map";
import { TCreateUserResponse } from "@/types/responses";
import { getGrpcUserResponse } from "@/utils/get-grpc-user-response";
import { handleError } from "@/utils/handle-error";
import { ServerUnaryCall, sendUnaryData } from "@grpc/grpc-js";
import { userService } from "./server";
import { CreateUserRequest__Output } from "@/types/userService/CreateUserRequest";
import { CreateUserResponse__Output } from "@/types/userService/CreateUserResponse";

export const CreateUser = async (
  call: ServerUnaryCall<CreateUserRequest__Output, TCreateUserResponse>,
  callback: sendUnaryData<CreateUserResponse__Output>
) => {
  try {
    const roleName = ROLE_MAP[call.request.roleName];
    const result = await userService.createUser(
      call.request.administratorId,
      call.request.email,
      call.request.lastName,
      call.request.firstName,
      roleName,
      call.request.patronymic ?? null
    );
    const user = getGrpcUserResponse(result);
    callback(null, { user });
  } catch (error: unknown) {
    const errorData = handleError(error);
    callback(errorData);
  }
};
