import dotenv from 'dotenv';
import path from 'path';
import { z } from 'zod';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });
dotenv.config({ path: path.resolve(process.cwd(), '..', '.env') });

type NodeEnv = 'development' | 'production' | 'test';

const nonPlaceholder = (label: string) =>
  z
    .string()
    .min(1)
    .refine((v) => !v.startsWith('YOUR_NEW_'), `${label} is still placeholder`);

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().default(5000),
  CLIENT_URL: z.string().url(),
  MONGODB_URI: z.string().min(1),
  ACCESS_TOKEN_SECRET: z.string().min(16),
  ADMIN_EMAIL: z.string().email(),
  ADMIN_PASSWORD: z.string().min(6),
  CLOUDINARY_CLOUD_NAME: z.string().min(1),
  CLOUDINARY_API_KEY: nonPlaceholder('CLOUDINARY_API_KEY'),
  CLOUDINARY_API_SECRET: nonPlaceholder('CLOUDINARY_API_SECRET')
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('Invalid environment variables', parsed.error.flatten().fieldErrors);
  process.exit(1);
}

export const env = parsed.data as typeof parsed.data & { NODE_ENV: NodeEnv };
