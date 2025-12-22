import { db } from "@/db";
import { roles, users } from "@/db/schema";
import { ERole, TUserWithRoleData } from "@/types/common";
import { TNewUser, TRole } from "@/types/db";
import { eq, sql } from "drizzle-orm";

////////// Базовый репозиторий для работы с пользователями //////////
export class BaseRepository {
  protected _db = db;

  // Получение роли по названию
  public async getRole(roleName: ERole): Promise<TRole> {
    const [role] = await this._db
      .select()
      .from(roles)
      .where(eq(roles.title, roleName));
    return role;
  }

  // Получение роли по id
  public async getRoleById(roleId: string): Promise<ERole> {
    const [role] = await this._db
      .select({ title: roles.title })
      .from(roles)
      .where(eq(roles.id, roleId));
    return role.title;
  }

  // Проверка на сущестование пользователя с email
  public async isExists(email: string): Promise<boolean> {
    const [user] = await this._db
      .select()
      .from(users)
      .where(eq(users.email, email));
    return !!user;
  }

  // Запрос для получения одного сотрудника
  public async findOne(id: string): Promise<TUserWithRoleData> {
    const [user] = await this._db
      .select({
        id: users.id,
        email: users.email,
        lastName: users.lastName,
        firstName: users.firstName,
        patronymic: users.patronymic,
        createdAt: users.createdAt,
        updatedAt: users.updatedAt,
        role: {
          title: roles.title,
        },
      })
      .from(users)
      .innerJoin(roles, eq(roles.id, users.roleId))
      .where(eq(users.id, id));

    return user;
  }

  // Создание нового пользователя
  public async create(
    administratorId: string | null,
    roleId: string,
    email: string,
    passwordHash: string,
    lastName: string,
    firstName: string,
    patronymic: string | null
  ): Promise<TNewUser> {
    const [newUser] = await db
      .insert(users)
      .values({
        email,
        firstName,
        lastName,
        patronymic,
        passwordHash,
        administratorId,
        roleId,
      })
      .returning();

    return newUser;
  }
}
