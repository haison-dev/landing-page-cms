import multer from 'multer';
import { AppError } from '../utils/appError';

const allowedMimes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

export const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (!allowedMimes.includes(file.mimetype)) {
      cb(new AppError('Invalid image format', 400));
      return;
    }
    cb(null, true);
  }
});
