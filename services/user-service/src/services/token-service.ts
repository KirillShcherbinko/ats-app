import { TokenRepository } from "./../repository/token-repository";
import jwt from "jsonwebtoken";

import {
  ACCESS_TOKEN_EXPIRATION,
  REFRESH_TOKEN_EXPIRATION,
} from "@/model/consts";
import { BadRequestError } from "@/error/bad-request";
import { TJWTPayload } from "@/types/common";
import { TToken } from "@/types/db";
import {
  TGenerateTokensResponse,
  TValidateTokenResponse,
} from "@/types/responses";

////////// Сервис для работы с токенами //////////
export class TokenService {
  private tokenRepository = new TokenRepository();

  // Генерация токенов
  public generateTokens(payload: TJWTPayload): TGenerateTokensResponse {
    const { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } = process.env;
    if (!JWT_ACCESS_SECRET || !JWT_REFRESH_SECRET) {
      throw new BadRequestError("Invalid token secret");
    }

    const accessToken = jwt.sign(payload, JWT_ACCESS_SECRET, {
      expiresIn: ACCESS_TOKEN_EXPIRATION,
    });
    const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, {
      expiresIn: REFRESH_TOKEN_EXPIRATION,
    });

    return { accessToken, refreshToken };
  }

  // Валидация access токена
  public validateAccessToken(token: string): TValidateTokenResponse {
    try {
      const { JWT_ACCESS_SECRET } = process.env;
      if (!JWT_ACCESS_SECRET) {
        throw new Error("Refresh secret not configured");
      }

      const decoded = jwt.verify(token, JWT_ACCESS_SECRET);
      if (typeof decoded === "object" && decoded.userId && decoded.role) {
        return { userId: decoded.userId, role: decoded.role };
      }
      return null;
    } catch {
      return null;
    }
  }

  // Валидация refresh токена
  public validateRefreshToken(token: string): TValidateTokenResponse {
    try {
      const { JWT_REFRESH_SECRET } = process.env;
      if (!JWT_REFRESH_SECRET) {
        throw new Error("Refresh secret not configured");
      }

      const decoded = jwt.verify(token, JWT_REFRESH_SECRET);
      if (typeof decoded === "object" && decoded.userId && decoded.role) {
        return { userId: decoded.userId, role: decoded.role };
      }
      return null;
    } catch {
      return null;
    }
  }

  // Создание токена
  public async saveToken(userId: string, refreshToken: string): Promise<void> {
    const token = await this.tokenRepository.findOneByUserId(userId);
    if (token) {
      await this.tokenRepository.update(token.id, refreshToken);
      return;
    }
    await this.tokenRepository.create(userId, refreshToken);
  }

  // Получение токена
  public async getToken(refreshToken: string): Promise<TToken> {
    return await this.tokenRepository.findOneByRefreshToken(refreshToken);
  }

  // Удаление токена
  public async deleteToken(refreshToken: string): Promise<void> {
    await this.tokenRepository.delete(refreshToken);
  }
}
