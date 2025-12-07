import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from 'path';
import {
  login,
  register,
  logout,
  refresh,
  validateAccessToken,
} from './services/auth-service';
import {
  getUsers,
  getUser,
  createUser,
  deleteUser,
} from './services/user-service';

const PROTO_PATH = path.join(__dirname, '../../proto/user.proto');

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
const userPackage = protoDescriptor.user as any;

const createGrpcServer = () => {
  const server = new grpc.Server();

  server.addService(userPackage.UserService.service, {
    Login: async (call: any, callback: any) => {
      try {
        const result = await login(call.request.email, call.request.password);
        callback(null, result);
      } catch (error: any) {
        callback({
          code: grpc.status.INTERNAL,
          message: error.message,
        });
      }
    },

    Register: async (call: any, callback: any) => {
      try {
        const result = await register(
          call.request.last_name,
          call.request.first_name,
          call.request.patronymic,
          call.request.email,
          call.request.password
        );
        callback(null, result);
      } catch (error: any) {
        callback({
          code: grpc.status.INTERNAL,
          message: error.message,
        });
      }
    },

    Logout: async (call: any, callback: any) => {
      try {
        await logout(call.request.refresh_token);
        callback(null, {});
      } catch (error: any) {
        callback({
          code: grpc.status.INTERNAL,
          message: error.message,
        });
      }
    },

    Refresh: async (call: any, callback: any) => {
      try {
        const result = await refresh(call.request.refresh_token);
        callback(null, result);
      } catch (error: any) {
        callback({
          code: grpc.status.INTERNAL,
          message: error.message,
        });
      }
    },

    ValidateToken: async (call: any, callback: any) => {
      try {
        const result = await validateAccessToken(call.request.token, call.request.secret);
        callback(null, result);
      } catch (error: any) {
        callback({
          code: grpc.status.INTERNAL,
          message: error.message,
        });
      }
    },

    GetUsers: async (call: any, callback: any) => {
      try {
        const result = await getUsers(
          call.request.limit,
          call.request.page,
          call.request.search_query
        );
        callback(null, result);
      } catch (error: any) {
        callback({
          code: grpc.status.INTERNAL,
          message: error.message,
        });
      }
    },

    GetUser: async (call: any, callback: any) => {
      try {
        const result = await getUser(call.request.id);
        callback(null, result);
      } catch (error: any) {
        callback({
          code: grpc.status.INTERNAL,
          message: error.message,
        });
      }
    },

    CreateUser: async (call: any, callback: any) => {
      try {
        const result = await createUser(
          call.request.last_name,
          call.request.first_name,
          call.request.patronymic,
          call.request.email
        );
        callback(null, result);
      } catch (error: any) {
        callback({
          code: grpc.status.INTERNAL,
          message: error.message,
        });
      }
    },

    DeleteUser: async (call: any, callback: any) => {
      try {
        await deleteUser(call.request.id);
        callback(null, {});
      } catch (error: any) {
        callback({
          code: grpc.status.INTERNAL,
          message: error.message,
        });
      }
    },
  });

  return server;
};

export const startGrpcServer = () => {
  const port = process.env.GRPC_PORT || '50051';
  const server = createGrpcServer();
  
  server.bindAsync(
    `0.0.0.0:${port}`,
    grpc.ServerCredentials.createInsecure(),
    (error, port) => {
      if (error) {
        console.error('Failed to start gRPC server:', error);
        return;
      }
      console.log(`User service gRPC server running on port ${port}`);
    }
  );
};