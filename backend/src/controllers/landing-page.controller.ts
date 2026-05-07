import { Request, Response } from 'express';
import { LandingPageService } from '../services/landing-page.service';

export const createLandingPage = async (req: Request, res: Response): Promise<void> => {
  const landingPage = await LandingPageService.create(req.body);
  res.status(201).json(landingPage);
};

export const getLandingPages = async (req: Request, res: Response): Promise<void> => {
  const result = await LandingPageService.findAll(req.query);
  res.json(result);
};

export const getLandingPageById = async (req: Request, res: Response): Promise<void> => {
  const landingPage = await LandingPageService.findById(req.params.id);
  res.json(landingPage);
};

export const getLandingPageBySlug = async (req: Request, res: Response): Promise<void> => {
  const landingPage = await LandingPageService.findBySlug(req.params.slug);
  res.json(landingPage);
};

export const updateLandingPage = async (req: Request, res: Response): Promise<void> => {
  const landingPage = await LandingPageService.update(req.params.id, req.body);
  res.json(landingPage);
};

export const deleteLandingPage = async (req: Request, res: Response): Promise<void> => {
  await LandingPageService.delete(req.params.id);
  res.status(204).send();
};

export const publishLandingPage = async (req: Request, res: Response): Promise<void> => {
  const landingPage = await LandingPageService.updateStatus(req.params.id, 'published');
  res.json(landingPage);
};

export const unpublishLandingPage = async (req: Request, res: Response): Promise<void> => {
  const landingPage = await LandingPageService.updateStatus(req.params.id, 'draft');
  res.json(landingPage);
};
