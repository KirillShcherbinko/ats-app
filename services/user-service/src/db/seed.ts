import { ERole } from "@/types/common";
import { db } from "./index";
import { roles } from "./schema";

export const seedDatabase = async () => {
  try {
    const existingRoles = await db.select().from(roles);

    if (existingRoles.length === 0) {
      await db
        .insert(roles)
        .values([{ title: ERole.ADMIN }, { title: ERole.RECRUITER }]);
    }
  } catch (error) {
    throw error;
  }
};
