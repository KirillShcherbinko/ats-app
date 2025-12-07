import { compare, hash } from 'bcrypt';
import { db } from '../model';
import { users, roles } from '../model/schema';
import { eq } from 'drizzle-orm';
import {
  generateTokens,
  getToken,
  removeToken,
  saveToken,
  validateToken,
  removeAllUserTokens,
} from './token-service';
import { loginSchema, registerSchema } from '../schemas';

export const login = async (email: string, password: string) => {
  const validation = loginSchema.parse({ email, password });
  
  const [user] = await db
    .select({
      id: users.id,
      email: users.email,
      password_hash: users.password_hash,
      first_name: users.first_name,
      last_name: users.last_name,
      patronymic: users.patronymic,
      role_id: users.role_id,
      created_at: users.created_at,
      updated_at: users.updated_at,
      role: {
        id: roles.id,
        title: roles.title,
      },
    })
    .from(users)
    .innerJoin(roles, eq(users.role_id, roles.id))
    .where(eq(users.email, validation.email));

  if (!user) {
    throw new Error('Invalid email');
  }

  const isPasswordValid = await compare(password, user.password_hash);
  if (!isPasswordValid) {
    throw new Error('Invalid password');
  }

  const { accessToken, refreshToken } = generateTokens({
    userId: user.id,
    role: user.role.title,
  });

  await saveToken(user.id, refreshToken);

  return {
    access_token: accessToken,
    refresh_token: refreshToken,
    expires_in: 15 * 60, // 15 minutes in seconds
    user: {
      id: user.id,
      role: user.role.title,
      full_name: `${user.last_name} ${user.first_name} ${user.patronymic || ''}`.trim(),
      email: user.email,
      created_at: Math.floor(user.created_at.getTime() / 1000),
      updated_at: Math.floor(user.updated_at.getTime() / 1000),
    },
  };
};

export const register = async (
  last_name: string,
  first_name: string,
  patronymic: string | undefined,
  email: string,
  password: string
) => {
  const validation = registerSchema.parse({
    last_name,
    first_name,
    patronymic,
    email,
    password,
  });

  const [existingUser] = await db
    .select()
    .from(users)
    .where(eq(users.email, validation.email));

  if (existingUser) {
    throw new Error('User already exists');
  }

  const [adminRole] = await db
    .select()
    .from(roles)
    .where(eq(roles.title, 'Администратор'));

  if (!adminRole) {
    throw new Error('Default role not found');
  }

  const passwordHash = await hash(password, 10);

  const [newUser] = await db
    .insert(users)
    .values({
      last_name: validation.last_name,
      first_name: validation.first_name,
      patronymic: validation.patronymic || null,
      email: validation.email,
      password_hash: passwordHash,
      role_id: adminRole.id,
    })
    .returning();

  const { accessToken, refreshToken } = generateTokens({
    userId: newUser.id,
    role: 'Администратор',
  });

  await saveToken(newUser.id, refreshToken);

  return {
    access_token: accessToken,
    refresh_token: refreshToken,
    expires_in: 15 * 60,
    user: {
      id: newUser.id,
      role: 'Администратор',
      full_name: `${newUser.last_name} ${newUser.first_name} ${newUser.patronymic || ''}`.trim(),
      email: newUser.email,
      created_at: Math.floor(newUser.created_at.getTime() / 1000),
      updated_at: Math.floor(newUser.updated_at.getTime() / 1000),
    },
  };
};

export const logout = async (refreshToken: string) => {
  await removeToken(refreshToken);
};

export const refresh = async (refreshToken: string) => {
  const tokenData = await getToken(refreshToken);
  if (!tokenData) {
    throw new Error('No refresh token');
  }

  const { JWT_REFRESH_SECRET } = process.env;
  if (!JWT_REFRESH_SECRET) {
    throw new Error('Refresh secret not configured');
  }

  const decoded = validateToken(refreshToken, JWT_REFRESH_SECRET);
  if (!decoded) {
    throw new Error('Invalid refresh token');
  }

  const [user] = await db
    .select({
      id: users.id,
      email: users.email,
      first_name: users.first_name,
      last_name: users.last_name,
      patronymic: users.patronymic,
      created_at: users.created_at,
      updated_at: users.updated_at,
      role: {
        title: roles.title,
      },
    })
    .from(users)
    .innerJoin(roles, eq(users.role_id, roles.id))
    .where(eq(users.id, decoded.userId));

  if (!user) {
    throw new Error('User not found');
  }

  const { accessToken, refreshToken: newRefreshToken } = generateTokens({
    userId: decoded.userId,
    role: user.role.title,
  });

  await removeToken(refreshToken);
  await saveToken(decoded.userId, newRefreshToken);

  return {
    access_token: accessToken,
    refresh_token: newRefreshToken,
    expires_in: 15 * 60,
    user: {
      id: user.id,
      role: user.role.title,
      full_name: `${user.last_name} ${user.first_name} ${user.patronymic || ''}`.trim(),
      email: user.email,
      created_at: Math.floor(user.created_at.getTime() / 1000),
      updated_at: Math.floor(user.updated_at.getTime() / 1000),
    },
  };
};

export const validateAccessToken = async (token: string, secret: string) => {
  const decoded = validateToken(token, secret);
  if (!decoded) {
    return { result: { null: true } };
  }

  return {
    result: {
      success: {
        user_id: decoded.userId,
        role: decoded.role,
      },
    },
  };
};