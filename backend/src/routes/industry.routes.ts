import { Router } from 'express';
import { requireAdmin } from '../middlewares/auth';
import { validate } from '../middlewares/validate';
import { industrySchema } from '../utils/schemas';
import { asyncHandler } from '../utils/appError';
import {
  createIndustry,
  deleteIndustry,
  getIndustries,
  getIndustryById,
  getIndustryBySlug,
  updateIndustry
} from '../controllers/industry.controller';

const router = Router();

router.get('/', asyncHandler(getIndustries));
router.get('/slug/:slug', asyncHandler(getIndustryBySlug));
router.get('/:id', asyncHandler(getIndustryById));
router.post('/', requireAdmin, validate(industrySchema), asyncHandler(createIndustry));
router.put('/:id', requireAdmin, validate(industrySchema), asyncHandler(updateIndustry));
router.delete('/:id', requireAdmin, asyncHandler(deleteIndustry));

export default router;
