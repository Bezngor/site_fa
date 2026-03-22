import { HeroSection, ProblemsSection } from '@/components/sections';

export default function Home() {
  return (
    <main className="flex flex-col">
      <HeroSection />
      <ProblemsSection />
    </main>
  );
}