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
  'nha-sach-van-phong-pham': 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1200&q=80',
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
    <section id="home" className="relative pt-32 pb-20 overflow-hidden min-h-[90vh] flex items-center">
      {/* Decorative background elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/30 rounded-full blur-[100px] pointer-events-none mix-blend-screen animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-cyan-600/20 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

      <div className="container-app relative z-10 grid items-center gap-16 lg:grid-cols-2">
        <div className="animate-fade-in-up max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-sm font-medium mb-6 backdrop-blur-sm">
            <Sparkles className="w-4 h-4" />
            <span>Nền tảng Landing Page thế hệ mới</span>
          </div>
          <h1 className="text-5xl font-extrabold leading-[1.1] md:text-7xl mb-6">
            Tạo landing page <br/>
            <span className="text-gradient">chuyên nghiệp</span><br/>
            cho mọi lĩnh vực
          </h1>
          <p className="text-lg text-slate-300 leading-relaxed mb-8 max-w-lg">
            Quản lý, chỉnh sửa và xuất bản landing page nhanh chóng với hệ thống UI trực quan, tối ưu chuyển đổi và hoàn toàn tương thích mobile.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/landing-pages" className="rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 px-8 py-4 font-bold text-white transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] flex items-center gap-2">
              Khám phá mẫu <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/contact" className="rounded-xl px-8 py-4 font-bold text-slate-200 border border-white/10 glass-panel hover:bg-white/5 transition-colors">
              Liên hệ tư vấn
            </Link>
          </div>
        </div>

        {/* Hero Mockup */}
        <div className="relative animate-float lg:ml-auto w-full max-w-lg">
          <div className="absolute -inset-0.5 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-2xl blur opacity-30" />
          <div className="relative glass-panel rounded-2xl p-2">
            <div className="rounded-xl bg-slate-900 border border-white/10 p-4 shadow-2xl overflow-hidden">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div className="grid grid-cols-2 gap-3 mb-4">
                {shots.map((shot) => (
                  <div key={shot} className="h-28 overflow-hidden rounded-lg relative group">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                    <img src={shot} alt="Landing preview" className="h-full w-full object-cover transition duration-500 group-hover:scale-110" loading="lazy" />
                  </div>
                ))}
              </div>
              <div className="h-32 overflow-hidden rounded-lg bg-slate-800 border border-white/5">
                <img
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80"
                  alt="Dashboard preview"
                  className="h-full w-full object-cover opacity-80 mix-blend-luminosity hover:mix-blend-normal transition-all"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function TrustSection() {
  const stats = [
    { value: '100+', label: 'Mẫu landing page', color: 'from-purple-400 to-fuchsia-400' },
    { value: '30+', label: 'Lĩnh vực kinh doanh', color: 'from-fuchsia-400 to-pink-400' },
    { value: '95%', label: 'Khách hàng hài lòng', color: 'from-pink-400 to-rose-400' },
    { value: '100%', label: 'Tối ưu mobile', color: 'from-cyan-400 to-blue-400' }
  ];

  return (
    <section className="container-app py-16 relative z-10 -mt-10">
      <div className="grid gap-4 md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="relative group rounded-3xl p-px overflow-hidden bg-gradient-to-br from-white/10 to-transparent hover:from-purple-500/50 hover:to-cyan-500/50 transition-colors duration-500">
            <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500" />
            <div className="relative h-full rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-white/5 p-8 text-center flex flex-col items-center justify-center">
              <p className={`text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r ${s.color}`}>
                {s.value}
              </p>
              <p className="mt-2 text-sm font-medium text-slate-400">{s.label}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function FeatureSection() {
  const features = [
    { title: 'Kéo thả mượt mà', desc: 'Trải nghiệm thiết kế trực quan không cần code.', icon: Rocket, image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1000&q=80', span: 'col-span-1 md:col-span-2' },
    { title: 'Quản lý Media', desc: 'Lưu trữ và tối ưu hình ảnh tự động.', icon: Sparkles, image: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=1000&q=80', span: 'col-span-1 md:col-span-1' },
    { title: 'Code Injection', desc: 'Nhúng mã HTML/CSS/JS dễ dàng cho từng trang.', icon: ShieldCheck, image: 'https://images.unsplash.com/photo-1518773553398-650c184e0bb3?auto=format&fit=crop&w=1000&q=80', span: 'col-span-1 md:col-span-1' },
    { title: 'Preview Realtime', desc: 'Xem trước thay đổi ngay lập tức trên mọi thiết bị.', icon: BadgeCheck, image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1000&q=80', span: 'col-span-1 md:col-span-2' },
    { title: 'Phân loại theo ngành', desc: 'Hệ thống template đa dạng cho mọi lĩnh vực.', icon: MessageSquare, image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1000&q=80', span: 'col-span-1 md:col-span-2' },
    { title: 'Publish siêu tốc', desc: 'Xuất bản trang đích chỉ với 1 click.', icon: Check, image: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?auto=format&fit=crop&w=1000&q=80', span: 'col-span-1 md:col-span-1' }
  ];

  return (
    <section id="features" className="container-app py-20 relative">
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-cyan-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="mb-12 text-center max-w-2xl mx-auto">
        <h2 className="text-4xl font-bold text-white mb-4">Mọi công cụ bạn cần</h2>
        <p className="text-lg text-slate-400">Hệ sinh thái tính năng toàn diện giúp bạn xây dựng trang đích hiệu suất cao mà không gặp bất kỳ trở ngại kỹ thuật nào.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3 grid-rows-[auto]">
        {features.map(({ title, desc, icon: Icon, image, span }) => (
          <div key={title} className={`group rounded-3xl border border-white/5 bg-slate-900/50 backdrop-blur-sm p-6 overflow-hidden relative transition-all hover:border-purple-500/30 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] ${span}`}>
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10 flex flex-col h-full">
              <div className="mb-6 h-40 overflow-hidden rounded-2xl relative border border-white/10">
                <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-transparent transition-colors z-10" />
                <img src={image} alt={title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100" loading="lazy" />
              </div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold text-white">{title}</h3>
              </div>
              <p className="text-slate-400 text-sm mt-auto">{desc}</p>
            </div>
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
    <section id="industries" className="py-20 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
      <div className="w-full bg-slate-900/40 backdrop-blur-md px-0 py-16 text-white border-y border-white/5 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-64 bg-fuchsia-600/10 blur-[100px] pointer-events-none rounded-full" />
        
        <div className="container-app relative z-10 mb-12">
          <h2 className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Đa dạng lĩnh vực</h2>
          <p className="mt-3 text-center text-slate-400 max-w-2xl mx-auto">Thư viện giao diện phong phú được thiết kế chuyên biệt cho từng ngành hàng, giúp tối ưu tỷ lệ chuyển đổi ngay từ cái nhìn đầu tiên.</p>
        </div>
        
        {industries.length === 0 ? (
          <div className="container-app mt-4 relative z-10"><EmptyState message="Chưa có lĩnh vực. Vui lòng chạy npm run seed ở backend." /></div>
        ) : (
          <div className="mt-7 space-y-6 overflow-hidden px-4 md:px-0 relative z-10">
            <div className="industry-marquee-track">
              {rowOne.map((i, idx) => (
                <Link
                  key={`top-${i._id}-${idx}`}
                  to={`/industries/${i.slug}`}
                  className="industry-card group border border-white/10 hover:border-purple-500/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(168,85,247,0.3)]"
                  style={{ backgroundImage: i.image ? `url(${i.image})` : undefined }}
                >
                  <div className="absolute inset-0 bg-slate-900/60 group-hover:bg-slate-900/30 transition-colors duration-500" />
                  <span className="group-hover:-translate-y-1 transition-transform duration-300">{i.name}</span>
                </Link>
              ))}
            </div>
            <div className="industry-marquee-track reverse">
              {rowTwo.map((i, idx) => (
                <Link
                  key={`bottom-${i._id}-${idx}`}
                  to={`/industries/${i.slug}`}
                  className="industry-card group border border-white/10 hover:border-cyan-500/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(6,182,212,0.3)]"
                  style={{ backgroundImage: i.image ? `url(${i.image})` : undefined }}
                >
                  <div className="absolute inset-0 bg-slate-900/60 group-hover:bg-slate-900/30 transition-colors duration-500" />
                  <span className="group-hover:-translate-y-1 transition-transform duration-300">{i.name}</span>
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
    <section className="container-app py-20">
      <div className="flex flex-col md:flex-row items-end justify-between gap-4 mb-10">
        <div>
          <h2 className="text-4xl font-bold text-white mb-2">Landing page showcase</h2>
          <p className="text-slate-400">Khám phá các mẫu landing page ấn tượng đã được tối ưu</p>
        </div>
        <Link to="/landing-pages" className="inline-flex items-center gap-2 text-sm font-medium text-purple-400 hover:text-purple-300 transition-colors">Xem tất cả <ArrowRight className="h-4 w-4" /></Link>
      </div>
      {pages.length === 0 ? (
        <div className="mt-4"><EmptyState message="Chưa có landing page. Vui lòng chạy npm run seed ở backend." /></div>
      ) : (
        <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
    <section className="container-app py-20 relative">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-white mb-4">Quy trình 5 bước siêu tốc</h2>
        <p className="text-slate-400">Từ ý tưởng đến trang đích hoàn chỉnh chỉ trong vài phút.</p>
      </div>
      <div className="relative mt-4 grid gap-4 md:grid-cols-5">
        {/* Connection line for desktop */}
        <div className="hidden md:block absolute top-12 left-10 right-10 h-0.5 bg-gradient-to-r from-purple-500/0 via-purple-500/50 to-cyan-500/0 z-0" />
        
        {steps.map((s, idx) => (
          <div key={s.title} className="relative z-10 group">
            <div className="rounded-2xl border border-white/5 bg-slate-900/80 backdrop-blur-sm p-4 transition-all duration-300 hover:-translate-y-2 hover:border-purple-500/30 hover:shadow-[0_10px_30px_rgba(168,85,247,0.15)]">
              <div className="mb-4 h-32 overflow-hidden rounded-xl relative">
                <div className="absolute inset-0 bg-slate-950/40 group-hover:bg-transparent transition-colors z-10" />
                <img src={s.image} alt={s.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                
                {/* Step number badge */}
                <div className="absolute top-2 left-2 z-20 w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm shadow-lg">
                  {idx + 1}
                </div>
              </div>
              <p className="font-semibold text-white text-center">{s.title}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function ContactSection() {
  return (
    <section id="contact" className="container-app py-20 relative">
      {/* Decorative glow */}
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-purple-600/10 blur-[100px] pointer-events-none rounded-full" />
      
      <div className="grid gap-8 rounded-3xl border border-white/10 bg-slate-900/60 backdrop-blur-xl p-8 lg:p-12 shadow-2xl lg:grid-cols-[1fr,1fr] relative z-10">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-sm font-medium">
            Tư vấn 1-1
          </div>
          <h2 className="text-4xl font-bold text-white">Liên hệ tư vấn miễn phí</h2>
          <p className="text-slate-400 text-lg">Để lại thông tin, đội ngũ chuyên gia của LandingPress sẽ tư vấn giải pháp tối ưu chuyển đổi phù hợp với mô hình kinh doanh của bạn trong 24h.</p>
          
          <div className="mt-8 space-y-4">
            <div className="flex items-center gap-4 text-slate-300">
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-purple-400 border border-white/10">
                <span className="text-xl">✉</span>
              </div>
              <div>
                <p className="text-sm text-slate-500">Email hỗ trợ</p>
                <p className="font-semibold">support@landingpress.vn</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-slate-300">
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-cyan-400 border border-white/10">
                <span className="text-xl">☏</span>
              </div>
              <div>
                <p className="text-sm text-slate-500">Hotline 24/7</p>
                <p className="font-semibold">0900 000 000</p>
              </div>
            </div>
          </div>
        </div>
        
        <form className="flex flex-col gap-4 rounded-2xl bg-slate-950/50 border border-white/10 p-6 md:p-8">
          <div>
            <label className="text-sm text-slate-400 mb-1 block">Họ và tên</label>
            <input className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-500 focus:border-purple-500/50 focus:outline-none focus:ring-1 focus:ring-purple-500/50 transition-all" placeholder="Nhập họ và tên của bạn" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-slate-400 mb-1 block">Email</label>
              <input className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-500 focus:border-purple-500/50 focus:outline-none focus:ring-1 focus:ring-purple-500/50 transition-all" placeholder="Email liên hệ" />
            </div>
            <div>
              <label className="text-sm text-slate-400 mb-1 block">Số điện thoại</label>
              <input className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-500 focus:border-purple-500/50 focus:outline-none focus:ring-1 focus:ring-purple-500/50 transition-all" placeholder="SĐT của bạn" />
            </div>
          </div>
          <div>
            <label className="text-sm text-slate-400 mb-1 block">Nhu cầu của bạn</label>
            <textarea className="w-full min-h-[120px] rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-500 focus:border-purple-500/50 focus:outline-none focus:ring-1 focus:ring-purple-500/50 transition-all resize-none" placeholder="Mô tả ngắn gọn về nhu cầu xây dựng landing page của bạn..." />
          </div>
          <button type="button" className="mt-2 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 px-4 py-4 font-bold text-white shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(168,85,247,0.5)]">
            Gửi yêu cầu tư vấn
          </button>
        </form>
      </div>
    </section>
  );
}

export function CTASection() {
  return (
    <section className="container-app py-20">
      <div className="relative rounded-3xl overflow-hidden p-1 px-8 py-16 md:py-24 text-center text-white border border-white/10 group">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-slate-900 z-0" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-20 mix-blend-overlay z-0" />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 to-cyan-900/80 z-0" />
        
        {/* Content */}
        <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
          <div className="w-20 h-20 mb-8 rounded-2xl bg-gradient-to-br from-purple-500 to-cyan-400 flex items-center justify-center shadow-[0_0_30px_rgba(168,85,247,0.5)] animate-pulse-glow">
            <Rocket className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">Sẵn sàng bứt phá doanh thu với Landing Page?</h2>
          <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl">Bắt đầu miễn phí ngay hôm nay. Hàng ngàn doanh nghiệp đã tin dùng LandingPress để tăng cường hiệu quả marketing.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/admin/login" className="rounded-xl bg-white px-8 py-4 font-bold text-slate-900 transition-all hover:scale-105 hover:bg-slate-100 shadow-xl flex items-center gap-2">
              Tạo trang miễn phí <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
