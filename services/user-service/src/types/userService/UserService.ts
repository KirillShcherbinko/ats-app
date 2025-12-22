// Original file: proto/user.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { AuthResponse as _userService_AuthResponse, AuthResponse__Output as _userService_AuthResponse__Output } from '../userService/AuthResponse';
import type { CreateUserRequest as _userService_CreateUserRequest, CreateUserRequest__Output as _userService_CreateUserRequest__Output } from '../userService/CreateUserRequest';
import type { CreateUserResponse as _userService_CreateUserResponse, CreateUserResponse__Output as _userService_CreateUserResponse__Output } from '../userService/CreateUserResponse';
import type { DeleteUserRequest as _userService_DeleteUserRequest, DeleteUserRequest__Output as _userService_DeleteUserRequest__Output } from '../userService/DeleteUserRequest';
import type { DeleteUserResponse as _userService_DeleteUserResponse, DeleteUserResponse__Output as _userService_DeleteUserResponse__Output } from '../userService/DeleteUserResponse';
import type { GetUserRequest as _userService_GetUserRequest, GetUserRequest__Output as _userService_GetUserRequest__Output } from '../userService/GetUserRequest';
import type { GetUserResponse as _userService_GetUserResponse, GetUserResponse__Output as _userService_GetUserResponse__Output } from '../userService/GetUserResponse';
import type { GetUsersRequest as _userService_GetUsersRequest, GetUsersRequest__Output as _userService_GetUsersRequest__Output } from '../userService/GetUsersRequest';
import type { GetUsersResponse as _userService_GetUsersResponse, GetUsersResponse__Output as _userService_GetUsersResponse__Output } from '../userService/GetUsersResponse';
import type { LoginRequest as _userService_LoginRequest, LoginRequest__Output as _userService_LoginRequest__Output } from '../userService/LoginRequest';
import type { LogoutRequest as _userService_LogoutRequest, LogoutRequest__Output as _userService_LogoutRequest__Output } from '../userService/LogoutRequest';
import type { LogoutResponse as _userService_LogoutResponse, LogoutResponse__Output as _userService_LogoutResponse__Output } from '../userService/LogoutResponse';
import type { RefreshRequest as _userService_RefreshRequest, RefreshRequest__Output as _userService_RefreshRequest__Output } from '../userService/RefreshRequest';
import type { RegisterRequest as _userService_RegisterRequest, RegisterRequest__Output as _userService_RegisterRequest__Output } from '../userService/RegisterRequest';
import type { UpdateUserRequest as _userService_UpdateUserRequest, UpdateUserRequest__Output as _userService_UpdateUserRequest__Output } from '../userService/UpdateUserRequest';
import type { UpdateUserResponse as _userService_UpdateUserResponse, UpdateUserResponse__Output as _userService_UpdateUserResponse__Output } from '../userService/UpdateUserResponse';
import type { ValidateTokenRequest as _userService_ValidateTokenRequest, ValidateTokenRequest__Output as _userService_ValidateTokenRequest__Output } from '../userService/ValidateTokenRequest';
import type { ValidateTokenResponse as _userService_ValidateTokenResponse, ValidateTokenResponse__Output as _userService_ValidateTokenResponse__Output } from '../userService/ValidateTokenResponse';

export interface UserServiceClient extends grpc.Client {
  CreateUser(argument: _userService_CreateUserRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_userService_CreateUserResponse__Output>): grpc.ClientUnaryCall;
  CreateUser(argument: _userService_CreateUserRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_userService_CreateUserResponse__Output>): grpc.ClientUnaryCall;
  CreateUser(argument: _userService_CreateUserRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_userService_CreateUserResponse__Output>): grpc.ClientUnaryCall;
  CreateUser(argument: _userService_CreateUserRequest, callback: grpc.requestCallback<_userService_CreateUserResponse__Output>): grpc.ClientUnaryCall;
  createUser(argument: _userService_CreateUserRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_userService_CreateUserResponse__Output>): grpc.ClientUnaryCall;
  createUser(argument: _userService_CreateUserRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_userService_CreateUserResponse__Output>): grpc.ClientUnaryCall;
  createUser(argument: _userService_CreateUserRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_userService_CreateUserResponse__Output>): grpc.ClientUnaryCall;
  createUser(argument: _userService_CreateUserRequest, callback: grpc.requestCallback<_userService_CreateUserResponse__Output>): grpc.ClientUnaryCall;
  
