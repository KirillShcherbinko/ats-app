// Original file: proto/user.proto

import type { Role as _userService_Role, Role__Output as _userService_Role__Output } from '../userService/Role';
import type { Long } from '@grpc/proto-loader';

export interface UserData {
  'id'?: (string);
  'role'?: (_userService_Role);
  'fullName'?: (string);
  'email'?: (string);
  'createdAt'?: (number | string | Long);
  'updatedAt'?: (number | string | Long);
}

export interface UserData__Output {
  'id': (string);
  'role': (_userService_Role__Output);
  'fullName': (string);
  'email': (string);
  'createdAt': (number);
  'updatedAt': (number);
}
