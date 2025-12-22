import { TGetUsersResponse } from "@/types/responses";
import { getGrpcUserResponse } from "@/utils/get-grpc-user-response";
import { handleError } from "@/utils/handle-error";
import { ServerUnaryCall, sendUnaryData } from "@grpc/grpc-js";
import { userService } from "./server";
import { GetUsersRequest__Output } from "@/types/userService/GetUsersRequest";
import { GetUsersResponse__Output } from "@/types/userService/GetUsersResponse";

export const GetUsers = async (
  call: ServerUnaryCall<GetUsersRequest__Output, TGetUsersResponse>,
  callback: sendUnaryData<GetUsersResponse__Output>
) => {
  try {
    const result = await userService.getUsers(
      call.request.id,
      call.request.limit,
      call.request.page,
      call.request.searchQuery
    );
    const grpcResult = {
      ...result,
      users: result.users.map((user) => getGrpcUserResponse(user)),
    };
    callback(null, grpcResult);
  } catch (error: unknown) {
    const errorData = handleError(error);
    callback(errorData);
  }
};
