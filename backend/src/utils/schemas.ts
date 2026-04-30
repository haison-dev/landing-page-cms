import { z } from 'zod';

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(6)
  })
});

export const industrySchema = z.object({
  body: z.object({
    name: z.string().min(2),
    slug: z.string().min(2),
    description: z.string().optional(),
    status: z.enum(['active', 'inactive']).optional()
  })
});

export const templateSchema = z.object({
  body: z.object({
    name: z.string().min(2),
    slug: z.string().min(2),
    industryId: z.string().min(1),
    description: z.string().optional(),
    htmlBase: z.string().optional(),
    cssBase: z.string().optional(),
    jsBase: z.string().optional(),
    status: z.enum(['active', 'inactive']).optional()
  })
});

export const landingPageSchema = z.object({
  body: z.object({
    title: z.string().min(2),
    slug: z.string().min(2),
    industryId: z.string().min(1),
    shortDescription: z.string().optional(),
    thumbnailUrl: z.string().optional(),
    mockupUrl: z.string().optional(),
    htmlCode: z.string().optional(),
    cssCode: z.string().optional(),
    jsCode: z.string().optional(),
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
    status: z.enum(['draft', 'published']).optional()
  })
});


