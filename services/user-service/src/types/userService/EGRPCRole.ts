// Original file: proto/user.proto

export const EGRPCRole = {
  ROLE_UNSPECIFIED: 'ROLE_UNSPECIFIED',
  ROLE_ADMIN: 'ROLE_ADMIN',
  ROLE_RECRUITER: 'ROLE_RECRUITER',
} as const;

export type EGRPCRole =
  | 'ROLE_UNSPECIFIED'
  | 0
  | 'ROLE_ADMIN'
  | 1
  | 'ROLE_RECRUITER'
  | 2

export type EGRPCRole__Output = typeof EGRPCRole[keyof typeof EGRPCRole]
