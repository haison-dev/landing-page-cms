import { Router } from 'express';
import { requireAdmin } from '../middlewares/auth';
import { validate } from '../middlewares/validate';
import { landingPageSchema } from '../utils/schemas';
import { asyncHandler } from '../utils/appError';
import {
  createLandingPage,
  deleteLandingPage,
  getLandingPageById,
  getLandingPageBySlug,
  getLandingPages,
  publishLandingPage,
  unpublishLandingPage,
  updateLandingPage
} from '../controllers/landing-page.controller';

const router = Router();

router.get('/', asyncHandler(getLandingPages));
router.get('/slug/:slug', asyncHandler(getLandingPageBySlug));
router.get('/:id', asyncHandler(getLandingPageById));
router.post('/', requireAdmin, validate(landingPageSchema), asyncHandler(createLandingPage));
router.put('/:id', requireAdmin, validate(landingPageSchema), asyncHandler(updateLandingPage));
router.delete('/:id', requireAdmin, asyncHandler(deleteLandingPage));
router.patch('/:id/publish', requireAdmin, asyncHandler(publishLandingPage));
router.patch('/:id/unpublish', requireAdmin, asyncHandler(unpublishLandingPage));

export default router;
