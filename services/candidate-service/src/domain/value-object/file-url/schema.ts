import { z } from 'zod';

export const fileUrlSchema = z.url().max(2048);