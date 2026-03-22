'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cases } from '../../lib/data/cases';

export default function CasesSection() {
  const [openStates, setOpenStates] = useState([false, false, false]);

  const toggleCase = (index: number) => {
    setOpenStates((prev) => prev.map((state, i) => (i === index ? !state : state)));
  };

  return (
    <section id="cases" className="py-20 bg-white">
      <div className="container-custom">
        <h2 className="text-3xl font-bold text-[#1B2A4A] mb-12 text-center">Наши кейсы</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {cases.map((item, index) => (
            <div key={item.title} className="border border-[#1B2A4A]/20 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleCase(index)}
                className="w-full p-6 flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <span className="font-semibold text-[#1B2A4A]">{item.title}</span>
                <ChevronDown className={`transition-transform duration-300 ${openStates[index] ? 'rotate-180' : ''}`} />
              </button>
              
              <div className={`accordion-content ${openStates[index] ? 'open' : ''}`}>
                <div className="overflow-hidden px-6 pb-6">
                  <p className="mb-4 text-gray-600">{item.description}</p>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-bold text-[#1B2A4A]">Задача</h4>
                      <p className="text-sm text-gray-700">{item.details.task}</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-[#1B2A4A]">Решение</h4>
                      <p className="text-sm text-gray-700">{item.details.solution}</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-[#1B2A4A]">Результат</h4>
                      <p className="text-sm text-gray-700">{item.details.result}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}