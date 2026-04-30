import { AxiosError } from 'axios';

export const getApiErrorMessage = (error: unknown, fallback = 'Request failed'): string => {
  if (error instanceof AxiosError) {
    return (error.response?.data as { message?: string } | undefined)?.message || error.message || fallback;
  }
  return fallback;
};
