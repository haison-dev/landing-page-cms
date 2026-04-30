export type Industry = {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  status: 'active' | 'inactive';
};

export type Template = {
  _id: string;
  name: string;
  slug: string;
  industryId: Industry | string;
  description?: string;
  htmlBase: string;
  cssBase: string;
  jsBase: string;
  status: 'active' | 'inactive';
};

export type LandingPage = {
  _id: string;
  title: string;
  slug: string;
  industryId: Industry | string;
  shortDescription?: string;
  thumbnailUrl?: string;
  mockupUrl?: string;
  htmlCode: string;
  cssCode: string;
  jsCode: string;
  seoTitle?: string;
  seoDescription?: string;
  status: 'draft' | 'published';
};

export type User = {
  id: string;
  email: string;
  role: 'admin';
};

export type PaginatedResponse<T> = {
  items: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};

