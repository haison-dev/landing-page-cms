import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { LayoutDashboard } from 'lucide-react';
import { getApiErrorMessage } from '@/lib/http';
import { useLoginMutation } from '@/features/auth/hooks/useAuth';

const schema = z.object({
  email: z.string().email('Email không hợp lệ'),
  password: z.string().min(6, 'Mật khẩu tối thiểu 6 ký tự')
});

type FormData = z.infer<typeof schema>;

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const loginMutation = useLoginMutation();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    try {
      await loginMutation.mutateAsync(data);
      toast.success('Đăng nhập thành công');
      navigate('/admin/dashboard');
    } catch (error) {
      toast.error(getApiErrorMessage(error, 'Sai email hoặc mật khẩu'));
    }
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="hidden bg-slate-900 p-12 text-white lg:flex lg:flex-col lg:justify-between">
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-2 text-xl font-semibold"><LayoutDashboard className="h-5 w-5" /> Landing Page CMS</div>
          <Link to="/" className="rounded-lg border border-white/30 px-3 py-2 text-sm font-medium text-white transition hover:bg-white/10">Quay lại trang chủ</Link>
        </div>
        <div>
          <h2 className="text-4xl font-bold leading-tight">Hệ thống quản trị landing page chuyên nghiệp</h2>
          <p className="mt-4 text-slate-300">Đăng nhập để quản lý mẫu landing page, template và xuất bản theo lĩnh vực.</p>
        </div>
      </div>
      <div className="flex items-center justify-center bg-slate-100 p-4">
        <form className="w-full max-w-md space-y-4 rounded-2xl bg-white p-7 shadow-lg" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-end lg:hidden">
            <Link to="/" className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50">Quay lại trang chủ</Link>
          </div>
          <h1 className="text-2xl font-semibold">Admin Login</h1>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Email</label>
            <Input type="email" autoComplete="email" placeholder="admin@example.com" {...register('email')} />
            {errors.email ? <p className="mt-1 text-xs text-rose-600">{errors.email.message}</p> : null}
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Password</label>
            <Input type="password" autoComplete="current-password" placeholder="••••••••" {...register('password')} />
            {errors.password ? <p className="mt-1 text-xs text-rose-600">{errors.password.message}</p> : null}
          </div>
          <Button type="submit" disabled={isSubmitting || loginMutation.isPending} className="w-full">{isSubmitting || loginMutation.isPending ? 'Đang đăng nhập...' : 'Đăng nhập'}</Button>
        </form>
      </div>
    </div>
  );
}
