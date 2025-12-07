import { db } from '../model';
import { users, roles } from '../model/schema';
import { eq, and, or, like, desc, count, sql } from 'drizzle-orm';
import { hash } from 'bcrypt';
import { createUserSchema, paginationSchema } from '../schemas';
import { generatePassword } from '../utils/password-generator';

export const getUsers = async (limit: number, page: number, search_query?: string) => {
  const validation = paginationSchema.parse({ limit, page, search_query });
  
  const offset = (validation.page - 1) * validation.limit;
  
  let whereConditions = [];
  
  if (validation.search_query) {
    const search = `%${validation.search_query}%`;
    whereConditions.push(
      or(
        like(users.email, search),
        like(users.first_name, search),
        like(users.last_name, search),
        like(users.patronymic || sql`''`, search)
      )
    );
  }

  const userQuery = db
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
    .where(whereConditions.length > 0 ? and(...whereConditions) : undefined)
    .limit(validation.limit)
    .offset(offset)
    .orderBy(desc(users.created_at));

  const countQuery = db
    .select({ count: count() })
    .from(users)
    .innerJoin(roles, eq(users.role_id, roles.id))
    .where(whereConditions.length > 0 ? and(...whereConditions) : undefined);

  const [usersList, [{ count: total }]] = await Promise.all([userQuery, countQuery]);

  return {
    users: usersList.map(user => ({
      id: user.id,
      role: user.role.title,
      full_name: `${user.last_name} ${user.first_name} ${user.patronymic || ''}`.trim(),
      email: user.email,
      created_at: Math.floor(user.created_at.getTime() / 1000),
      updated_at: Math.floor(user.updated_at.getTime() / 1000),
    })),
    page: {
      page: validation.page,
      limit: validation.limit,
      total: Number(total),
      total_pages: Math.ceil(Number(total) / validation.limit),
    },
  };
};

export const getUser = async (id: string) => {
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
    .where(eq(users.id, id));

  if (!user) {
    throw new Error('User not found');
  }

  return {
    id: user.id,
    role: user.role.title,
    full_name: `${user.last_name} ${user.first_name} ${user.patronymic || ''}`.trim(),
    email: user.email,
    created_at: Math.floor(user.created_at.getTime() / 1000),
    updated_at: Math.floor(user.updated_at.getTime() / 1000),
  };
};

export const createUser = async (
  last_name: string,
  first_name: string,
  patronymic: string | undefined,
  email: string
) => {
  const validation = createUserSchema.parse({
    last_name,
    first_name,
    patronymic,
    email,
  });

  const [existingUser] = await db
    .select()
    .from(users)
    .where(eq(users.email, validation.email));

  if (existingUser) {
    throw new Error('User already exists');
  }

  const [recruiterRole] = await db
    .select()
    .from(roles)
    .where(eq(roles.title, 'Рекрутер'));

  if (!recruiterRole) {
    throw new Error('Default role not found');
  }

  const generatedPassword = generatePassword(12);
  const passwordHash = await hash(generatedPassword, 10);

  const [newUser] = await db
    .insert(users)
    .values({
      last_name: validation.last_name,
      first_name: validation.first_name,
      patronymic: validation.patronymic || null,
      email: validation.email,
      password_hash: passwordHash,
      role_id: recruiterRole.id,
    })
    .returning();

  // In production, you would send the password to the user via email
  console.log(`Generated password for ${newUser.email}: ${generatedPassword}`);

  const userWithRole = await getUser(newUser.id);
  return userWithRole;
};

export const deleteUser = async (id: string) => {
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.id, id));

  if (!user) {
    throw new Error('User not found');
  }

  await db.delete(users).where(eq(users.id, id));
  return {};
};