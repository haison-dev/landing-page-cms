import { Router } from 'express';
import { requireAdmin } from '../middlewares/auth';
import { upload } from '../middlewares/upload';
import { asyncHandler } from '../utils/appError';
import { deleteImage, getImages, replaceImage, uploadImage } from '../controllers/upload.controller';

const router = Router();

router.get('/images', requireAdmin, asyncHandler(getImages));
router.post('/image', requireAdmin, upload.single('image'), asyncHandler(uploadImage));
router.put('/image/:publicId(*)', requireAdmin, upload.single('image'), asyncHandler(replaceImage));
router.delete('/image/:publicId(*)', requireAdmin, asyncHandler(deleteImage));

export default router;
