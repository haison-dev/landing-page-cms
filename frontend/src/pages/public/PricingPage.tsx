import { PricingSection } from '@/components/public/Sections';

export default function PricingPage() {
  return (
    <>
      <section className="w-full bg-gradient-to-br from-slate-900 via-slate-800 to-cyan-700 py-12 text-white">
        <div className="container-app">
          <h1 className="text-4xl font-extrabold">Bảng giá</h1>
          <p className="mt-3 max-w-2xl text-slate-200">Lựa chọn gói dịch vụ phù hợp theo giai đoạn phát triển của doanh nghiệp.</p>
        </div>
      </section>
      <PricingSection />
    </>
  );
}
