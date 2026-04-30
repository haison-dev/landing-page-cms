import { Router } from 'express';
import { requireAdmin } from '../middlewares/auth';
import { validate } from '../middlewares/validate';
import { templateSchema } from '../utils/schemas';
import { asyncHandler } from '../utils/appError';
import {
  createTemplate,
  deleteTemplate,
  getTemplateById,
  getTemplates,
  updateTemplate
} from '../controllers/template.controller';

const router = Router();

router.get('/', asyncHandler(getTemplates));
router.get('/:id', asyncHandler(getTemplateById));
router.post('/', requireAdmin, validate(templateSchema), asyncHandler(createTemplate));
router.put('/:id', requireAdmin, validate(templateSchema), asyncHandler(updateTemplate));
router.delete('/:id', requireAdmin, asyncHandler(deleteTemplate));

export default router;
