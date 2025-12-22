// Original file: proto/user.proto

import type { UserData as _userService_UserData, UserData__Output as _userService_UserData__Output } from '../userService/UserData';
import type { Long } from '@grpc/proto-loader';

export interface AuthResponse {
  'accessToken'?: (string);
  'refreshToken'?: (string);
  'expiresIn'?: (number | string | Long);
  'user'?: (_userService_UserData | null);
}

export interface AuthResponse__Output {
  'accessToken': (string);
  'refreshToken': (string);
  'expiresIn': (number);
  'user': (_userService_UserData__Output | null);
}
