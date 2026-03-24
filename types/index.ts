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

export interface HowWeWorkArtifacts {
  title: string;
  body: string;
}

/** Имя иконки Lucide для колонки «Результаты» (как у карточек продуктовой линейки). */
export type ResultsColumnIcon = 'Search' | 'Settings2' | 'TrendingUp';

/** Имя иконки Lucide для карточек «О нас» (тот же стиль ключей, что у ResultsColumn). */
export type AboutFeatureIcon = 'Settings2' | 'Layers' | 'LineChart' | 'Headphones';

export interface AboutFeature {
  icon: AboutFeatureIcon;
  title: string;
  text: string;
}

export interface ResultsColumn {
  heading: string;
  points: string[];
  icon?: ResultsColumnIcon;
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
  noteLead: string;
  noteLink: string;
  noteTrail: string;
}

export interface SectionTexts {
  title: string;
  description?: string;
}

export interface CtaFormFields {
  nameLabel: string;
  namePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  phoneLabel: string;
  phonePlaceholder: string;
  messageLabel: string;
  messagePlaceholder: string;
  honeypotInputLabel: string;
  successMessage: string;
  successBackLabel: string;
  submittingLabel: string;
  errorMessage: string;
  fallbackHint: string;
  validation: {
    nameMin: string;
    emailInvalid: string;
    phoneDigits: string;
    messageMin: string;
    honeypot: string;
  };
}

export interface CtaTexts {
  title: string;
  description: string;
  buttonText: string;
  form: CtaFormFields;
}

export interface TextsData {
  hero: HeroTexts;
  problems: SectionTexts & { list: string[] };
  howWeWork: {
    title: string;
    steps: HowWeWorkStep[];
    artifacts: HowWeWorkArtifacts;
  };
  cases: {
    title: string;
    intro: string;
  };
  products: {
    title: string;
  };
  results: SectionTexts & { intro: string; columns: ResultsColumn[] };
  about: SectionTexts & { features: AboutFeature[]; ctaText: string };
  cta: CtaTexts;
  productLine: {
    title: string;
    subtitle: string;
  };
}

/** Данные контактной формы после валидации (без honeypot). */
export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

/** Состояние отправки формы в UI. */
export type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export type FormspreeSubmitResult =
  | { ok: true }
  | { ok: false; reason: 'timeout' | 'network' | 'http' };