import { Request, Response } from 'express';
import { IndustryService } from '../services/industry.service';

export const createIndustry = async (req: Request, res: Response): Promise<void> => {
  const industry = await IndustryService.create(req.body);
  res.status(201).json(industry);
};

export const getIndustries = async (req: Request, res: Response): Promise<void> => {
  const industries = await IndustryService.findAll(req.query as { publicOnly?: string; status?: string });
  res.json(industries);
};

export const getIndustryById = async (req: Request, res: Response): Promise<void> => {
  const industry = await IndustryService.findById(req.params.id);
  res.json(industry);
};

export const getIndustryBySlug = async (req: Request, res: Response): Promise<void> => {
  const industry = await IndustryService.findBySlug(req.params.slug);
  res.json(industry);
};

export const updateIndustry = async (req: Request, res: Response): Promise<void> => {
  const industry = await IndustryService.update(req.params.id, req.body);
  res.json(industry);
};

export const deleteIndustry = async (req: Request, res: Response): Promise<void> => {
  await IndustryService.delete(req.params.id);
  res.status(204).send();
};
