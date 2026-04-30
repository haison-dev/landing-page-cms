import { Request, Response } from 'express';
import slugify from 'slugify';
import { Template } from '../models/Template';

export const createTemplate = async (req: Request, res: Response): Promise<void> => {
  const payload = { ...req.body, slug: slugify(req.body.slug || req.body.name, { lower: true, strict: true }) };
  const template = await Template.create(payload);
  res.status(201).json(template);
};

export const getTemplates = async (req: Request, res: Response): Promise<void> => {
  const { publicOnly, industryId } = req.query;
  const filter: Record<string, unknown> = {};
  if (publicOnly === 'true') filter.status = 'active';
  if (industryId) filter.industryId = industryId;
  const templates = await Template.find(filter).populate('industryId').sort({ createdAt: -1 });
  res.json(templates);
};

export const getTemplateById = async (req: Request, res: Response): Promise<void> => {
  const template = await Template.findById(req.params.id).populate('industryId');
  res.json(template);
};

export const updateTemplate = async (req: Request, res: Response): Promise<void> => {
  const payload = { ...req.body };
  if (payload.slug || payload.name) {
    payload.slug = slugify(payload.slug || payload.name, { lower: true, strict: true });
  }
  const template = await Template.findByIdAndUpdate(req.params.id, payload, { new: true });
  res.json(template);
};

export const deleteTemplate = async (req: Request, res: Response): Promise<void> => {
  await Template.findByIdAndDelete(req.params.id);
  res.status(204).send();
};
