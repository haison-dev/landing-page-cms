import { Request, Response } from 'express';
import slugify from 'slugify';
import { LandingPage } from '../models/LandingPage';
import { Industry } from '../models/Industry';

export const createLandingPage = async (req: Request, res: Response): Promise<void> => {
  const payload = { ...req.body, slug: slugify(req.body.slug || req.body.title, { lower: true, strict: true }) };
  const landingPage = await LandingPage.create(payload);
  res.status(201).json(landingPage);
};

export const getLandingPages = async (req: Request, res: Response): Promise<void> => {
  const { publicOnly, industryId, industry, search, status, page = '1', limit = '9' } = req.query;
  const filter: Record<string, unknown> = {};

  if (publicOnly === 'true') filter.status = 'published';
  if (status) filter.status = status;

  if (industryId) {
    filter.industryId = industryId;
  }

  if (industry) {
    const industryDoc = await Industry.findOne({ slug: industry });
    filter.industryId = industryDoc?._id;
  }

  if (search) {
    filter.title = { $regex: String(search), $options: 'i' };
  }

  const currentPage = Math.max(1, Number(page) || 1);
  const pageLimit = Math.max(1, Number(limit) || 9);

  const [items, total] = await Promise.all([
    LandingPage.find(filter)
      .populate('industryId')
      .sort({ createdAt: -1 })
      .skip((currentPage - 1) * pageLimit)
      .limit(pageLimit),
    LandingPage.countDocuments(filter)
  ]);

  res.json({
    items,
    pagination: {
      total,
      page: currentPage,
      limit: pageLimit,
      totalPages: Math.ceil(total / pageLimit)
    }
  });
};

export const getLandingPageById = async (req: Request, res: Response): Promise<void> => {
  const landingPage = await LandingPage.findById(req.params.id).populate('industryId');
  res.json(landingPage);
};

export const getLandingPageBySlug = async (req: Request, res: Response): Promise<void> => {
  const landingPage = await LandingPage.findOne({ slug: req.params.slug, status: 'published' }).populate('industryId');
  res.json(landingPage);
};

export const updateLandingPage = async (req: Request, res: Response): Promise<void> => {
  const payload = { ...req.body };
  if (payload.slug || payload.title) {
    payload.slug = slugify(payload.slug || payload.title, { lower: true, strict: true });
  }

  const landingPage = await LandingPage.findByIdAndUpdate(req.params.id, payload, { new: true });
  res.json(landingPage);
};

export const deleteLandingPage = async (req: Request, res: Response): Promise<void> => {
  await LandingPage.findByIdAndDelete(req.params.id);
  res.status(204).send();
};

export const publishLandingPage = async (req: Request, res: Response): Promise<void> => {
  const landingPage = await LandingPage.findByIdAndUpdate(req.params.id, { status: 'published' }, { new: true });
  res.json(landingPage);
};

export const unpublishLandingPage = async (req: Request, res: Response): Promise<void> => {
  const landingPage = await LandingPage.findByIdAndUpdate(req.params.id, { status: 'draft' }, { new: true });
  res.json(landingPage);
};
