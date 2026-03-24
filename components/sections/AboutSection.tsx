import { Headphones, Layers, LineChart, Settings2 } from 'lucide-react';
import { texts } from '@/lib/data/texts';
import type { AboutFeatureIcon } from '@/types';

const iconMap: Record<AboutFeatureIcon, typeof Settings2> = {
  Settings2,
  Layers,
  LineChart,
  Headphones,
};

const ctaButtonClass =
  'inline-flex items-center justify-center rounded-md px-6 py-3 font-semibold transition-all duration-200 bg-accent text-primary hover:bg-amber-500';

export default function AboutSection() {
  return (
    <section
      id="about"
      className="bg-gray-50 py-16 sm:py-20"
      aria-labelledby="about-heading"
    >
      <div className="container mx-auto px-4">
        <header className="mx-auto mb-10 max-w-3xl text-center sm:mb-12">
          <h2
            id="about-heading"
            className="font-heading text-3xl font-bold tracking-tight text-primary sm:text-4xl"
          >
            {texts.about.title}
          </h2>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            {texts.about.description}
          </p>
        </header>

        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2">
          {texts.about.features.map((feature) => {
            const Icon = iconMap[feature.icon];
            return (
              <article
                key={feature.title}
                className="flex flex-col rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:p-7"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                  <Icon className="h-7 w-7 text-accent" aria-hidden />
                </div>
                <h3 className="mb-3 text-lg font-semibold leading-snug tracking-tight text-primary sm:text-xl">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-600 sm:text-base">
                  {feature.text}
                </p>
              </article>
            );
          })}
        </div>

        <p className="mt-10 text-center sm:mt-12">
          <a href="#contact" className={ctaButtonClass}>
            {texts.about.ctaText}
          </a>
        </p>
      </div>
    </section>
  );
}