  DeleteUser(argument: _userService_DeleteUserRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_userService_DeleteUserResponse__Output>): grpc.ClientUnaryCall;
  DeleteUser(argument: _userService_DeleteUserRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_userService_DeleteUserResponse__Output>): grpc.ClientUnaryCall;
  DeleteUser(argument: _userService_DeleteUserRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_userService_DeleteUserResponse__Output>): grpc.ClientUnaryCall;
  DeleteUser(argument: _userService_DeleteUserRequest, callback: grpc.requestCallback<_userService_DeleteUserResponse__Output>): grpc.ClientUnaryCall;
  deleteUser(argument: _userService_DeleteUserRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_userService_DeleteUserResponse__Output>): grpc.ClientUnaryCall;
  deleteUser(argument: _userService_DeleteUserRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_userService_DeleteUserResponse__Output>): grpc.ClientUnaryCall;
  deleteUser(argument: _userService_DeleteUserRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_userService_DeleteUserResponse__Output>): grpc.ClientUnaryCall;
  deleteUser(argument: _userService_DeleteUserRequest, callback: grpc.requestCallback<_userService_DeleteUserResponse__Output>): grpc.ClientUnaryCall;
  
  GetUser(argument: _userService_GetUserRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_userService_GetUserResponse__Output>): grpc.ClientUnaryCall;
  GetUser(argument: _userService_GetUserRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_userService_GetUserResponse__Output>): grpc.ClientUnaryCall;
  GetUser(argument: _userService_GetUserRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_userService_GetUserResponse__Output>): grpc.ClientUnaryCall;
  GetUser(argument: _userService_GetUserRequest, callback: grpc.requestCallback<_userService_GetUserResponse__Output>): grpc.ClientUnaryCall;
  getUser(argument: _userService_GetUserRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_userService_GetUserResponse__Output>): grpc.ClientUnaryCall;
  getUser(argument: _userService_GetUserRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_userService_GetUserResponse__Output>): grpc.ClientUnaryCall;
  getUser(argument: _userService_GetUserRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_userService_GetUserResponse__Output>): grpc.ClientUnaryCall;
  getUser(argument: _userService_GetUserRequest, callback: grpc.requestCallback<_userService_GetUserResponse__Output>): grpc.ClientUnaryCall;
  
  GetUsers(argument: _userService_GetUsersRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_userService_GetUsersResponse__Output>): grpc.ClientUnaryCall;
  GetUsers(argument: _userService_GetUsersRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_userService_GetUsersResponse__Output>): grpc.ClientUnaryCall;
  GetUsers(argument: _userService_GetUsersRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_userService_GetUsersResponse__Output>): grpc.ClientUnaryCall;
  GetUsers(argument: _userService_GetUsersRequest, callback: grpc.requestCallback<_userService_GetUsersResponse__Output>): grpc.ClientUnaryCall;
  getUsers(argument: _userService_GetUsersRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_userService_GetUsersResponse__Output>): grpc.ClientUnaryCall;
  getUsers(argument: _userService_GetUsersRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_userService_GetUsersResponse__Output>): grpc.ClientUnaryCall;
  getUsers(argument: _userService_GetUsersRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_userService_GetUsersResponse__Output>): grpc.ClientUnaryCall;
  getUsers(argument: _userService_GetUsersRequest, callback: grpc.requestCallback<_userService_GetUsersResponse__Output>): grpc.ClientUnaryCall;
  
  Login(argument: _userService_LoginRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_userService_AuthResponse__Output>): grpc.ClientUnaryCall;
  Login(argument: _userService_LoginRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_userService_AuthResponse__Output>): grpc.ClientUnaryCall;
  Login(argument: _userService_LoginRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_userService_AuthResponse__Output>): grpc.ClientUnaryCall;
  Login(argument: _userService_LoginRequest, callback: grpc.requestCallback<_userService_AuthResponse__Output>): grpc.ClientUnaryCall;
  login(argument: _userService_LoginRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_userService_AuthResponse__Output>): grpc.ClientUnaryCall;
  login(argument: _userService_LoginRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_userService_AuthResponse__Output>): grpc.ClientUnaryCall;
  login(argument: _userService_LoginRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_userService_AuthResponse__Output>): grpc.ClientUnaryCall;
  login(argument: _userService_LoginRequest, callback: grpc.requestCallback<_userService_AuthResponse__Output>): grpc.ClientUnaryCall;
  
