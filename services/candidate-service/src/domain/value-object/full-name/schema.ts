import { z } from 'zod';

export const fullNameSchema = z.object({
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  patronymic: z.string().max(100).optional()
});
