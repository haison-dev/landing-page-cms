import { Schema, model, Document, Types } from 'mongoose';

export interface ILandingPage extends Document {
  title: string;
  slug: string;
  industryId: Types.ObjectId;
  shortDescription?: string;
  thumbnailUrl?: string;
  mockupUrl?: string;
  htmlCode: string;
  cssCode: string;
  jsCode: string;
  seoTitle?: string;
  seoDescription?: string;
  status: 'draft' | 'published';
}

const landingPageSchema = new Schema<ILandingPage>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
    industryId: { type: Schema.Types.ObjectId, ref: 'Industry', required: true },
    shortDescription: { type: String, default: '' },
    thumbnailUrl: { type: String, default: '' },
    mockupUrl: { type: String, default: '' },
    htmlCode: { type: String, default: '' },
    cssCode: { type: String, default: '' },
    jsCode: { type: String, default: '' },
    seoTitle: { type: String, default: '' },
    seoDescription: { type: String, default: '' },
    status: { type: String, enum: ['draft', 'published'], default: 'draft' }
  },
  { timestamps: true }
);

export const LandingPage = model<ILandingPage>('LandingPage', landingPageSchema);
