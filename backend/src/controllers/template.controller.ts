import { Request, Response } from 'express';
import { TemplateService } from '../services/template.service';

export const createTemplate = async (req: Request, res: Response): Promise<void> => {
  const template = await TemplateService.create(req.body);
  res.status(201).json(template);
};

export const getTemplates = async (req: Request, res: Response): Promise<void> => {
  const templates = await TemplateService.findAll(req.query as { publicOnly?: string; industryId?: string });
  res.json(templates);
};

export const getTemplateById = async (req: Request, res: Response): Promise<void> => {
  const template = await TemplateService.findById(req.params.id);
  res.json(template);
};

export const updateTemplate = async (req: Request, res: Response): Promise<void> => {
  const template = await TemplateService.update(req.params.id, req.body);
  res.json(template);
};

export const deleteTemplate = async (req: Request, res: Response): Promise<void> => {
  await TemplateService.delete(req.params.id);
  res.status(204).send();
};
