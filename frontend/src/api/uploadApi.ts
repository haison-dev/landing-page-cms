import { apiClient } from "./apiClient";

export type MediaItem = {
  publicId: string;
  url: string;
  width: number;
  height: number;
  format: string;
  createdAt: string;
};

export const uploadApi = {
  uploadImage: async (file: File) => {
    const fd = new FormData();
    fd.append("image", file);
    return (
      await apiClient.post<{ url: string; publicId: string }>(
        "/uploads/image",
        fd,
        { headers: { "Content-Type": "multipart/form-data" } },
      )
    ).data;
  },
  getImages: async (params?: { limit?: number; nextCursor?: string }) =>
    (
      await apiClient.get<{ items: MediaItem[]; nextCursor: string | null }>(
        "/uploads/images",
        { params },
      )
    ).data,
  deleteImage: async (publicId: string) =>
    (await apiClient.delete(`/uploads/image/${encodeURIComponent(publicId)}`))
      .data,
  replaceImage: async (publicId: string, file: File) => {
    const fd = new FormData();
    fd.append("image", file);
    return (
      await apiClient.put<{ url: string; publicId: string }>(
        `/uploads/image/${encodeURIComponent(publicId)}`,
        fd,
        { headers: { "Content-Type": "multipart/form-data" } },
      )
    ).data;
  },
};
