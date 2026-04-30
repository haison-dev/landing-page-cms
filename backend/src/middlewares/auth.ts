import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { AppError } from '../utils/appError';

export interface AuthRequest extends Request {
  userId?: string;
}

export const requireAdmin = (req: AuthRequest, _res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    throw new AppError('Unauthorized', 401);
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, env.ACCESS_TOKEN_SECRET) as { userId: string };
    req.userId = payload.userId;
    next();
  } catch {
    throw new AppError('Invalid token', 401);
  }
};
