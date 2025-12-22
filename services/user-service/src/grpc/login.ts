import { TLoginResponse } from "@/types/responses";
import { handleError } from "@/utils/handle-error";
import { sendUnaryData, ServerUnaryCall } from "@grpc/grpc-js";
import { authService } from "./server";
import { LoginRequest__Output } from "@/types/userService/LoginRequest";
import { AuthResponse__Output } from "@/types/userService/AuthResponse";
import { getGrpcUserResponse } from "@/utils/get-grpc-user-response";

export const Login = async (
  call: ServerUnaryCall<LoginRequest__Output, TLoginResponse>,
  callback: sendUnaryData<AuthResponse__Output>
) => {
  try {
    const result = await authService.login(
      call.request.email,
      call.request.password
    );
    const user = getGrpcUserResponse(result.user);
    callback(null, { ...result, user });
  } catch (error: unknown) {
    const errorData = handleError(error);
    callback(errorData);
  }
};
