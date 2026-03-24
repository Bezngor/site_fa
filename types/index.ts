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
  id?: number;
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

export interface Product {
  id: string;
  name: string;
  features: string[];
  icon: string;
  ctaLabel: string;
}

export interface NavLink {
  href: string;
  label: string;
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
  productLine: {
    title: string;
    subtitle: string;
  };
}