import { db } from "@/db";
import { tokens } from "@/db/schema";
import { TNewToken, TToken } from "@/model/types";
import { eq } from "drizzle-orm";

////////// Репозиторий для запросов для токена //////////
export class TokenRepository {
  protected _db = db;

  // Запрос для получения токена по существующему токену
  public async findOneByRefreshToken(refreshToken: string): Promise<TToken> {
    const [token] = await this._db
      .select()
      .from(tokens)
      .where(eq(tokens.refreshToken, refreshToken));

    return token;
  }

  // Запрос получения токена по id пользователя
  public async findOneByUserId(userId: string): Promise<TToken> {
    const [token] = await this._db
      .select()
      .from(tokens)
      .where(eq(tokens.userId, userId));

    return token;
  }

  // Запрос для создания токена
  public async create(
    userId: string,
    refreshToken: string
  ): Promise<TNewToken> {
    const [token] = await this._db
      .insert(tokens)
      .values({ userId, refreshToken });
    return token;
  }

  // Запрос для обновления токена
  public async update(id: string, refreshToken: string): Promise<void> {
    await this._db
      .update(tokens)
      .set({ refreshToken })
      .where(eq(tokens.id, id));
  }

  // Запрос для удаления токена
  public async delete(refreshToken: string): Promise<void> {
    await this._db.delete(tokens).where(eq(tokens.refreshToken, refreshToken));
  }
}
