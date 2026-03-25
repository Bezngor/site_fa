import Image from 'next/image';
import { texts } from '@/lib/data/texts';

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[min(70vh,40rem)] items-center overflow-hidden py-20 text-white"
    >
      <Image
        src={texts.hero.backgroundSrc}
        alt={texts.hero.backgroundAlt}
        fill
        priority
        fetchPriority="high"
        className="object-cover object-center"
        sizes="100vw"
      />
      <div
        className="absolute inset-0 z-[1] bg-[#1B2A4A]/88"
        aria-hidden
      />
      <div className="container relative z-10 mx-auto px-4 text-center">
        <h1 className="mb-6 text-4xl font-bold md:text-6xl">{texts.hero.title}</h1>
        <p className="mb-6 text-xl text-gray-300">{texts.hero.subtitle}</p>
        <p className="mx-auto mb-8 max-w-2xl text-base text-gray-400">
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
          className="inline-flex items-center justify-center gap-2 bg-accent px-6 py-3 font-semibold text-primary transition-all duration-200 hover:bg-amber-500"
        >
          {texts.cta.buttonText}
        </a>
      </div>
    </section>
  );
}
