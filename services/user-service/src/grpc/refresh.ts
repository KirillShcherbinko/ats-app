import { TRefreshResponse } from "@/types/responses";
import { getGrpcUserResponse } from "@/utils/get-grpc-user-response";
import { handleError } from "@/utils/handle-error";
import { ServerUnaryCall, sendUnaryData } from "@grpc/grpc-js";
import { authService } from "./server";
import { RefreshRequest__Output } from "@/types/userService/RefreshRequest";
import { AuthResponse__Output } from "@/types/userService/AuthResponse";

export const Refresh = async (
  call: ServerUnaryCall<RefreshRequest__Output, TRefreshResponse>,
  callback: sendUnaryData<AuthResponse__Output>
) => {
  try {
    const result = await authService.refresh(call.request.refreshToken);
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
