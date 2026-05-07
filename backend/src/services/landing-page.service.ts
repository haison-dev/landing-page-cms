import slugify from 'slugify';
import { LandingPage, ILandingPage } from '../models/LandingPage';
import { Industry } from '../models/Industry';
import { AppError } from '../utils/appError';

export class LandingPageService {
  static async create(payload: Partial<ILandingPage>) {
    const data = { ...payload, slug: slugify(payload.slug || payload.title || '', { lower: true, strict: true }) };
    return await LandingPage.create(data);
  }

  static async findAll(query: {
    publicOnly?: string;
    industryId?: string;
    industry?: string;
    search?: string;
    status?: string;
    page?: string;
    limit?: string;
  }) {
    const filter: Record<string, unknown> = {};

    if (query.publicOnly === 'true') filter.status = 'published';
    if (query.status) filter.status = query.status;

    if (query.industryId) {
      filter.industryId = query.industryId;
    }

    if (query.industry) {
      const industryDoc = await Industry.findOne({ slug: query.industry });
      if (industryDoc) {
        filter.industryId = industryDoc._id;
      }
    }

    if (query.search) {
      filter.title = { $regex: String(query.search), $options: 'i' };
    }

    const currentPage = Math.max(1, Number(query.page) || 1);
    const pageLimit = Math.max(1, Number(query.limit) || 9);

    const [items, total] = await Promise.all([
      LandingPage.find(filter)
        .populate('industryId', 'name slug')
        .sort({ createdAt: -1 })
        .skip((currentPage - 1) * pageLimit)
        .limit(pageLimit),
      LandingPage.countDocuments(filter)
    ]);

    return {
      items,
      pagination: {
        total,
        page: currentPage,
        limit: pageLimit,
        totalPages: Math.ceil(total / pageLimit)
      }
    };
  }

  static async findById(id: string) {
    const landingPage = await LandingPage.findById(id).populate('industryId', 'name slug');
    if (!landingPage) throw new AppError('Landing page not found', 404);
    return landingPage;
  }

  static async findBySlug(slug: string) {
    const landingPage = await LandingPage.findOne({ slug, status: 'published' }).populate('industryId', 'name slug');
    if (!landingPage) throw new AppError('Landing page not found', 404);
    return landingPage;
  }

  static async update(id: string, payload: Partial<ILandingPage>) {
    const data = { ...payload };
    if (data.slug || data.title) {
      data.slug = slugify(data.slug || data.title || '', { lower: true, strict: true });
    }

    const landingPage = await LandingPage.findByIdAndUpdate(id, data, { new: true });
    if (!landingPage) throw new AppError('Landing page not found', 404);
    return landingPage;
  }

  static async delete(id: string) {
    const landingPage = await LandingPage.findByIdAndDelete(id);
    if (!landingPage) throw new AppError('Landing page not found', 404);
  }

  static async updateStatus(id: string, status: 'published' | 'draft') {
    const landingPage = await LandingPage.findByIdAndUpdate(id, { status }, { new: true });
    if (!landingPage) throw new AppError('Landing page not found', 404);
    return landingPage;
  }
}
