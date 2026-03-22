/**
 * Типизация данных для проекта site_factoryall.
 * Определяет структуру контента для всех секций лендинга.
 */

export interface Metric {
  label: string;
  value: string;
  unit: string;
}

export interface CaseDetail {
  task: string;
  solution: string;
  result: string;
}

export interface Case {
  title: string;
  description: string;
  details: CaseDetail;
  image: string;
  metrics: Metric[];
}

export interface HowWeWorkStep {
  step: number;
  title: string;
  description: string;
}

export interface ProductCategory {
  name: string;
}

export interface HeroTexts {
  title: string;
  subtitle: string;
}

export interface SectionTexts {
  title: string;
  description?: string;
}

export interface CtaTexts {
  title: string;
  description: string;
  buttonText: string;
}

export interface TextsData {
  hero: HeroTexts;
  problems: SectionTexts & { list: string[] };
  howWeWork: {
    title: string;
    steps: HowWeWorkStep[];
  };
  cases: {
    title: string;
    intro: string;
  };
  products: {
    title: string;
  };
  results: SectionTexts & { list: string[] };
  about: SectionTexts;
  cta: CtaTexts;
}