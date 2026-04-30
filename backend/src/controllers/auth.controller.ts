import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { User } from '../models/User';
import { AppError } from '../utils/appError';
import { signAccessToken } from '../utils/jwt';

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) {
    throw new AppError('Invalid credentials', 401);
  }

  const matched = await bcrypt.compare(password, user.password);
  if (!matched) {
    throw new AppError('Invalid credentials', 401);
  }

  const accessToken = signAccessToken(user._id.toString());
  res.json({ accessToken, user: { id: user._id, email: user.email, role: user.role } });
};
