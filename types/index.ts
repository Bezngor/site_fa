/**
 * Типизация данных для проекта site_factoryall.
 * Определяет структуру контента для всех секций лендинга.
 */

export interface Metric {
  label: string;
  value: string;
  unit: string;
}

export interface Case {
  title: string;
  description: string;
  image: string;
  metrics: Metric[];
}

export interface HowWeWorkStep {
  step: number;
  title: string;
  description: string;
}

export interface Product {
  name: string;
  description: string;
  image: string;
}

export interface HeroTexts {
  title: string;
  subtitle: string;
}

export interface SectionTexts {
  title: string;
  description?: string;
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
  cta: {
    title: string;
    description: string;
    buttonText: string;
  };
}
