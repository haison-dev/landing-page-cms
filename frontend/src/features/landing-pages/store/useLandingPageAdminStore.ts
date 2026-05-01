import { create } from 'zustand';

type LandingPageAdminState = {
  search: string;
  industryFilter: string;
  statusFilter: string;
  page: number;
  selected: string[];
  setSearch: (value: string) => void;
  setIndustryFilter: (value: string) => void;
  setStatusFilter: (value: string) => void;
  setPage: (value: number) => void;
  setSelected: (value: string[]) => void;
  resetListState: () => void;
};

export const useLandingPageAdminStore = create<LandingPageAdminState>((set) => ({
  search: '',
  industryFilter: '',
  statusFilter: '',
  page: 1,
  selected: [],
  setSearch: (value) => set({ search: value, page: 1 }),
  setIndustryFilter: (value) => set({ industryFilter: value, page: 1 }),
  setStatusFilter: (value) => set({ statusFilter: value, page: 1 }),
  setPage: (value) => set({ page: value }),
  setSelected: (value) => set({ selected: value }),
  resetListState: () => set({ search: '', industryFilter: '', statusFilter: '', page: 1, selected: [] })
}));
