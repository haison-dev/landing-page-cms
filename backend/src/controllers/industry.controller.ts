import { Request, Response } from 'express';
import slugify from 'slugify';
import { Industry } from '../models/Industry';

export const createIndustry = async (req: Request, res: Response): Promise<void> => {
  const payload = { ...req.body, slug: slugify(req.body.slug || req.body.name, { lower: true, strict: true }) };
  const industry = await Industry.create(payload);
  res.status(201).json(industry);
};

export const getIndustries = async (req: Request, res: Response): Promise<void> => {
  const { publicOnly, status } = req.query;
  const filter: Record<string, unknown> = {};

  if (publicOnly === 'true') filter.status = 'active';
  if (status) filter.status = status;

  const industries = await Industry.find(filter).sort({ createdAt: -1 });
  res.json(industries);
};

export const getIndustryById = async (req: Request, res: Response): Promise<void> => {
  const industry = await Industry.findById(req.params.id);
  res.json(industry);
};

export const getIndustryBySlug = async (req: Request, res: Response): Promise<void> => {
  const industry = await Industry.findOne({ slug: req.params.slug });
  res.json(industry);
};

export const updateIndustry = async (req: Request, res: Response): Promise<void> => {
  const payload = { ...req.body };
  if (payload.slug || payload.name) {
    payload.slug = slugify(payload.slug || payload.name, { lower: true, strict: true });
  }
  const industry = await Industry.findByIdAndUpdate(req.params.id, payload, { new: true });
  res.json(industry);
};

export const deleteIndustry = async (req: Request, res: Response): Promise<void> => {
  await Industry.findByIdAndDelete(req.params.id);
  res.status(204).send();
};
