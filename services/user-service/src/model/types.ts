import { roles, tokens, users } from "../db/schema";

////////// Enums //////////
export enum ERole {
  ADMIN = "Админимтратор",
  RECRUITER = "Рекрутер",
}

export enum EGRPCRole {
  ROLE_UNSPECIFIED = 0,
  ROLE_ADMIN = 1,
  ROLE_RECRUITER = 2,
}

////////// Типы схем БД //////////
export type TUser = typeof users.$inferSelect;
export type TNewUser = typeof users.$inferInsert;

export type TRole = typeof roles.$inferSelect;
export type TNewRole = typeof roles.$inferInsert;

export type TToken = typeof tokens.$inferSelect;
export type TNewToken = typeof tokens.$inferInsert;

////////// Типы для входных данных //////////
export type TJWTPayload = {
  userId: string;
  role: ERole;
};

////////// Типы для возвращаемых данных //////////
export type TUserData = {
  id: string;
  role: ERole;
  fullName: string;
  email: string;
  createdAt: number;
  updatedAt: number;
};

export type TUserWithRoleData = {
  id: string;
  email: string;
  lastName: string;
  firstName: string;
  patronymic: string | null;
  createdAt: Date;
  updatedAt: Date;
  role: {
    title: ERole;
  };
};

export type TUserWithPasswordHash = TUserWithRoleData & {
  passwordHash: string;
};

export type TTokenData = {
  accessToken: string;
  refreshToken: string;
};

export type TDecodedTokenData = {
  userId: string;
  role: ERole;
};

////////// Типы запросов //////////
// Auth Service
export type TLoginRequest = {
  email: string;
  password: string;
};
export type TRegisterRequest = {
  email: string;
  password: string;
  lastName: string;
  firstName: string;
  patronymic: string | null;
  roleName: ERole;
};
export type TLogoutRequest = {
  refreshToken: string;
};

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
  pageData: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};
export type TGetUserResponse = TUserData;
export type TCreateUserResponse = TNewUser;
export type TUpdateUserResponse = TUser;
export type TDeleteUserResponse = void;

// Token Service
export type TGenerateTokensResponse = TTokenData;
export type TValidateTokenResponse = TDecodedTokenData | null;
