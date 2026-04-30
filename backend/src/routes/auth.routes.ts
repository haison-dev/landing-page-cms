import { Router } from 'express';
import { asyncHandler } from '../utils/appError';
import { login } from '../controllers/auth.controller';
import { validate } from '../middlewares/validate';
import { loginSchema } from '../utils/schemas';

const router = Router();
router.post('/login', validate(loginSchema), asyncHandler(login));

export default router;
