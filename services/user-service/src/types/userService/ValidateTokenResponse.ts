// Original file: proto/user.proto

import type { Role as _userService_Role, Role__Output as _userService_Role__Output } from '../userService/Role';

export interface ValidateTokenResponse {
  'isValid'?: (boolean);
  'userId'?: (string);
  'role'?: (_userService_Role);
  '_userId'?: "userId";
  '_role'?: "role";
}

export interface ValidateTokenResponse__Output {
  'isValid': (boolean);
  'userId'?: (string);
  'role'?: (_userService_Role__Output);
  '_userId'?: "userId";
  '_role'?: "role";
}