  Logout(argument: _userService_LogoutRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_userService_LogoutResponse__Output>): grpc.ClientUnaryCall;
  Logout(argument: _userService_LogoutRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_userService_LogoutResponse__Output>): grpc.ClientUnaryCall;
  Logout(argument: _userService_LogoutRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_userService_LogoutResponse__Output>): grpc.ClientUnaryCall;
  Logout(argument: _userService_LogoutRequest, callback: grpc.requestCallback<_userService_LogoutResponse__Output>): grpc.ClientUnaryCall;
  logout(argument: _userService_LogoutRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_userService_LogoutResponse__Output>): grpc.ClientUnaryCall;
  logout(argument: _userService_LogoutRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_userService_LogoutResponse__Output>): grpc.ClientUnaryCall;
  logout(argument: _userService_LogoutRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_userService_LogoutResponse__Output>): grpc.ClientUnaryCall;
  logout(argument: _userService_LogoutRequest, callback: grpc.requestCallback<_userService_LogoutResponse__Output>): grpc.ClientUnaryCall;
  
  Refresh(argument: _userService_RefreshRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_userService_AuthResponse__Output>): grpc.ClientUnaryCall;
  Refresh(argument: _userService_RefreshRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_userService_AuthResponse__Output>): grpc.ClientUnaryCall;
  Refresh(argument: _userService_RefreshRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_userService_AuthResponse__Output>): grpc.ClientUnaryCall;
  Refresh(argument: _userService_RefreshRequest, callback: grpc.requestCallback<_userService_AuthResponse__Output>): grpc.ClientUnaryCall;
  refresh(argument: _userService_RefreshRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_userService_AuthResponse__Output>): grpc.ClientUnaryCall;
  refresh(argument: _userService_RefreshRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_userService_AuthResponse__Output>): grpc.ClientUnaryCall;
  refresh(argument: _userService_RefreshRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_userService_AuthResponse__Output>): grpc.ClientUnaryCall;
  refresh(argument: _userService_RefreshRequest, callback: grpc.requestCallback<_userService_AuthResponse__Output>): grpc.ClientUnaryCall;
  
  Register(argument: _userService_RegisterRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_userService_AuthResponse__Output>): grpc.ClientUnaryCall;
  Register(argument: _userService_RegisterRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_userService_AuthResponse__Output>): grpc.ClientUnaryCall;
  Register(argument: _userService_RegisterRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_userService_AuthResponse__Output>): grpc.ClientUnaryCall;
  Register(argument: _userService_RegisterRequest, callback: grpc.requestCallback<_userService_AuthResponse__Output>): grpc.ClientUnaryCall;
  register(argument: _userService_RegisterRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_userService_AuthResponse__Output>): grpc.ClientUnaryCall;
  register(argument: _userService_RegisterRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_userService_AuthResponse__Output>): grpc.ClientUnaryCall;
  register(argument: _userService_RegisterRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_userService_AuthResponse__Output>): grpc.ClientUnaryCall;
  register(argument: _userService_RegisterRequest, callback: grpc.requestCallback<_userService_AuthResponse__Output>): grpc.ClientUnaryCall;
  
  UpdateUser(argument: _userService_UpdateUserRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_userService_UpdateUserResponse__Output>): grpc.ClientUnaryCall;
  UpdateUser(argument: _userService_UpdateUserRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_userService_UpdateUserResponse__Output>): grpc.ClientUnaryCall;
  UpdateUser(argument: _userService_UpdateUserRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_userService_UpdateUserResponse__Output>): grpc.ClientUnaryCall;
  UpdateUser(argument: _userService_UpdateUserRequest, callback: grpc.requestCallback<_userService_UpdateUserResponse__Output>): grpc.ClientUnaryCall;
  updateUser(argument: _userService_UpdateUserRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_userService_UpdateUserResponse__Output>): grpc.ClientUnaryCall;
  updateUser(argument: _userService_UpdateUserRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_userService_UpdateUserResponse__Output>): grpc.ClientUnaryCall;
  updateUser(argument: _userService_UpdateUserRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_userService_UpdateUserResponse__Output>): grpc.ClientUnaryCall;
  updateUser(argument: _userService_UpdateUserRequest, callback: grpc.requestCallback<_userService_UpdateUserResponse__Output>): grpc.ClientUnaryCall;
  
