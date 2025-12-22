import { REVERSED_ROLE_MAP } from "@/config/role-map";
import { TUserData } from "@/types/common";
import { UserData__Output } from "@/types/userService/UserData";

export const getGrpcUserResponse = (user: TUserData): UserData__Output => {
  return { ...user, role: REVERSED_ROLE_MAP[user.role] };
};
