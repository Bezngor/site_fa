import {
  HeroSection,
  ProblemsSection,
  HowWeWorkSection,
  CasesSection,
  ProductLineSection,
  ResultsSection,
  AboutSection,
  CtaFormSection,
} from '@/components/sections';

export default function Home() {
  return (
    <main className="flex flex-col">
      <HeroSection />
      <ProblemsSection />
      <HowWeWorkSection />
      <CasesSection />
      <ProductLineSection />
      <ResultsSection />
      <AboutSection />
      <CtaFormSection />
    </main>
  );
}