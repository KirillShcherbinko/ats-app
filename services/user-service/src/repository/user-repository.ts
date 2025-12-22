import { roles, users } from "@/db/schema";
import { and, count, desc, eq, like, or, sql, SQL } from "drizzle-orm";
import { BaseRepository } from "./base-repository";
import { TUserWithRoleData } from "@/types/common";

////////// Репозиторий для запросов для сотрудников //////////
export class UserRepository extends BaseRepository {
  private whereConditions: SQL<unknown>[] = [];

  // Получение условий для пользователей
  private setWhereConditions(id: string, searchQuery?: string): void {
    if (searchQuery) {
      const search = `%${searchQuery}%`;
      const searchResults = or(
        like(users.email, search),
        like(users.firstName, search),
        like(users.lastName, search),
        like(users.patronymic || sql``, search)
      );

      this.whereConditions = [
        eq(users.administratorId, id),
        searchResults || sql``,
      ];
    }
  }

  // Запрос для подсчёта записей
  public async countRecords(): Promise<number> {
    const [{ count: total }] = await this._db
      .select({ count: count() })
      .from(users)
      .innerJoin(roles, eq(users.roleId, roles.id))
      .where(
        this.whereConditions.length > 0
          ? and(...this.whereConditions)
          : undefined
      );

    return total;
  }

  // Запрос для получения всех пользователей администратора
  public async find(
    id: string,
    limit: number,
    page: number,
    searchQuery?: string
  ): Promise<TUserWithRoleData[]> {
    this.setWhereConditions(id, searchQuery);
    const offset = (page - 1) * limit;

    const userList = await this._db
      .select({
        id: users.id,
        email: users.email,
        firstName: users.firstName,
        lastName: users.lastName,
        patronymic: users.patronymic,
        createdAt: users.createdAt,
        updatedAt: users.updatedAt,
        role: {
          title: roles.title,
        },
      })
      .from(users)
      .innerJoin(roles, eq(users.roleId, roles.id))
      .where(
        this.whereConditions.length > 0
          ? and(...this.whereConditions)
          : undefined
      )
      .limit(limit)
      .offset(offset)
      .orderBy(desc(users.createdAt));

    return userList;
  }

  // Запрос для обновления пользователя
  public async update(
    id: string,
    email?: string,
    lastName?: string,
    firstName?: string,
    patronymic?: string | null
  ) {
    const newData: Record<string, string | null> = {};

    if (email) newData.email = email;
    if (lastName) newData.lastName = lastName;
    if (firstName) newData.firstName = firstName;
    if (patronymic && patronymic !== null) newData.patronymic = patronymic;

    const [updatedUser] = await this._db
      .update(users)
      .set(newData)
      .where(eq(users.id, id))
      .returning();

    return updatedUser;
  }

  // Запрос для удаления пользователя
  public async delete(id: string) {
    await this._db.delete(users).where(eq(users.id, id));
  }
}
