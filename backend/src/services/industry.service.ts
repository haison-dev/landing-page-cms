import slugify from 'slugify';
import { Industry, IIndustry } from '../models/Industry';
import { AppError } from '../utils/appError';

export class IndustryService {
  static async create(payload: Partial<IIndustry>) {
    const data = { ...payload, slug: slugify(payload.slug || payload.name || '', { lower: true, strict: true }) };
    return await Industry.create(data);
  }

  static async findAll(query: { publicOnly?: string; status?: string }) {
    const filter: Record<string, unknown> = {};
    if (query.publicOnly === 'true') filter.status = 'active';
    if (query.status) filter.status = query.status;
    return await Industry.find(filter).sort({ createdAt: -1 });
  }

  static async findById(id: string) {
    const industry = await Industry.findById(id);
    if (!industry) throw new AppError('Industry not found', 404);
    return industry;
  }

  static async findBySlug(slug: string) {
    const industry = await Industry.findOne({ slug });
    if (!industry) throw new AppError('Industry not found', 404);
    return industry;
  }

  static async update(id: string, payload: Partial<IIndustry>) {
    const data = { ...payload };
    if (data.slug || data.name) {
      data.slug = slugify(data.slug || data.name || '', { lower: true, strict: true });
    }
    const industry = await Industry.findByIdAndUpdate(id, data, { new: true });
    if (!industry) throw new AppError('Industry not found', 404);
    return industry;
  }

  static async delete(id: string) {
    const industry = await Industry.findByIdAndDelete(id);
    if (!industry) throw new AppError('Industry not found', 404);
  }
}
