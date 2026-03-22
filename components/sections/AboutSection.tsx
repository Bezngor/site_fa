import { texts } from '@/lib/data/texts';

export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container-custom max-w-3xl text-center">
        <h2 className="mb-8 text-3xl font-bold text-[#1B2A4A] md:text-4xl">
          {texts.about.title}
        </h2>
        <p className="text-lg leading-relaxed text-gray-700">
          {texts.about.description}
        </p>
      </div>
    </section>
  );
}