import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

type SettingsForm = {
  siteName: string;
  logoUrl: string;
  defaultSeoTitle: string;
  defaultSeoDescription: string;
};

const schema = z.object({
  siteName: z.string().min(2, 'Site name tối thiểu 2 ký tự'),
  logoUrl: z.string().url('Logo URL không hợp lệ').or(z.literal('')),
  defaultSeoTitle: z.string().min(2, 'SEO title tối thiểu 2 ký tự'),
  defaultSeoDescription: z.string().min(10, 'SEO description tối thiểu 10 ký tự')
});

const storageKey = 'admin_settings';

export default function AdminSettingsPage() {
  const defaults = (() => {
    const raw = localStorage.getItem(storageKey);
    if (!raw) {
      return {
        siteName: 'LandingPress CMS',
        logoUrl: '',
        defaultSeoTitle: 'LandingPress - Landing page chuyên nghiệp',
        defaultSeoDescription: 'Nền tảng quản lý landing page theo lĩnh vực cho doanh nghiệp.'
      } as SettingsForm;
    }
    return JSON.parse(raw) as SettingsForm;
  })();

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<SettingsForm>({
    resolver: zodResolver(schema),
    defaultValues: defaults
  });

  const onSubmit = (values: SettingsForm) => {
    localStorage.setItem(storageKey, JSON.stringify(values));
    toast.success('Lưu cài đặt thành công');
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="rounded-2xl border bg-slate-50 p-4">
        <h3 className="mb-4 text-lg font-semibold">Thiết lập website</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium">Site name</label>
            <Input {...register('siteName')} />
            {errors.siteName ? <p className="mt-1 text-xs text-rose-600">{errors.siteName.message}</p> : null}
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Logo URL</label>
            <Input {...register('logoUrl')} />
            {errors.logoUrl ? <p className="mt-1 text-xs text-rose-600">{errors.logoUrl.message}</p> : null}
          </div>
        </div>
        <div className="mt-4 space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">Default SEO title</label>
            <Input {...register('defaultSeoTitle')} />
            {errors.defaultSeoTitle ? <p className="mt-1 text-xs text-rose-600">{errors.defaultSeoTitle.message}</p> : null}
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Default SEO description</label>
            <Textarea rows={4} {...register('defaultSeoDescription')} />
            {errors.defaultSeoDescription ? <p className="mt-1 text-xs text-rose-600">{errors.defaultSeoDescription.message}</p> : null}
          </div>
        </div>
      </div>
      <Button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Đang lưu...' : 'Lưu cài đặt'}</Button>
    </form>
  );
}
