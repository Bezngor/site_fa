import { texts } from '@/lib/data/texts';

export default function ResultsSection() {
  return (
    <section id="results" className="py-20 bg-[#1B2A4A] text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">{texts.results.title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {texts.results.list.map((item, index) => (
            <div key={index} className="text-center">
              <p className="text-lg text-gray-300">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}