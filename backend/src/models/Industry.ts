import { Schema, model, Document } from 'mongoose';

export interface IIndustry extends Document {
  name: string;
  slug: string;
  description?: string;
  status: 'active' | 'inactive';
}

const industrySchema = new Schema<IIndustry>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
    description: { type: String, default: '' },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' }
  },
  { timestamps: true }
);

industrySchema.index({ status: 1 });

export const Industry = model<IIndustry>('Industry', industrySchema);
