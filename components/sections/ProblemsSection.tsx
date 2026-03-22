import { texts } from '@/lib/data/texts';

export default function ProblemsSection() {
  return (
    <section className="bg-white py-20 animate-fade-in">
      <div className="container-custom">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-[#1B2A4A] md:text-4xl">
            {texts.problems.title}
          </h2>
          {texts.problems.description && (
            <p className="mt-4 text-lg text-[#1B2A4A]/80">
              {texts.problems.description}
            </p>
          )}
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {texts.problems.list.map((problem, index) => (
            <div
              key={index}
              className="flex flex-col rounded-lg border border-gray-100 p-6 shadow-sm transition-transform duration-300 hover:-translate-y-1"
            >
              <span className="text-5xl font-bold text-[#F59E0B]">
                {String(index + 1).padStart(2, '0')}
              </span>
              <p className="mt-4 text-lg text-[#1B2A4A]">{problem}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}