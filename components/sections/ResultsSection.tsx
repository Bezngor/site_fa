import { texts } from '@/lib/data/texts';

export default function ResultsSection() {
  return (
    <section id="results" className="py-20 bg-[#1B2A4A] text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6 text-center">{texts.results.title}</h2>
        <p className="mx-auto mb-12 max-w-3xl text-center text-lg text-gray-300">
          {texts.results.intro}
        </p>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {texts.results.columns.map((col) => (
            <div key={col.heading} className="text-left">
              <h3 className="mb-4 text-lg font-bold text-white">{col.heading}</h3>
              <ul className="list-disc space-y-3 pl-5 text-gray-300">
                {col.points.map((point, i) => (
                  <li key={`${col.heading}-${i}`}>{point}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}