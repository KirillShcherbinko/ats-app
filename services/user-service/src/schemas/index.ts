import { z } from 'zod';

export const loginSchema = z.object({
  email: z.email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const registerSchema = z.object({
  last_name: z.string().min(1, 'Last name is required'),
  first_name: z.string().min(1, 'First name is required'),
  patronymic: z.string().optional(),
  email: z.email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const createUserSchema = z.object({
  last_name: z.string().min(1, 'Last name is required'),
  first_name: z.string().min(1, 'First name is required'),
  patronymic: z.string().optional(),
  email: z.email('Invalid email format'),
});

export const paginationSchema = z.object({
  limit: z.number().min(1).max(100).default(10),
  page: z.number().min(1).default(1),
  search_query: z.string().optional(),
});

export const validateUser = (email: string, password?: string) => {
  if (!email || !email.includes('@')) {
    throw new Error('Invalid email');
  }
  if (password && password.length < 6) {
    throw new Error('Password must be at least 6 characters');
  }
};