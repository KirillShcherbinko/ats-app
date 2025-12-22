// Original file: proto/user.proto

import type { Role as _userService_Role, Role__Output as _userService_Role__Output } from '../userService/Role';

export interface CreateUserRequest {
  'administratorId'?: (string);
  'email'?: (string);
  'lastName'?: (string);
  'firstName'?: (string);
  'roleName'?: (_userService_Role);
  'patronymic'?: (string);
  '_patronymic'?: "patronymic";
}

export interface CreateUserRequest__Output {
  'administratorId': (string);
  'email': (string);
  'lastName': (string);
  'firstName': (string);
  'roleName': (_userService_Role__Output);
  'patronymic'?: (string);
  '_patronymic'?: "patronymic";
}
