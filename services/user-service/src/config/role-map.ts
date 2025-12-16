import { EGRPCRole, ERole } from "@/model/types";

export const ROLE_MAP: Record<EGRPCRole, ERole> = {
  [EGRPCRole.ROLE_UNSPECIFIED]: ERole.RECRUITER,
  [EGRPCRole.ROLE_ADMIN]: ERole.ADMIN,
  [EGRPCRole.ROLE_RECRUITER]: ERole.RECRUITER,
};
