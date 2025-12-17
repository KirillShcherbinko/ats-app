import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import path from "path";
import { AuthService } from "../services/auth-service";
import { UserService } from "../services/user-service";
import { TokenService } from "../services/token-service";
import {
  TCreateUserRequest,
  TCreateUserResponse,
  TDeleteUserRequest,
  TDeleteUserResponse,
  TGetUserRequest,
  TGetUserResponse,
  TGetUsersRequest,
  TGetUsersResponse,
  TLoginRequest,
  TLoginResponse,
  TLogoutRequest,
  TLogoutResponse,
  TRefreshRequest,
  TRefreshResponse,
  TRegisterRequest,
  TRegisterResponse,
  TUpdateUserRequest,
  TUpdateUserResponse,
  TValidateTokenRequest,
  TValidateTokenResponse,
} from "../model/types";
import { handleError } from "../utils/handle-error";
import { ROLE_MAP } from "../config/role-map";

const PROTO_PATH = path.join(__dirname, "../proto/user.proto");

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
const userPackage = protoDescriptor.user as any;

const authService = new AuthService();
const userService = new UserService();
const tokenService = new TokenService();

const createGrpcServer = () => {
  const server = new grpc.Server();

  server.addService(userPackage.UserService.service, {
    Login: async (
      call: grpc.ServerUnaryCall<TLoginRequest, TLoginResponse>,
      callback: grpc.sendUnaryData<TLoginResponse>
    ) => {
      try {
        const result = await authService.login(
          call.request.email,
          call.request.password
        );
        callback(null, result);
      } catch (error: unknown) {
        const errorData = handleError(error);
        callback(errorData);
      }
    },

    Register: async (
      call: grpc.ServerUnaryCall<TRegisterRequest, TRegisterResponse>,
      callback: grpc.sendUnaryData<TRegisterResponse>
    ) => {
      try {
        const roleName = ROLE_MAP[call.request.roleName];
        const result = await authService.register(
          call.request.email,
          call.request.password,
          call.request.lastName,
          call.request.firstName,
          call.request.patronymic,
          roleName
        );
        callback(null, result);
      } catch (error: unknown) {
        const errorData = handleError(error);
        callback(errorData);
      }
    },

    Logout: async (
      call: grpc.ServerUnaryCall<TLogoutRequest, TLogoutResponse>,
      callback: grpc.sendUnaryData<TLogoutResponse>
    ) => {
      try {
        const result = await authService.logout(call.request.refreshToken);
        callback(null, result);
      } catch (error: unknown) {
        const errorData = handleError(error);
        callback(errorData);
      }
    },

    Refresh: async (
      call: grpc.ServerUnaryCall<TRefreshRequest, TRefreshResponse>,
      callback: grpc.sendUnaryData<TRefreshResponse>
    ) => {
      try {
        const result = await authService.refresh(call.request.refreshToken);
        callback(null, result);
      } catch (error: unknown) {
        const errorData = handleError(error);
        callback(errorData);
      }
    },

    ValidateAccessToken: async (
      call: grpc.ServerUnaryCall<TValidateTokenRequest, TValidateTokenResponse>,
      callback: grpc.sendUnaryData<TValidateTokenResponse>
    ) => {
      try {
        const result = tokenService.validateAccessToken(call.request.token);
        callback(null, result);
      } catch (error: unknown) {
        const errorData = handleError(error);
        callback(errorData);
      }
    },

    GetUsers: async (
      call: grpc.ServerUnaryCall<TGetUsersRequest, TGetUsersResponse>,
      callback: grpc.sendUnaryData<TGetUsersResponse>
    ) => {
      try {
        const result = await userService.getUsers(
          call.request.id,
          call.request.limit,
          call.request.page,
          call.request.searchQuery
        );
        callback(null, result);
      } catch (error: unknown) {
        const errorData = handleError(error);
        callback(errorData);
      }
    },

    GetUser: async (
      call: grpc.ServerUnaryCall<TGetUserRequest, TGetUserResponse>,
      callback: grpc.sendUnaryData<TGetUserResponse>
    ) => {
      try {
        const result = await userService.getUser(call.request.id);
        callback(null, result);
      } catch (error: unknown) {
        const errorData = handleError(error);
        callback(errorData);
      }
    },

    CreateUser: async (
      call: grpc.ServerUnaryCall<TCreateUserRequest, TCreateUserResponse>,
      callback: grpc.sendUnaryData<TCreateUserResponse>
    ) => {
      try {
        const roleName = ROLE_MAP[call.request.roleName];
        const result = await userService.createUser(
          call.request.administratorId,
          call.request.email,
          call.request.lastName,
          call.request.firstName,
          roleName,
          call.request.patronymic
        );
        callback(null, result);
      } catch (error: unknown) {
        const errorData = handleError(error);
        callback(errorData);
      }
    },

    UpdateUser: async (
      call: grpc.ServerUnaryCall<TUpdateUserRequest, TUpdateUserResponse>,
      callback: grpc.sendUnaryData<TUpdateUserResponse>
    ) => {
      try {
        const result = await userService.updateUser(
          call.request.id,
          call.request.email || undefined,
          call.request.lastName || undefined,
          call.request.firstName || undefined,
          call.request.patronymic || undefined
        );
        callback(null, result);
      } catch (error: unknown) {
        const errorData = handleError(error);
        callback(errorData);
      }
    },

    DeleteUser: async (
      call: grpc.ServerUnaryCall<TDeleteUserRequest, TDeleteUserResponse>,
      callback: grpc.sendUnaryData<TDeleteUserResponse>
    ) => {
      try {
        const result = await userService.deleteUser(call.request.id);
        callback(null, result);
      } catch (error: unknown) {
        const errorData = handleError(error);
        callback(errorData);
      }
    },
  });

  return server;
};

export const startGrpcServer = () => {
  const port = process.env.USER_SERVICE_PORT || "50051";
  const server = createGrpcServer();

  server.bindAsync(
    `0.0.0.0:${port}`,
    grpc.ServerCredentials.createInsecure(),
    (error, port) => {
      if (error) {
        console.error("Failed to start gRPC server:", error);
        return;
      }
      console.log(`User service gRPC server is running on port ${port}`);
    }
  );
};