  ValidateToken(argument: _userService_ValidateTokenRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_userService_ValidateTokenResponse__Output>): grpc.ClientUnaryCall;
  ValidateToken(argument: _userService_ValidateTokenRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_userService_ValidateTokenResponse__Output>): grpc.ClientUnaryCall;
  ValidateToken(argument: _userService_ValidateTokenRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_userService_ValidateTokenResponse__Output>): grpc.ClientUnaryCall;
  ValidateToken(argument: _userService_ValidateTokenRequest, callback: grpc.requestCallback<_userService_ValidateTokenResponse__Output>): grpc.ClientUnaryCall;
  validateToken(argument: _userService_ValidateTokenRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_userService_ValidateTokenResponse__Output>): grpc.ClientUnaryCall;
  validateToken(argument: _userService_ValidateTokenRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_userService_ValidateTokenResponse__Output>): grpc.ClientUnaryCall;
  validateToken(argument: _userService_ValidateTokenRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_userService_ValidateTokenResponse__Output>): grpc.ClientUnaryCall;
  validateToken(argument: _userService_ValidateTokenRequest, callback: grpc.requestCallback<_userService_ValidateTokenResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface UserServiceHandlers extends grpc.UntypedServiceImplementation {
  CreateUser: grpc.handleUnaryCall<_userService_CreateUserRequest__Output, _userService_CreateUserResponse>;
  
  DeleteUser: grpc.handleUnaryCall<_userService_DeleteUserRequest__Output, _userService_DeleteUserResponse>;
  
  GetUser: grpc.handleUnaryCall<_userService_GetUserRequest__Output, _userService_GetUserResponse>;
  
  GetUsers: grpc.handleUnaryCall<_userService_GetUsersRequest__Output, _userService_GetUsersResponse>;
  
  Login: grpc.handleUnaryCall<_userService_LoginRequest__Output, _userService_AuthResponse>;
  
  Logout: grpc.handleUnaryCall<_userService_LogoutRequest__Output, _userService_LogoutResponse>;
  
  Refresh: grpc.handleUnaryCall<_userService_RefreshRequest__Output, _userService_AuthResponse>;
  
  Register: grpc.handleUnaryCall<_userService_RegisterRequest__Output, _userService_AuthResponse>;
  
  UpdateUser: grpc.handleUnaryCall<_userService_UpdateUserRequest__Output, _userService_UpdateUserResponse>;
  
  ValidateToken: grpc.handleUnaryCall<_userService_ValidateTokenRequest__Output, _userService_ValidateTokenResponse>;
  
}

export interface UserServiceDefinition extends grpc.ServiceDefinition {
  CreateUser: MethodDefinition<_userService_CreateUserRequest, _userService_CreateUserResponse, _userService_CreateUserRequest__Output, _userService_CreateUserResponse__Output>
  DeleteUser: MethodDefinition<_userService_DeleteUserRequest, _userService_DeleteUserResponse, _userService_DeleteUserRequest__Output, _userService_DeleteUserResponse__Output>
  GetUser: MethodDefinition<_userService_GetUserRequest, _userService_GetUserResponse, _userService_GetUserRequest__Output, _userService_GetUserResponse__Output>
  GetUsers: MethodDefinition<_userService_GetUsersRequest, _userService_GetUsersResponse, _userService_GetUsersRequest__Output, _userService_GetUsersResponse__Output>
  Login: MethodDefinition<_userService_LoginRequest, _userService_AuthResponse, _userService_LoginRequest__Output, _userService_AuthResponse__Output>
  Logout: MethodDefinition<_userService_LogoutRequest, _userService_LogoutResponse, _userService_LogoutRequest__Output, _userService_LogoutResponse__Output>
  Refresh: MethodDefinition<_userService_RefreshRequest, _userService_AuthResponse, _userService_RefreshRequest__Output, _userService_AuthResponse__Output>
  Register: MethodDefinition<_userService_RegisterRequest, _userService_AuthResponse, _userService_RegisterRequest__Output, _userService_AuthResponse__Output>
  UpdateUser: MethodDefinition<_userService_UpdateUserRequest, _userService_UpdateUserResponse, _userService_UpdateUserRequest__Output, _userService_UpdateUserResponse__Output>
  ValidateToken: MethodDefinition<_userService_ValidateTokenRequest, _userService_ValidateTokenResponse, _userService_ValidateTokenRequest__Output, _userService_ValidateTokenResponse__Output>
}
