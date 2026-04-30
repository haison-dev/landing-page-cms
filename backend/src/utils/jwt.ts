import jwt from 'jsonwebtoken';
import { env } from '../config/env';

export const signAccessToken = (userId: string): string => {
  return jwt.sign({ userId }, env.ACCESS_TOKEN_SECRET, { expiresIn: '7d' });
};
