// Original file: proto/user.proto

import type { UserData as _userService_UserData, UserData__Output as _userService_UserData__Output } from '../userService/UserData';
import type { PageData as _userService_PageData, PageData__Output as _userService_PageData__Output } from '../userService/PageData';

export interface GetUsersResponse {
  'users'?: (_userService_UserData)[];
  'pageData'?: (_userService_PageData | null);
}

export interface GetUsersResponse__Output {
  'users': (_userService_UserData__Output)[];
  'pageData': (_userService_PageData__Output | null);
}
