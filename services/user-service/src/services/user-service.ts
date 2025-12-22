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
import { DEFAULT_PASSWORD_LENGTH, HASH_LEVEL } from "@/model/consts";
import { TUserWithRoleData, TUserData, ERole } from "@/types/common";
import { TUser, TNewUser } from "@/types/db";
import {
  TGetUsersResponse,
  TGetUserResponse,
  TCreateUserResponse,
  TUpdateUserResponse,
  TDeleteUserResponse,
} from "@/types/responses";

////////// Сервис для работы с сотрудниками //////////
export class UserService {
  private userRepository = new UserRepository();

  // Возврат данных
  private async returnUserData(
    user: TUserWithRoleData | TUser | TNewUser
  ): Promise<TUserData> {
    if (!user.id || !user.createdAt || !user.updatedAt) {
      throw new Error("Invalid Server Response");
    }

    const roleName: ERole = !("role" in user)
      ? await this.userRepository.getRoleById(user.roleId)
      : user.role.title;

    return {
      id: user.id,
      role: roleName,
      fullName: `${user.lastName} ${user.firstName} ${
        user.patronymic || ""
      }`.trim(),
      email: user.email,
      createdAt: user.createdAt.getTime(),
      updatedAt: user.updatedAt.getTime(),
    };
  }

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
      users: await Promise.all(
        userList.map((user) => this.returnUserData(user))
      ),
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

    return await this.returnUserData(user);
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

    const user = await this.userRepository.create(
      administratorId,
      role.id,
      email,
      passwordHash,
      lastName,
      firstName,
      patronymic
    );

    return await this.returnUserData(user);
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

    const user = await this.userRepository.update(
      id,
      email,
      lastName,
      firstName,
      patronymic
    );

    return await this.returnUserData(user);
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
