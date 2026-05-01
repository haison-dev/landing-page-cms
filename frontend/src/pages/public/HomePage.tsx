import {
  CTASection,
  ContactSection,
  FeatureSection,
  HeroSection,
  IndustrySection,
  ShowcaseSection,
  TrustSection,
  WorkflowSection
} from '@/components/public/Sections';
import { useIndustriesQuery } from '@/features/industries/hooks/useIndustryQueries';
import { useLandingPagesQuery } from '@/features/landing-pages/hooks/useLandingPageQueries';

export default function HomePage() {
  const { data: industriesData } = useIndustriesQuery({ publicOnly: true }, 'public');
  const { data: pagesData } = useLandingPagesQuery({ status: 'published', page: 1, limit: 12 });

  return (
    <>
      <HeroSection />
      <TrustSection />
      <FeatureSection />
      <IndustrySection industries={industriesData || []} pages={pagesData?.items || []} />
      <ShowcaseSection pages={pagesData?.items || []} />
      <WorkflowSection />
      <ContactSection />
      <CTASection />
    </>
  );
}
