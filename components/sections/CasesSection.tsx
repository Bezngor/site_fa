'use client';

import { useState } from 'react';
import Image from 'next/image';
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
                type="button"
                onClick={() => toggleCase(index)}
                aria-expanded={openStates[index]}
                className="flex w-full items-center justify-between bg-gray-50 p-6 transition-colors hover:bg-gray-100"
              >
                <span className="font-semibold text-[#1B2A4A]">{item.title}</span>
                <ChevronDown className={`transition-transform duration-300 ${openStates[index] ? 'rotate-180' : ''}`} aria-hidden />
              </button>
              
              <div className={`accordion-content ${openStates[index] ? 'open' : ''}`}>
                <div className="overflow-hidden px-6 pb-6">
                  {openStates[index] ? (
                    <div className="relative mb-4 aspect-video w-full overflow-hidden rounded-md border border-[#1B2A4A]/15">
                      <Image
                        src={item.image}
                        alt={item.imageAlt || item.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        loading="lazy"
                      />
                    </div>
                  ) : null}
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