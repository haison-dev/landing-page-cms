import { useQuery } from '@tanstack/react-query';
import { industryApi } from '@/api/industryApi';
import { landingPageApi } from '@/api/landingPageApi';
import {
  CTASection,
  FeatureSection,
  HeroSection,
  IndustrySection,
  PricingSection,
  ShowcaseSection,
  TrustSection,
  WorkflowSection
} from '@/components/public/Sections';

export default function HomePage() {
  const { data: industriesData } = useQuery({ queryKey: ['industries-public-home'], queryFn: () => industryApi.getAll({ publicOnly: true }) });
  const { data: pagesData } = useQuery({
    queryKey: ['landing-pages-public-home'],
    queryFn: () => landingPageApi.getAll({ status: 'published', page: 1, limit: 12 })
  });

  return (
    <>
      <HeroSection />
      <TrustSection />
      <FeatureSection />
      <IndustrySection industries={industriesData || []} />
      <ShowcaseSection pages={pagesData?.items || []} />
      <WorkflowSection />
      <PricingSection />
      <CTASection />
    </>
  );
}
