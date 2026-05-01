import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';

export default function AdminGuard() {
  const token = useAuthStore((s) => s.accessToken) || localStorage.getItem('accessToken');
  if (!token) return <Navigate to="/admin/login" replace />;
  return <Outlet />;
}
