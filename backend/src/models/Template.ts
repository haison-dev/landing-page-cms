import { Schema, model, Document, Types } from 'mongoose';

export interface ITemplate extends Document {
  name: string;
  slug: string;
  industryId: Types.ObjectId;
  description?: string;
  htmlBase: string;
  cssBase: string;
  jsBase: string;
  status: 'active' | 'inactive';
}

const templateSchema = new Schema<ITemplate>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
    industryId: { type: Schema.Types.ObjectId, ref: 'Industry', required: true },
    description: { type: String, default: '' },
    htmlBase: { type: String, default: '' },
    cssBase: { type: String, default: '' },
    jsBase: { type: String, default: '' },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' }
  },
  { timestamps: true }
);

export const Template = model<ITemplate>('Template', templateSchema);
