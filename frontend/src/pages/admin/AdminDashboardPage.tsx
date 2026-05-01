import { useQuery } from '@tanstack/react-query';
import { DashboardCard } from '@/components/admin/DashboardCard';
import { useIndustriesQuery } from '@/features/industries/hooks/useIndustryQueries';
import { useTemplatesQuery } from '@/features/templates/hooks/useTemplateQueries';
import { useLandingPagesQuery } from '@/features/landing-pages/hooks/useLandingPageQueries';

export default function AdminDashboardPage() {
  const { data: industries } = useIndustriesQuery(undefined, 'admin');
  const { data: templates } = useTemplatesQuery();
  const { data: pages } = useLandingPagesQuery({ page: 1, limit: 200 });

  const published = pages?.items.filter((p) => p.status === 'published').length || 0;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Dashboard</h2>
        <p className="text-sm text-slate-500">Tổng quan dữ liệu hệ thống.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-4">
        <DashboardCard title="Industries" value={industries?.length || 0} description="Danh mục lĩnh vực" />
        <DashboardCard title="Templates" value={templates?.length || 0} description="Mẫu có sẵn" />
        <DashboardCard title="Landing Pages" value={pages?.pagination.total || 0} description="Tổng số landing page" />
        <DashboardCard title="Published" value={published} description="Landing page đang hiển thị" />
      </div>
    </div>
  );
}
