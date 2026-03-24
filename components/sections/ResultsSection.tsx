import type { ReactNode } from 'react';
import { Search, Settings2, TrendingUp } from 'lucide-react';
import { texts } from '@/lib/data/texts';
import type { ResultsColumnIcon } from '@/types';

const iconMap: Record<ResultsColumnIcon, typeof Search> = {
  Search,
  Settings2,
  TrendingUp,
};

/** Подсвечивает диапазоны, сроки и проценты в копирайте секции (без markdown). */
function renderPointWithMetricAccents(text: string): ReactNode {
  const re =
    /\d+[–-]\d+%|\d+[–-]\d+\s*(?:недели|недель|месяцев|месяца)(?=[\s:;,—.!?]|$)|\d+%/g;
  const out: ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  let n = 0;
  re.lastIndex = 0;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) {
      out.push(text.slice(last, m.index));
    }
    out.push(
      <span key={`${m.index}-${n++}`} className="font-semibold text-accent tabular-nums">
        {m[0]}
      </span>
    );
    last = m.index + m[0].length;
  }
  if (last < text.length) {
    out.push(text.slice(last));
  }
  return out.length ? <>{out}</> : text;
}

export default function ResultsSection() {
  return (
    <section
      id="results"
      className="border-y border-white/10 bg-primary py-16 text-white sm:py-20"
      aria-labelledby="results-heading"
    >
      <div className="container mx-auto px-4">
        <header className="mx-auto mb-10 max-w-3xl text-center sm:mb-14">
          <h2
            id="results-heading"
            className="font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl"
          >
            {texts.results.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-gray-300 sm:text-lg">
            {texts.results.intro}
          </p>
        </header>
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 sm:gap-8 md:grid-cols-3">
          {texts.results.columns.map((col) => {
            const Icon = col.icon ? iconMap[col.icon] : null;
            return (
              <article
                key={col.heading}
                className="flex flex-col rounded-xl border border-white/10 bg-white/[0.06] p-6 shadow-sm backdrop-blur-sm sm:p-7"
              >
                {Icon ? (
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/15">
                    <Icon className="h-7 w-7 text-accent" aria-hidden />
                  </div>
                ) : null}
                <h3 className="mb-4 text-lg font-semibold leading-snug tracking-tight text-white sm:text-xl">
                  {col.heading}
                </h3>
                <ul className="list-disc space-y-3 pl-5 text-sm leading-relaxed text-gray-300 marker:text-accent/80 sm:text-base">
                  {col.points.map((point, i) => (
                    <li key={`${col.heading}-${i}`}>
                      {renderPointWithMetricAccents(point)}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
