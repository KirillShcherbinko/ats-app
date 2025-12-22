import { ROLE_MAP } from "@/config/role-map";
import { TRegisterResponse } from "@/types/responses";
import { getGrpcUserResponse } from "@/utils/get-grpc-user-response";
import { handleError } from "@/utils/handle-error";
import { ServerUnaryCall, sendUnaryData } from "@grpc/grpc-js";
import { authService } from "./server";
import { RegisterRequest__Output } from "@/types/userService/RegisterRequest";
import { AuthResponse__Output } from "@/types/userService/AuthResponse";

export const Register = async (
  call: ServerUnaryCall<RegisterRequest__Output, TRegisterResponse>,
  callback: sendUnaryData<AuthResponse__Output>
) => {
  try {
    const roleName = ROLE_MAP[call.request.roleName];
    const result = await authService.register(
      call.request.email,
      call.request.password,
      call.request.lastName,
      call.request.firstName,
      call.request.patronymic ?? null,
      roleName
    );
    const grpcResult = {
      ...result,
      user: getGrpcUserResponse(result.user),
    };
    callback(null, grpcResult);
  } catch (error: unknown) {
    const errorData = handleError(error);
    callback(errorData);
  }
};
