import { texts } from '@/lib/data/texts';

export default function HeroSection() {
  return (
    <section id="hero" className="py-20 bg-[#1B2A4A] text-white">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">{texts.hero.title}</h1>
        <p className="text-xl mb-6 text-gray-300">{texts.hero.subtitle}</p>
        <p className="mb-8 max-w-2xl mx-auto text-base text-gray-400">
          {texts.hero.noteLead}
          <a
            href="#products"
            className="font-medium text-accent underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            {texts.hero.noteLink}
          </a>
          {texts.hero.noteTrail}
        </p>
        <a
          href="#contact"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 font-semibold transition-all duration-200 bg-accent text-primary hover:bg-amber-500"
        >
          {texts.cta.buttonText}
        </a>
      </div>
    </section>
  );
}