// Original file: proto/user.proto

import type { Role as _userService_Role, Role__Output as _userService_Role__Output } from '../userService/Role';

export interface RegisterRequest {
  'email'?: (string);
  'password'?: (string);
  'lastName'?: (string);
  'firstName'?: (string);
  'patronymic'?: (string);
  'roleName'?: (_userService_Role);
  '_patronymic'?: "patronymic";
}

export interface RegisterRequest__Output {
  'email': (string);
  'password': (string);
  'lastName': (string);
  'firstName': (string);
  'patronymic'?: (string);
  'roleName': (_userService_Role__Output);
  '_patronymic'?: "patronymic";
}
