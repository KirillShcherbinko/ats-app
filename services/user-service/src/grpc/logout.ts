import { TLogoutResponse } from "@/types/responses";
import { handleError } from "@/utils/handle-error";
import { ServerUnaryCall, sendUnaryData } from "@grpc/grpc-js";
import { authService } from "./server";
import { LogoutRequest__Output } from "@/types/userService/LogoutRequest";
import { LogoutResponse__Output } from "@/types/userService/LogoutResponse";

export const Logout = async (
  call: ServerUnaryCall<LogoutRequest__Output, TLogoutResponse>,
  callback: sendUnaryData<LogoutResponse__Output>
) => {
  try {
    await authService.logout(call.request.refreshToken);
    callback(null, {});
  } catch (error: unknown) {
    const errorData = handleError(error);
    callback(errorData);
  }
};
