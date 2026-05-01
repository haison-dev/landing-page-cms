import { useMutation } from '@tanstack/react-query';
import { authApi } from '@/api/authApi';
import { useAuthStore } from '@/store/authStore';

export const useLoginMutation = () => {
  const setAccessToken = useAuthStore((s) => s.setAccessToken);

  return useMutation({
    mutationFn: authApi.login,
    onSuccess: (res) => {
      setAccessToken(res.accessToken);
    }
  });
};

export const useLogout = () => {
  return useAuthStore((s) => s.logout);
};
