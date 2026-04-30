import { Link } from 'react-router-dom';
import { Industry, LandingPage } from '@/types';
import { EmptyState } from './EmptyState';
import { LandingPageCard } from './LandingPageCard';

export function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-cyan-700 py-16 text-white">
      <div className="container-app grid items-center gap-10 lg:grid-cols-2">
        <div>
          <h1 className="text-4xl font-extrabold leading-tight md:text-5xl">Tạo landing page chuyên nghiệp cho mọi lĩnh vực</h1>
          <p className="mt-4 text-lg text-slate-200">Quản lý, chỉnh sửa và xuất bản landing page bằng HTML/CSS/JS trực quan.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/landing-pages" className="rounded-xl bg-white px-5 py-3 font-semibold text-slate-900">Khám phá mẫu</Link>
            <Link to="/admin/login" className="rounded-xl border border-white/50 px-5 py-3 font-semibold text-white">Vào trang quản trị</Link>
          </div>
        </div>
        <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
          <div className="rounded-xl bg-white p-4 text-slate-900 shadow-2xl">
            <div className="h-3 w-20 rounded bg-cyan-500" />
            <div className="mt-4 grid grid-cols-3 gap-3">
              <div className="h-24 rounded bg-slate-100" />
              <div className="h-24 rounded bg-slate-200" />
              <div className="h-24 rounded bg-slate-100" />
            </div>
            <div className="mt-4 h-28 rounded bg-slate-100" />
          </div>
        </div>
      </div>
    </section>
  );
}

export function TrustSection() {
  const stats = [
    { value: '100+', label: 'Mẫu landing page' },
    { value: '30+', label: 'Lĩnh vực' },
    { value: '95%', label: 'Khách hàng hài lòng' },
    { value: '100%', label: 'Tối ưu mobile' }
  ];

  return (
    <section className="container-app py-10">
      <div className="grid gap-4 rounded-2xl border bg-white p-6 md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label}>
            <p className="text-3xl font-bold text-slate-900">{s.value}</p>
            <p className="text-sm text-slate-600">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function FeatureSection() {
  const features = ['Quản lý landing page', 'Upload ảnh', 'Chỉnh HTML/CSS/JS', 'Preview realtime', 'Phân loại theo lĩnh vực', 'Publish nhanh'];

  return (
    <section className="container-app py-8">
      <h2 className="text-3xl font-bold">Tính năng nổi bật</h2>
      <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {features.map((f) => (
          <div key={f} className="rounded-2xl border bg-white p-5 shadow-sm"><h3 className="font-semibold">{f}</h3></div>
        ))}
      </div>
    </section>
  );
}

export function IndustrySection({ industries }: { industries: Industry[] }) {
  return (
    <section className="container-app py-8">
      <h2 className="text-3xl font-bold">Lĩnh vực phổ biến</h2>
      {industries.length === 0 ? (
        <div className="mt-4"><EmptyState message="Chưa có lĩnh vực. Vui lòng chạy npm run seed ở backend." /></div>
      ) : (
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {industries.map((i) => (
            <Link key={i._id} to={`/industries/${i.slug}`} className="rounded-2xl border bg-white p-4 shadow-sm hover:shadow">{i.name}</Link>
          ))}
        </div>
      )}
    </section>
  );
}

export function ShowcaseSection({ pages }: { pages: LandingPage[] }) {
  return (
    <section className="container-app py-8">
      <div className="flex items-end justify-between gap-3">
        <h2 className="text-3xl font-bold">Landing page showcase</h2>
        <Link to="/landing-pages" className="text-sm font-medium text-cyan-700">Xem tất cả</Link>
      </div>
      {pages.length === 0 ? (
        <div className="mt-4"><EmptyState message="Chưa có landing page. Vui lòng chạy npm run seed ở backend." /></div>
      ) : (
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pages.slice(0, 6).map((p) => <LandingPageCard key={p._id} item={p} />)}
        </div>
      )}
    </section>
  );
}

export function WorkflowSection() {
  const steps = ['Chọn lĩnh vực', 'Chọn template', 'Chỉnh nội dung', 'Preview', 'Publish'];
  return (
    <section className="container-app py-8">
      <h2 className="text-3xl font-bold">Quy trình 5 bước</h2>
      <div className="mt-4 grid gap-3 md:grid-cols-5">
        {steps.map((s, idx) => <div key={s} className="rounded-xl border bg-white p-4"><p className="text-xs text-cyan-700">Bước {idx + 1}</p><p className="font-semibold">{s}</p></div>)}
      </div>
    </section>
  );
}

export function PricingSection() {
  const plans = [
    { name: 'Basic', price: '299k', desc: 'Cho startup nhỏ' },
    { name: 'Pro', price: '899k', desc: 'Cho team marketing' },
    { name: 'Agency', price: 'Liên hệ', desc: 'Cho agency và doanh nghiệp lớn' }
  ];
  return (
    <section id="pricing" className="container-app py-8">
      <h2 className="text-3xl font-bold">Bảng giá</h2>
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        {plans.map((p) => <div key={p.name} className="rounded-2xl border bg-white p-5 shadow-sm"><h3 className="text-xl font-semibold">{p.name}</h3><p className="mt-2 text-3xl font-bold">{p.price}</p><p className="mt-1 text-sm text-slate-600">{p.desc}</p></div>)}
      </div>
    </section>
  );
}

export function CTASection() {
  return (
    <section className="container-app py-10">
      <div className="rounded-3xl bg-slate-900 px-8 py-12 text-center text-white">
        <h2 className="text-3xl font-bold">Sẵn sàng tạo landing page bán hàng tốt hơn?</h2>
        <Link to="/admin/login" className="mt-5 inline-flex rounded-xl bg-white px-5 py-3 font-semibold text-slate-900">Bắt đầu ngay</Link>
      </div>
    </section>
  );
}
