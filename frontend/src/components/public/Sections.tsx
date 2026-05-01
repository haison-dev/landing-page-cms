import { Link } from 'react-router-dom';
import { ArrowRight, BadgeCheck, Check, MessageSquare, Rocket, ShieldCheck, Sparkles } from 'lucide-react';
import { Industry, LandingPage } from '@/types';
import { EmptyState } from './EmptyState';
import { LandingPageCard } from './LandingPageCard';

const industryFallbackImages: Record<string, string> = {
  'thoi-trang': 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80',
  'my-pham': 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80',
  'dien-tu': 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80',
  'noi-that': 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
  'me-va-be': 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=1200&q=80',
  'nha-sach-van-phong-pham': 'https://images.unsplash.com/photo-1455885666463-9f41ab5e6ebd?auto=format&fit=crop&w=1200&q=80',
  'am-thuc-an-uong': 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&w=1200&q=80',
  'suc-khoe-nha-thuoc': 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
  'trang-suc-qua-tang': 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=80',
  'sieu-thi-tap-hoa': 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80'
};

function getIndustryImage(slug: string) {
  return industryFallbackImages[slug] || `https://source.unsplash.com/1200x800/?${encodeURIComponent(slug.replace(/-/g, ' '))}`;
}

export function HeroSection() {
  const shots = [
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=700&q=80',
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=80',
    'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=700&q=80',
    'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=700&q=80'
  ];

  return (
    <section id="home" className="bg-gradient-to-br from-slate-900 via-slate-800 to-cyan-700 py-16 text-white">
      <div className="container-app grid items-center gap-10 lg:grid-cols-2">
        <div>
          <h1 className="text-4xl font-extrabold leading-tight md:text-5xl">Tạo landing page chuyên nghiệp cho mọi lĩnh vực</h1>
          <p className="mt-4 text-lg text-slate-200">Quản lý, chỉnh sửa và xuất bản landing page bằng HTML/CSS/JS trực quan.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/landing-pages" className="rounded-xl bg-white px-5 py-3 font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:shadow-xl">Khám phá mẫu</Link>
          </div>
        </div>
        <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
          <div className="rounded-xl bg-white p-4 text-slate-900 shadow-2xl">
            <div className="h-3 w-20 rounded bg-cyan-500" />
            <div className="mt-4 grid grid-cols-2 gap-3">
              {shots.map((shot) => (
                <div key={shot} className="h-32 overflow-hidden rounded-xl">
                  <img src={shot} alt="Landing preview" className="h-full w-full object-cover transition duration-500 hover:scale-110" loading="lazy" />
                </div>
              ))}
            </div>
            <div className="mt-4 h-28 overflow-hidden rounded bg-slate-100">
              <img
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80"
                alt="Dashboard preview"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
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
      <div className="grid gap-4 rounded-3xl border border-slate-700/50 bg-gradient-to-r from-slate-900 to-slate-800 p-6 text-white shadow-xl md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="transition hover:-translate-y-0.5">
            <p className="text-3xl font-bold">{s.value}</p>
            <p className="text-sm text-slate-300">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function FeatureSection() {
  const features = [
    { title: 'Quản lý landing page', icon: Rocket, image: 'https://images.unsplash.com/photo-1551281044-8b5bd1f8f3b5?auto=format&fit=crop&w=1000&q=80' },
    { title: 'Upload ảnh', icon: Sparkles, image: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=1000&q=80' },
    { title: 'Chỉnh HTML/CSS/JS', icon: ShieldCheck, image: 'https://images.unsplash.com/photo-1518773553398-650c184e0bb3?auto=format&fit=crop&w=1000&q=80' },
    { title: 'Preview realtime', icon: BadgeCheck, image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1000&q=80' },
    { title: 'Phân loại theo lĩnh vực', icon: MessageSquare, image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1000&q=80' },
    { title: 'Publish nhanh', icon: Check, image: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?auto=format&fit=crop&w=1000&q=80' }
  ];

  return (
    <section id="features" className="container-app py-10">
      <div className="mb-4 flex items-end justify-between">
        <h2 className="text-3xl font-bold text-slate-900">Tính năng nổi bật</h2>
        <span className="text-sm text-slate-500">Luồng làm việc tối ưu cho team marketing</span>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {features.map(({ title, icon: Icon, image }) => (
          <div key={title} className="rounded-2xl border border-cyan-100 bg-gradient-to-br from-white to-cyan-50 p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
            <div className="mb-3 h-28 overflow-hidden rounded-lg">
              <img src={image} alt={title} className="h-full w-full object-cover" loading="lazy" />
            </div>
            <Icon className="h-5 w-5 text-cyan-700" />
            <h3 className="mt-3 font-semibold text-slate-900">{title}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}

export function IndustrySection({ industries, pages }: { industries: Industry[]; pages: LandingPage[] }) {
  const mapped = industries.map((industry) => {
    const page = pages.find((p) => {
      const id = typeof p.industryId === 'string' ? p.industryId : p.industryId._id;
      return id === industry._id;
    });
    return {
      ...industry,
      image: page?.thumbnailUrl || page?.mockupUrl || getIndustryImage(industry.slug)
    };
  });
  const rowOne = [...mapped, ...mapped];
  const rowTwo = [...mapped.slice().reverse(), ...mapped.slice().reverse()];

  return (
    <section id="industries" className="py-10">
      <div className="w-full bg-gradient-to-br from-slate-900 via-slate-800 to-cyan-700 px-0 py-10 text-white shadow-2xl md:py-12">
        <div className="container-app">
          <h2 className="text-center text-3xl font-bold">Lĩnh vực phổ biến</h2>
          <p className="mt-2 text-center text-slate-200">Mẫu landing page trực quan theo từng ngành hàng</p>
        </div>
        {industries.length === 0 ? (
          <div className="container-app mt-4"><EmptyState message="Chưa có lĩnh vực. Vui lòng chạy npm run seed ở backend." /></div>
        ) : (
          <div className="mt-7 space-y-4 overflow-hidden px-4 md:px-0">
            <div className="industry-marquee-track">
              {rowOne.map((i, idx) => (
                <Link
                  key={`top-${i._id}-${idx}`}
                  to={`/industries/${i.slug}`}
                  className="industry-card"
                  style={{ backgroundImage: i.image ? `url(${i.image})` : undefined }}
                >
                  <span>{i.name}</span>
                </Link>
              ))}
            </div>
            <div className="industry-marquee-track reverse">
              {rowTwo.map((i, idx) => (
                <Link
                  key={`bottom-${i._id}-${idx}`}
                  to={`/industries/${i.slug}`}
                  className="industry-card"
                  style={{ backgroundImage: i.image ? `url(${i.image})` : undefined }}
                >
                  <span>{i.name}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export function ShowcaseSection({ pages }: { pages: LandingPage[] }) {
  return (
    <section className="container-app py-10">
      <div className="flex items-end justify-between gap-3">
        <h2 className="text-3xl font-bold">Landing page showcase</h2>
        <Link to="/landing-pages" className="inline-flex items-center gap-1 text-sm font-medium text-cyan-700">Xem tất cả <ArrowRight className="h-4 w-4" /></Link>
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
  const steps = [
    { title: 'Chọn lĩnh vực', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80' },
    { title: 'Chọn template', image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80' },
    { title: 'Chỉnh nội dung', image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80' },
    { title: 'Preview', image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80' },
    { title: 'Publish', image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80' }
  ];
  return (
    <section className="container-app py-10">
      <h2 className="text-3xl font-bold">Quy trình 5 bước</h2>
      <div className="mt-4 grid gap-3 md:grid-cols-5">
        {steps.map((s, idx) => (
          <div key={s.title} className="rounded-xl border border-cyan-100 bg-gradient-to-br from-white to-cyan-50 p-4 transition hover:-translate-y-0.5">
            <div className="mb-3 h-24 overflow-hidden rounded-lg">
              <img src={s.image} alt={s.title} className="h-full w-full object-cover" loading="lazy" />
            </div>
            <p className="text-xs text-cyan-700">Bước {idx + 1}</p>
            <p className="font-semibold">{s.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function PricingSection() {
  const plans = [
    { name: 'Basic', price: '299.000đ', desc: 'Cho startup nhỏ', features: ['1 project', '10 landing pages', 'Support email'] },
    { name: 'Pro', price: '899.000đ', desc: 'Cho team marketing', features: ['10 projects', 'Không giới hạn pages', 'Priority support'], highlight: true },
    { name: 'Agency', price: 'Liên hệ', desc: 'Cho agency và doanh nghiệp lớn', features: ['Không giới hạn projects', 'White-label', 'CSKH riêng'] }
  ];

  return (
    <section id="pricing" className="py-12">
      <div className="container-app">
        <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-cyan-700 p-8 text-white md:p-10">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold">Bảng giá linh hoạt theo quy mô</h2>
            <p className="mt-2 text-slate-200">Bắt đầu nhanh, mở rộng dễ dàng khi doanh nghiệp tăng trưởng.</p>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {plans.map((p) => (
              <div key={p.name} className={`rounded-2xl border p-5 shadow-lg ${p.highlight ? 'border-cyan-300 bg-white text-slate-900' : 'border-white/20 bg-white/10 text-white'}`}>
                <h3 className="text-xl font-semibold">{p.name}</h3>
                <div className="mt-3 h-28 overflow-hidden rounded-lg">
                  <img
                    src={p.name === 'Basic'
                      ? 'https://images.unsplash.com/photo-1573496529574-be85d6a60704?auto=format&fit=crop&w=900&q=80'
                      : p.name === 'Pro'
                        ? 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=80'
                        : 'https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=900&q=80'}
                    alt={p.name}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <p className="mt-2 text-3xl font-bold">{p.price}</p>
                <p className={`mt-1 text-sm ${p.highlight ? 'text-slate-600' : 'text-slate-200'}`}>{p.desc}</p>
                <ul className="mt-4 space-y-2 text-sm">
                  {p.features.map((f) => <li key={f}>• {f}</li>)}
                </ul>
                <button className={`mt-5 w-full rounded-xl px-4 py-2 font-semibold ${p.highlight ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}`}>Chọn gói</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function ContactSection() {
  return (
    <section id="contact" className="container-app py-12">
      <div className="grid gap-6 rounded-3xl border border-cyan-100 bg-gradient-to-br from-white to-cyan-50 p-6 shadow-sm lg:grid-cols-[1fr,1fr]">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-slate-900">Liên hệ tư vấn miễn phí</h2>
          <p className="mt-2 text-slate-600">Để lại thông tin, đội ngũ LandingPress sẽ tư vấn giải pháp phù hợp trong 24h.</p>
          <div className="h-44 overflow-hidden rounded-2xl">
            <img
              src="https://images.unsplash.com/photo-1552581234-26160f608093?auto=format&fit=crop&w=1200&q=80"
              alt="Consulting"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="mt-6 space-y-2 text-sm text-slate-700">
            <p><strong>Email:</strong> support@landingpress.vn</p>
            <p><strong>Hotline:</strong> 0900 000 000</p>
            <p><strong>Giờ hỗ trợ:</strong> 08:30 - 18:00 (T2 - T7)</p>
          </div>
        </div>
        <form className="grid gap-3 rounded-2xl border bg-white p-4">
          <input className="rounded-lg border px-3 py-2" placeholder="Họ và tên" />
          <input className="rounded-lg border px-3 py-2" placeholder="Email" />
          <input className="rounded-lg border px-3 py-2" placeholder="Số điện thoại" />
          <textarea className="min-h-[120px] rounded-lg border px-3 py-2" placeholder="Nhu cầu của bạn" />
          <button type="button" className="rounded-xl bg-slate-900 px-4 py-2.5 font-semibold text-white">Gửi yêu cầu</button>
        </form>
      </div>
    </section>
  );
}

export function CTASection() {
  return (
    <section className="container-app py-10">
      <div
        className="rounded-3xl bg-slate-900 px-8 py-12 text-center text-white"
        style={{
          backgroundImage:
            'linear-gradient(120deg, rgba(15,23,42,0.92), rgba(14,116,144,0.85)), url(https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1400&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <h2 className="text-3xl font-bold">Sẵn sàng tạo landing page bán hàng tốt hơn?</h2>
        <Link to="/admin/login" className="mt-5 inline-flex rounded-xl bg-white px-5 py-3 font-semibold text-slate-900">Bắt đầu ngay</Link>
      </div>
    </section>
  );
}
