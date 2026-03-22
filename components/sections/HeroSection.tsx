import { Button } from '@/components/ui/Button';
import { texts } from '@/lib/data/texts';

export default function HeroSection() {
  return (
    <section id="hero" className="py-20 bg-[#1B2A4A] text-white">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">{texts.hero.title}</h1>
        <p className="text-xl mb-8 text-gray-300">{texts.hero.subtitle}</p>
        <Button variant="primary">{texts.cta.buttonText}</Button>
      </div>
    </section>
  );
}