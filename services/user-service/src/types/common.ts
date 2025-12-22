////////// Enums //////////
export enum ERole {
  ADMIN = "Админимтратор",
  RECRUITER = "Рекрутер",
}

////////// Типы для входных данных //////////
export type TJWTPayload = {
  userId: string;
  role: ERole;
};

////////// Типы для возвращаемых данных //////////
export type TPageData = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

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
