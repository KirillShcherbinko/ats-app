import { REVERSED_ROLE_MAP } from "@/config/role-map";
import { TValidateTokenResponse } from "@/types/responses";
import { handleError } from "@/utils/handle-error";
import { sendUnaryData, ServerUnaryCall } from "@grpc/grpc-js";
import { tokenService } from "./server";
import { ValidateTokenRequest__Output } from "@/types/userService/ValidateTokenRequest";
import { ValidateTokenResponse__Output } from "@/types/userService/ValidateTokenResponse";

export const ValidateToken = async (
  call: ServerUnaryCall<ValidateTokenRequest__Output, TValidateTokenResponse>,
  callback: sendUnaryData<ValidateTokenResponse__Output>
) => {
  try {
    const result = tokenService.validateAccessToken(call.request.token);
    const grpcResult =
      result === null
        ? { isValid: false }
        : {
            isValid: true,
            userId: result.userId,
            role: REVERSED_ROLE_MAP[result.role],
          };
    callback(null, grpcResult);
  } catch (error: unknown) {
    const errorData = handleError(error);
    callback(errorData);
  }
};
