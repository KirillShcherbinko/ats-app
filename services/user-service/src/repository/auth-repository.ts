import { roles, users } from "@/db/schema";
import { BaseRepository } from "./base-repository";
import { eq } from "drizzle-orm";
import { TUserWithPasswordHash } from "@/types/common";

export class AuthRepository extends BaseRepository {
  // Запрос для поиска пользователя по email
  public async findOneByEmail(email: string): Promise<TUserWithPasswordHash> {
    const [user] = await this._db
      .select({
        id: users.id,
        email: users.email,
        lastName: users.lastName,
        firstName: users.firstName,
        patronymic: users.patronymic,
        passwordHash: users.passwordHash,
        createdAt: users.createdAt,
        updatedAt: users.updatedAt,
        role: {
          title: roles.title,
        },
      })
      .from(users)
      .innerJoin(roles, eq(roles.id, users.roleId))
      .where(eq(users.email, email));

    return user;
  }
}
