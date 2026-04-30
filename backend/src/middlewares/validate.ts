import { Request, Response, NextFunction } from 'express';
import { AnyZodObject } from 'zod';
import { AppError } from '../utils/appError';

export const validate = (schema: AnyZodObject) => (req: Request, _res: Response, next: NextFunction): void => {
  const parsed = schema.safeParse({ body: req.body, params: req.params, query: req.query });
  if (!parsed.success) {
    const message = parsed.error.issues.map((i) => i.message).join(', ');
    throw new AppError(message, 422);
  }
  next();
};
