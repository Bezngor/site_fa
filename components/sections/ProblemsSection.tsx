import { texts } from '@/lib/data/texts';
import { AlertCircle, ShieldAlert, Zap, Target } from 'lucide-react';

const icons = [AlertCircle, ShieldAlert, Zap, Target];

export default function ProblemsSection() {
  return (
    <section id="problems" className="py-20 bg-white">
      <div className="container-custom">
        <h2 className="mb-12 text-center text-3xl font-bold text-[#1B2A4A] md:text-4xl">
          {texts.problems.title}
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {texts.problems.list.map((problem, index) => {
            const Icon = icons[index % icons.length];
            return (
              <div key={index} className="flex items-start gap-4 p-6 border border-gray-100 rounded-lg shadow-sm">
                <Icon className="h-8 w-8 text-[#F59E0B] shrink-0" />
                <p className="text-lg text-[#1B2A4A]">{problem}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}