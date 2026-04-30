import { Request, Response } from 'express';
import { cloudinary } from '../config/cloudinary';
import { AppError } from '../utils/appError';

type CloudinaryResource = {
  public_id: string;
  secure_url: string;
  width: number;
  height: number;
  format: string;
  created_at: string;
};

export const uploadImage = async (req: Request, res: Response): Promise<void> => {
  if (!req.file) {
    throw new AppError('Image is required', 400);
  }
  const file = req.file;

  const uploaded = await new Promise<{ secure_url: string; public_id: string }>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: 'landing-page-cms', resource_type: 'image' },
      (error, result) => {
        if (error || !result) {
          reject(error || new Error('Upload failed'));
          return;
        }
        resolve({ secure_url: result.secure_url, public_id: result.public_id });
      }
    );

    stream.end(file.buffer);
  });

  res.status(201).json({ url: uploaded.secure_url, publicId: uploaded.public_id });
};

export const getImages = async (req: Request, res: Response): Promise<void> => {
  const maxResults = Number(req.query.limit) || 50;
  const nextCursor = typeof req.query.nextCursor === 'string' ? req.query.nextCursor : undefined;

  const response = await cloudinary.api.resources({
    type: 'upload',
    resource_type: 'image',
    prefix: 'landing-page-cms/',
    max_results: maxResults,
    next_cursor: nextCursor
  });

  const items = (response.resources as CloudinaryResource[]).map((r) => ({
    publicId: r.public_id,
    url: r.secure_url,
    width: r.width,
    height: r.height,
    format: r.format,
    createdAt: r.created_at
  }));

  res.json({ items, nextCursor: response.next_cursor || null });
};

export const deleteImage = async (req: Request, res: Response): Promise<void> => {
  const publicId = decodeURIComponent(req.params.publicId || '');
  if (!publicId) throw new AppError('publicId is required', 400);

  await cloudinary.uploader.destroy(publicId, { resource_type: 'image', invalidate: true });
  res.status(204).send();
};

export const replaceImage = async (req: Request, res: Response): Promise<void> => {
  const publicId = decodeURIComponent(req.params.publicId || '');
  if (!publicId) throw new AppError('publicId is required', 400);
  if (!req.file) throw new AppError('Image is required', 400);
  const file = req.file;

  const uploaded = await new Promise<{ secure_url: string; public_id: string }>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        public_id: publicId,
        overwrite: true,
        invalidate: true,
        resource_type: 'image'
      },
      (error, result) => {
        if (error || !result) {
          reject(error || new Error('Replace failed'));
          return;
        }
        resolve({ secure_url: result.secure_url, public_id: result.public_id });
      }
    );

    stream.end(file.buffer);
  });

  res.json({ url: uploaded.secure_url, publicId: uploaded.public_id });
};
