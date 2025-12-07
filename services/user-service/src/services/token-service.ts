import jwt, { JwtPayload } from 'jsonwebtoken';
import { db } from '../model';
import { tokens } from '../model/schema';
import { eq } from 'drizzle-orm';
import { JwtPayload as CustomJwtPayload } from '../types';

export const generateTokens = (payload: { userId: string; role: string }) => {
  const { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } = process.env;
  if (!JWT_ACCESS_SECRET || !JWT_REFRESH_SECRET) {
    throw new Error('Invalid token secret');
  }

  const accessToken = jwt.sign(payload, JWT_ACCESS_SECRET, { expiresIn: '15m' });
  const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: '10h' });

  return { accessToken, refreshToken };
};

export const validateToken = (token: string, secret: string): CustomJwtPayload | null => {
  try {
    const decoded = jwt.verify(token, secret) as JwtPayload;
    if (typeof decoded === 'object' && decoded.userId && decoded.role) {
      return decoded as CustomJwtPayload;
    }
    return null;
  } catch {
    return null;
  }
};

export const saveToken = async (userId: string, refreshToken: string) => {
  await db.insert(tokens).values({ user_id: userId, refresh_token: refreshToken });
};

export const getToken = async (refreshToken: string) => {
  const [token] = await db
    .select()
    .from(tokens)
    .where(eq(tokens.refresh_token, refreshToken));
  return token;
};

export const removeToken = async (refreshToken: string) => {
  await db.delete(tokens).where(eq(tokens.refresh_token, refreshToken));
};

export const removeAllUserTokens = async (userId: string) => {
  await db.delete(tokens).where(eq(tokens.user_id, userId));
};