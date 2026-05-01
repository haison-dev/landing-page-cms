import { Template } from "@/types";
import { apiClient } from "./apiClient";

export const templateApi = {
  getAll: async (params?: Record<string, string | number | boolean>) =>
    (await apiClient.get<Template[]>("/templates", { params })).data,
  create: async (
    payload: Partial<Template> & {
      name: string;
      slug: string;
      industryId: string;
    },
  ) => (await apiClient.post("/templates", payload)).data,
  update: async (id: string, payload: Partial<Template>) =>
    (await apiClient.put(`/templates/${id}`, payload)).data,
  remove: async (id: string) =>
    (await apiClient.delete(`/templates/${id}`)).data,
};
