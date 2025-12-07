export interface User {
  id: string;
  role: string;
  full_name: string;
  email: string;
  created_at: number;
  updated_at: number;
}

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  user: User;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  last_name: string;
  first_name: string;
  patronymic?: string;
  email: string;
  password: string;
}

export interface CreateUserRequest {
  last_name: string;
  first_name: string;
  patronymic?: string;
  email: string;
}

export interface GetUsersRequest {
  limit: number;
  page: number;
  search_query?: string;
}

export interface ValidateTokenRequest {
  token: string;
  secret: string;
}

export interface JwtPayload {
  userId: string;
  role: string;
}

export interface TokenData {
  id: string;
  user_id: string;
  refresh_token: string;
}

export interface UserWithRole {
  id: string;
  email: string;
  password_hash: string;
  first_name: string;
  last_name: string;
  patronymic: string | null;
  role_id: string;
  created_at: Date;
  updated_at: Date;
  role: {
    id: string;
    title: string;
  };
}