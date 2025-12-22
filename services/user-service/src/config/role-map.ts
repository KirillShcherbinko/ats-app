import { ERole } from "@/types/common";
import { Role__Output } from "@/types/userService/Role";

export const ROLE_MAP: Record<Role__Output, ERole> = {
  ROLE_UNSPECIFIED: ERole.ADMIN,
  ROLE_ADMIN: ERole.ADMIN,
  ROLE_RECRUITER: ERole.ADMIN,
};

export const REVERSED_ROLE_MAP: Record<ERole, Role__Output> = {
  [ERole.ADMIN]: "ROLE_ADMIN",
  [ERole.RECRUITER]: "ROLE_RECRUITER",
};
