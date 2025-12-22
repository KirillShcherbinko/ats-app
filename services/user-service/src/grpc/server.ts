import path from "path";
import { AuthService } from "../services/auth-service";
import { UserService } from "../services/user-service";
import { TokenService } from "../services/token-service";
import { Login } from "./login";
import { Register } from "./register";
import { Logout } from "./logout";
import { Refresh } from "./refresh";
import { ValidateToken } from "./validate-token";
import { GetUsers } from "./get-users";
import { GetUser } from "./get-user";
import { CreateUser } from "./create-user";
import { UpdateUser } from "./update-user";
import { DeleteUser } from "./delete-user";
import {
  loadPackageDefinition,
  Server,
  ServerCredentials,
} from "@grpc/grpc-js";
import { loadSync } from "@grpc/proto-loader";

const PROTO_PATH = path.join(__dirname, "../proto/user.proto");

const packageDefinition = loadSync(PROTO_PATH, {
  keepCase: false,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const protoDescriptor = loadPackageDefinition(packageDefinition);
const userPackage = protoDescriptor.user as any;

export const authService = new AuthService();
export const userService = new UserService();
export const tokenService = new TokenService();

const createGrpcServer = () => {
  const server = new Server();

  server.addService(userPackage.UserService.service, {
    Login,
    Register,
    Logout,
    Refresh,
    ValidateToken,
    GetUsers,
    GetUser,
    CreateUser,
    UpdateUser,
    DeleteUser,
  });

  return server;
};

export const startGrpcServer = () => {
  const port = process.env.USER_SERVICE_PORT || "50051";
  const server = createGrpcServer();

  server.bindAsync(
    `0.0.0.0:${port}`,
    ServerCredentials.createInsecure(),
    (error, port) => {
      if (error) {
        console.error("Failed to start gRPC server:", error);
        return;
      }
      console.log(`User service gRPC server is running on port ${port}`);
    }
  );
};
