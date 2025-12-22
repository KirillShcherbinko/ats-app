import { TDecodedTokenData, TPageData, TTokenData, TUserData } from "./common";

////////// Типы ответов //////////

// Auth Service
export type TAuthReponse = {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  user: TUserData;
};
export type TLoginResponse = TAuthReponse;
export type TRegisterResponse = TAuthReponse;
export type TLogoutResponse = void;
export type TRefreshResponse = TAuthReponse;

// User Service
export type TGetUsersResponse = {
  users: TUserData[];
  pageData: TPageData;
};
export type TGetUserResponse = TUserData;
export type TCreateUserResponse = TUserData;
export type TUpdateUserResponse = TUserData;
export type TDeleteUserResponse = void;

// Token Service
export type TGenerateTokensResponse = TTokenData;
export type TValidateTokenResponse = TDecodedTokenData | null;
