import { texts } from '@/lib/data/texts';

export default function HowWeWorkSection() {
  return (
    <section id="how-we-work" className="bg-white py-20">
      <div className="container-custom">
        <h2 className="mb-16 text-center text-3xl font-bold text-[#1B2A4A] md:text-4xl">
          {texts.howWeWork.title}
        </h2>
        <div className="relative mx-auto max-w-3xl">
          {/* Вертикальная линия */}
          <div className="absolute top-4 left-6 h-[calc(100%-2rem)] w-0.5 bg-[#1B2A4A]/20 md:left-1/2 md:-ml-0.5" />

          <div className="flex flex-col gap-12">
            {texts.howWeWork.steps.map((step) => (
              <div key={step.step} className="relative flex gap-6 md:gap-12">
                {/* Номер шага */}
                <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-[#F59E0B] bg-white text-lg font-bold text-[#F59E0B]">
                  {step.step}
                </div>
                {/* Контент */}
                <div className="max-w-prose pt-2">
                  <h3 className="text-xl font-bold text-[#1B2A4A]">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-[#1B2A4A]/80">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="relative z-10 mx-auto mt-16 max-w-3xl border-t border-[#1B2A4A]/15 pt-10 text-center md:text-left">
            <h3 className="text-lg font-bold text-[#1B2A4A]">
              {texts.howWeWork.artifacts.title}
            </h3>
            <p className="mt-3 text-[#1B2A4A]/80">
              {texts.howWeWork.artifacts.body}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
