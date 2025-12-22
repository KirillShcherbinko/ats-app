// Original file: proto/user.proto

export const Role = {
  ROLE_UNSPECIFIED: 'ROLE_UNSPECIFIED',
  ROLE_ADMIN: 'ROLE_ADMIN',
  ROLE_RECRUITER: 'ROLE_RECRUITER',
} as const;

export type Role =
  | 'ROLE_UNSPECIFIED'
  | 0
  | 'ROLE_ADMIN'
  | 1
  | 'ROLE_RECRUITER'
  | 2

export type Role__Output = typeof Role[keyof typeof Role]
