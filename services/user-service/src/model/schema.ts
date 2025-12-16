import { z } from "zod";
import {
  DEFAULT_LIMIT,
  DEFAULT_PAGE,
  MAX_LIMIT,
  MIN_FIRST_NAME_LENGTH,
  MIN_LAST_NAME_LENGTH,
  MIN_LIMIT,
  MIN_PAGE,
  MIN_PASSWORD_LENGTH,
} from "./consts";
import { ERole } from "./types";

export const loginSchema = z.object({
  email: z.email("Invalid email format"),
  password: z
    .string()
    .min(
      MIN_PASSWORD_LENGTH,
      `Password must be at least ${MIN_PASSWORD_LENGTH} characters`
    ),
});

export const registerSchema = z.object({
  lastName: z.string().min(MIN_LAST_NAME_LENGTH, "Last name is required"),
  firstName: z.string().min(MIN_FIRST_NAME_LENGTH, "First name is required"),
  patronymic: z.string().nullable(),
  email: z.email("Invalid email format"),
  password: z
    .string()
    .min(
      MIN_PASSWORD_LENGTH,
      `Password must be at least ${MIN_PASSWORD_LENGTH} characters`
    ),
  roleName: z.enum(ERole),
});

export const createUserSchema = z.object({
  lastName: z.string().min(MIN_LAST_NAME_LENGTH, "Last name is required"),
  firstName: z.string().min(MIN_FIRST_NAME_LENGTH, "First name is required"),
  patronymic: z.string().nullable(),
  email: z.email("Invalid email format"),
});

export const updatedUserSchema = z.object({
  lastName: z
    .string()
    .min(MIN_LAST_NAME_LENGTH, "Last name is required")
    .optional(),
  firstName: z
    .string()
    .min(MIN_FIRST_NAME_LENGTH, "First name is required")
    .optional(),
  patronymic: z.string().optional().nullable(),
  email: z.email("Invalid email format").optional(),
});

export const paginationSchema = z.object({
  limit: z.number().min(MIN_LIMIT).max(MAX_LIMIT).default(DEFAULT_LIMIT),
  page: z.number().min(MIN_PAGE).default(DEFAULT_PAGE),
  searchQuery: z.string().optional(),
});
