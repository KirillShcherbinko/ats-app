import type * as grpc from '@grpc/grpc-js';
import type { EnumTypeDefinition, MessageTypeDefinition } from '@grpc/proto-loader';

import type { AuthResponse as _userService_AuthResponse, AuthResponse__Output as _userService_AuthResponse__Output } from './userService/AuthResponse';
import type { CreateUserRequest as _userService_CreateUserRequest, CreateUserRequest__Output as _userService_CreateUserRequest__Output } from './userService/CreateUserRequest';
import type { CreateUserResponse as _userService_CreateUserResponse, CreateUserResponse__Output as _userService_CreateUserResponse__Output } from './userService/CreateUserResponse';
import type { DeleteUserRequest as _userService_DeleteUserRequest, DeleteUserRequest__Output as _userService_DeleteUserRequest__Output } from './userService/DeleteUserRequest';
import type { DeleteUserResponse as _userService_DeleteUserResponse, DeleteUserResponse__Output as _userService_DeleteUserResponse__Output } from './userService/DeleteUserResponse';
import type { GetUserRequest as _userService_GetUserRequest, GetUserRequest__Output as _userService_GetUserRequest__Output } from './userService/GetUserRequest';
import type { GetUserResponse as _userService_GetUserResponse, GetUserResponse__Output as _userService_GetUserResponse__Output } from './userService/GetUserResponse';
import type { GetUsersRequest as _userService_GetUsersRequest, GetUsersRequest__Output as _userService_GetUsersRequest__Output } from './userService/GetUsersRequest';
import type { GetUsersResponse as _userService_GetUsersResponse, GetUsersResponse__Output as _userService_GetUsersResponse__Output } from './userService/GetUsersResponse';
import type { LoginRequest as _userService_LoginRequest, LoginRequest__Output as _userService_LoginRequest__Output } from './userService/LoginRequest';
import type { LogoutRequest as _userService_LogoutRequest, LogoutRequest__Output as _userService_LogoutRequest__Output } from './userService/LogoutRequest';
import type { LogoutResponse as _userService_LogoutResponse, LogoutResponse__Output as _userService_LogoutResponse__Output } from './userService/LogoutResponse';
import type { PageData as _userService_PageData, PageData__Output as _userService_PageData__Output } from './userService/PageData';
import type { RefreshRequest as _userService_RefreshRequest, RefreshRequest__Output as _userService_RefreshRequest__Output } from './userService/RefreshRequest';
import type { RegisterRequest as _userService_RegisterRequest, RegisterRequest__Output as _userService_RegisterRequest__Output } from './userService/RegisterRequest';
import type { TokenData as _userService_TokenData, TokenData__Output as _userService_TokenData__Output } from './userService/TokenData';
import type { UpdateUserRequest as _userService_UpdateUserRequest, UpdateUserRequest__Output as _userService_UpdateUserRequest__Output } from './userService/UpdateUserRequest';
import type { UpdateUserResponse as _userService_UpdateUserResponse, UpdateUserResponse__Output as _userService_UpdateUserResponse__Output } from './userService/UpdateUserResponse';
import type { UserData as _userService_UserData, UserData__Output as _userService_UserData__Output } from './userService/UserData';
import type { UserServiceClient as _userService_UserServiceClient, UserServiceDefinition as _userService_UserServiceDefinition } from './userService/UserService';
import type { ValidateTokenRequest as _userService_ValidateTokenRequest, ValidateTokenRequest__Output as _userService_ValidateTokenRequest__Output } from './userService/ValidateTokenRequest';
import type { ValidateTokenResponse as _userService_ValidateTokenResponse, ValidateTokenResponse__Output as _userService_ValidateTokenResponse__Output } from './userService/ValidateTokenResponse';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  userService: {
    AuthResponse: MessageTypeDefinition<_userService_AuthResponse, _userService_AuthResponse__Output>
    CreateUserRequest: MessageTypeDefinition<_userService_CreateUserRequest, _userService_CreateUserRequest__Output>
    CreateUserResponse: MessageTypeDefinition<_userService_CreateUserResponse, _userService_CreateUserResponse__Output>
    DeleteUserRequest: MessageTypeDefinition<_userService_DeleteUserRequest, _userService_DeleteUserRequest__Output>
    DeleteUserResponse: MessageTypeDefinition<_userService_DeleteUserResponse, _userService_DeleteUserResponse__Output>
    GetUserRequest: MessageTypeDefinition<_userService_GetUserRequest, _userService_GetUserRequest__Output>
    GetUserResponse: MessageTypeDefinition<_userService_GetUserResponse, _userService_GetUserResponse__Output>
    GetUsersRequest: MessageTypeDefinition<_userService_GetUsersRequest, _userService_GetUsersRequest__Output>
    GetUsersResponse: MessageTypeDefinition<_userService_GetUsersResponse, _userService_GetUsersResponse__Output>
    LoginRequest: MessageTypeDefinition<_userService_LoginRequest, _userService_LoginRequest__Output>
    LogoutRequest: MessageTypeDefinition<_userService_LogoutRequest, _userService_LogoutRequest__Output>
    LogoutResponse: MessageTypeDefinition<_userService_LogoutResponse, _userService_LogoutResponse__Output>
    PageData: MessageTypeDefinition<_userService_PageData, _userService_PageData__Output>
    RefreshRequest: MessageTypeDefinition<_userService_RefreshRequest, _userService_RefreshRequest__Output>
    RegisterRequest: MessageTypeDefinition<_userService_RegisterRequest, _userService_RegisterRequest__Output>
    Role: EnumTypeDefinition
    TokenData: MessageTypeDefinition<_userService_TokenData, _userService_TokenData__Output>
    UpdateUserRequest: MessageTypeDefinition<_userService_UpdateUserRequest, _userService_UpdateUserRequest__Output>
    UpdateUserResponse: MessageTypeDefinition<_userService_UpdateUserResponse, _userService_UpdateUserResponse__Output>
    UserData: MessageTypeDefinition<_userService_UserData, _userService_UserData__Output>
    UserService: SubtypeConstructor<typeof grpc.Client, _userService_UserServiceClient> & { service: _userService_UserServiceDefinition }
    ValidateTokenRequest: MessageTypeDefinition<_userService_ValidateTokenRequest, _userService_ValidateTokenRequest__Output>
    ValidateTokenResponse: MessageTypeDefinition<_userService_ValidateTokenResponse, _userService_ValidateTokenResponse__Output>
  }
}

