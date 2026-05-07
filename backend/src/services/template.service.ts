import slugify from 'slugify';
import { Template, ITemplate } from '../models/Template';
import { AppError } from '../utils/appError';

export class TemplateService {
  static async create(payload: Partial<ITemplate>) {
    const data = { ...payload, slug: slugify(payload.slug || payload.name || '', { lower: true, strict: true }) };
    return await Template.create(data);
  }

  static async findAll(query: { publicOnly?: string; industryId?: string }) {
    const filter: Record<string, unknown> = {};
    if (query.publicOnly === 'true') filter.status = 'active';
    if (query.industryId) filter.industryId = query.industryId;
    
    // Optimize populate to fetch only name and slug of industry
    return await Template.find(filter).populate('industryId', 'name slug').sort({ createdAt: -1 });
  }

  static async findById(id: string) {
    const template = await Template.findById(id).populate('industryId', 'name slug');
    if (!template) throw new AppError('Template not found', 404);
    return template;
  }

  static async update(id: string, payload: Partial<ITemplate>) {
    const data = { ...payload };
    if (data.slug || data.name) {
      data.slug = slugify(data.slug || data.name || '', { lower: true, strict: true });
    }
    const template = await Template.findByIdAndUpdate(id, data, { new: true });
    if (!template) throw new AppError('Template not found', 404);
    return template;
  }

  static async delete(id: string) {
    const template = await Template.findByIdAndDelete(id);
    if (!template) throw new AppError('Template not found', 404);
  }
}
