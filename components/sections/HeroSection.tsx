import Image from 'next/image';
import { texts } from '@/lib/data/texts';

export default function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <Image
        src="/images/hero-bg.webp"
        alt="Производственный процесс"
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#1B2A4A]/80 to-transparent" />
      <div className="container-custom relative z-10 flex flex-col items-center text-center text-white">
        <h1 className="text-4xl font-bold md:text-6xl lg:text-7xl">
          {texts.hero.title}
        </h1>
        <p className="mt-6 max-w-2xl text-lg md:text-xl">
          {texts.hero.subtitle}
        </p>
        <a
          href="#cta-form"
          className="mt-10 rounded-md bg-[#F59E0B] px-8 py-4 text-lg font-semibold text-[#1B2A4A] transition hover:bg-amber-500"
        >
          {texts.cta.buttonText}
        </a>
      </div>
    </section>
  );
}
