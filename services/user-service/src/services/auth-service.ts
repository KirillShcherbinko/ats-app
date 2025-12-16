import { AuthRepository } from "./../repository/auth-repository";
import { compare, hash } from "bcrypt";
import { TokenService } from "./token-service";
import { loginSchema, registerSchema } from "@/model/schema";
import { AlreadyExistsError } from "@/error/already-exists";
import { HASH_LEVEL, NUMERIC_EXPIRATION } from "@/model/consts";
import { BadRequestError } from "@/error/bad-request";
import { NotFoundError } from "@/error/not-found";
import {
  ERole,
  TAuthReponse,
  TLoginResponse,
  TLogoutResponse,
  TRefreshResponse,
  TRegisterResponse,
  TUserWithRoleData,
} from "@/model/types";

export class AuthService {
  private authRepository = new AuthRepository();
  private tokenService = new TokenService();

  // Генерация токенов и возврат данных
  private async generateTokensAndReturnData(
    user: TUserWithRoleData
  ): Promise<TAuthReponse> {
    const { accessToken, refreshToken } = this.tokenService.generateTokens({
      userId: user.id,
      role: user.role.title,
    });

    await this.tokenService.saveToken(user.id, refreshToken);

    return {
      accessToken,
      refreshToken,
      expiresIn: NUMERIC_EXPIRATION,
      user: {
        id: user.id,
        role: user.role.title,
        fullName: `${user.lastName} ${user.firstName} ${
          user.patronymic || ""
        }`.trim(),
        email: user.email,
        createdAt: Math.floor(user.createdAt.getTime() / 1000),
        updatedAt: Math.floor(user.updatedAt.getTime() / 1000),
      },
    };
  }

  // Вход пользователя в систему
  public async login(email: string, password: string): Promise<TLoginResponse> {
    loginSchema.parse({ email, password });

    const user = await this.authRepository.findOneByEmail(email);

    if (!user) {
      throw new NotFoundError(`User with email ${email} doesn't exist`);
    }

    const isPasswordValid = await compare(password, user.passwordHash);
    if (!isPasswordValid) {
      throw new BadRequestError("Invalid password");
    }

    return await this.generateTokensAndReturnData(user);
  }

  // Регистрация пользователя
  public async register(
    email: string,
    password: string,
    lastName: string,
    firstName: string,
    patronymic: string | null,
    roleName: ERole
  ): Promise<TRegisterResponse> {
    registerSchema.parse({
      lastName,
      firstName,
      patronymic,
      email,
      password,
      roleName,
    });

    const isExists = await this.authRepository.isExists(email);
    if (isExists) {
      throw new AlreadyExistsError(`User with email ${email} already exists`);
    }

    const passwordHash = await hash(password, HASH_LEVEL);
    const role = await this.authRepository.getRole(roleName);

    const newUser = await this.authRepository.create(
      null,
      role.id,
      email,
      passwordHash,
      lastName,
      firstName,
      patronymic
    );

    if (!newUser.id || !newUser.createdAt || !newUser.updatedAt) {
      throw new Error("Invalid Server Response");
    }

    const userWithRole: TUserWithRoleData = {
      id: newUser.id,
      email: newUser.email,
      lastName: newUser.lastName,
      firstName: newUser.firstName,
      patronymic: newUser.patronymic || null,
      createdAt: newUser.createdAt,
      updatedAt: newUser.updatedAt,
      role: {
        title: roleName,
      },
    };

    return await this.generateTokensAndReturnData(userWithRole);
  }

  // Выход пользователя из системы
  public async logout(refreshToken: string): Promise<TLogoutResponse> {
    await this.tokenService.deleteToken(refreshToken);
  }

  // Обнолвение access токена
  public async refresh(refreshToken: string): Promise<TRefreshResponse> {
    const token = await this.tokenService.getToken(refreshToken);
    if (!token) {
      throw new Error("No refresh token");
    }

    const decoded = this.tokenService.validateRefreshToken(refreshToken);
    if (!decoded) {
      throw new Error("Invalid refresh token");
    }

    const user = await this.authRepository.findOne(decoded.userId);

    return await this.generateTokensAndReturnData(user);
  }
}
