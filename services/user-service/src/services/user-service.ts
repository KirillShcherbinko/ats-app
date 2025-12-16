import { hash } from "bcrypt";
import {
  createUserSchema,
  paginationSchema,
  updatedUserSchema,
} from "@/model/schema";
import { generatePassword } from "@/utils/password-generator";
import { UserRepository } from "@/repository/user-repository";
import { AlreadyExistsError } from "@/error/already-exists";
import { NotFoundError } from "@/error/not-found";
import {
  ERole,
  TCreateUserResponse,
  TDeleteUserResponse,
  TGetUserResponse,
  TGetUsersResponse,
  TUpdateUserResponse,
} from "@/model/types";
import { DEFAULT_PASSWORD_LENGTH, HASH_LEVEL } from "@/model/consts";

////////// Сервис для работы с сотрудниками //////////
export class UserService {
  private userRepository = new UserRepository();

  // Получение всех сотрудника администратора
  public async getUsers(
    id: string,
    limit: number,
    page: number,
    searchQuery?: string
  ): Promise<TGetUsersResponse> {
    paginationSchema.parse({ limit, page, searchQuery });

    const userList = await this.userRepository.find(
      id,
      limit,
      page,
      searchQuery
    );
    const total = await this.userRepository.countRecords();

    return {
      users: userList.map((user) => ({
        id: user.id,
        role: user.role.title,
        fullName: `${user.lastName} ${user.firstName} ${
          user.patronymic || ""
        }`.trim(),
        email: user.email,
        createdAt: Math.floor(user.createdAt.getTime() / 1000),
        updatedAt: Math.floor(user.updatedAt.getTime() / 1000),
      })),
      pageData: {
        page,
        limit,
        total,
        totalPages: Math.ceil(Number(total) / limit),
      },
    };
  }

  // Получение одного пользователя
  public async getUser(id: string): Promise<TGetUserResponse> {
    const user = await this.userRepository.findOne(id);

    if (!user) {
      throw new NotFoundError(`User with id ${id} not found`);
    }

    return {
      id: user.id,
      role: user.role.title,
      fullName: `${user.lastName} ${user.firstName} ${
        user.patronymic || ""
      }`.trim(),
      email: user.email,
      createdAt: Math.floor(user.createdAt.getTime() / 1000),
      updatedAt: Math.floor(user.updatedAt.getTime() / 1000),
    };
  }

  // Создание пользователя
  public async createUser(
    administratorId: string,
    email: string,
    lastName: string,
    firstName: string,
    roleName: ERole,
    patronymic: string | null
  ): Promise<TCreateUserResponse> {
    createUserSchema.parse({ email, lastName, firstName, patronymic });

    const isExists = await this.userRepository.isExists(email);

    if (isExists) {
      throw new AlreadyExistsError(`User with email ${email} already exists`);
    }

    const generatedPassword = generatePassword(DEFAULT_PASSWORD_LENGTH);
    const passwordHash = await hash(generatedPassword, HASH_LEVEL);

    const role = await this.userRepository.getRole(roleName);

    return await this.userRepository.create(
      administratorId,
      role.id,
      email,
      passwordHash,
      lastName,
      firstName,
      patronymic
    );
  }

  public async updateUser(
    id: string,
    email?: string,
    lastName?: string,
    firstName?: string,
    patronymic?: string | null
  ): Promise<TUpdateUserResponse> {
    updatedUserSchema.parse({ email, lastName, firstName, patronymic });

    const isExists = this.userRepository.isExists(id);

    if (!isExists) {
      throw new NotFoundError(`User with id ${id} not found`);
    }

    return await this.userRepository.update(
      id,
      email,
      lastName,
      firstName,
      patronymic
    );
  }

  // Удаление пользователя
  public async deleteUser(id: string): Promise<TDeleteUserResponse> {
    const isExists = this.userRepository.isExists(id);

    if (!isExists) {
      throw new NotFoundError(`User with id ${id} not found`);
    }

    await this.userRepository.delete(id);
  }
}
