'use client';

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type FormEvent,
} from 'react';
import { Button, ErrorMessage, FormInput, FormTextarea, SuccessMessage } from '@/components/ui';
import { texts } from '@/lib/data/texts';
import { submitContactFormToFormspree } from '@/lib/utils/formspree';
import { contactFormSchema } from '@/lib/validation/contactFormSchema';

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error';

type CtaFormSubmitContextValue = {
  status: SubmitStatus;
  errorMessage: string | undefined;
  setStatus: (s: SubmitStatus, err?: string) => void;
};

const CtaFormSubmitContext = createContext<CtaFormSubmitContextValue | null>(null);

function useCtaFormSubmit() {
  const ctx = useContext(CtaFormSubmitContext);
  if (!ctx) {
    throw new Error('useCtaFormSubmit must be used within CtaFormSubmitContext.Provider');
  }
  return ctx;
}

function contactEmail(): string {
  return process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || 'hello@factoryall.ru';
}

function openMailtoFallback(data: { name: string; email: string; phone: string; message: string }) {
  const to = contactEmail();
  const subject = encodeURIComponent('Заявка: экспресс-диагностика FactoryAll');
  const body = encodeURIComponent(
    `Имя: ${data.name}\nEmail: ${data.email}\nТелефон: ${data.phone}\n\n${data.message}`,
  );
  window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
}

type FieldKey = 'name' | 'email' | 'phone' | 'message';

function ContactFormBody() {
  const { status, errorMessage, setStatus } = useCtaFormSubmit();
  const f = texts.cta.form;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [_gotcha, setGotcha] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<FieldKey, string>>>({});

  const fallbackHintResolved = useMemo(
    () => f.fallbackHint.replace(/hello@factoryall\.ru/g, contactEmail()),
    [f.fallbackHint],
  );

  const resetFeedback = useCallback(() => {
    setStatus('idle');
    setFieldErrors({});
  }, [setStatus]);

  const onSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      resetFeedback();

      const parsed = contactFormSchema.safeParse({ name, email, phone, message, _gotcha });
      if (!parsed.success) {
        const fe = parsed.error.flatten().fieldErrors;
        if (fe._gotcha?.[0]) {
          setStatus('error', fe._gotcha[0]);
          return;
        }
        setFieldErrors({
          name: fe.name?.[0],
          email: fe.email?.[0],
          phone: fe.phone?.[0],
          message: fe.message?.[0],
        });
        return;
      }

      const { name: n, email: em, phone: ph, message: msg } = parsed.data;
      const payload = { name: n, email: em, phone: ph, message: msg };
      const formId = process.env.NEXT_PUBLIC_FORMSPREE_ID?.trim();

      if (!formId) {
        setStatus('error', f.errorMessage);
        openMailtoFallback(payload);
        return;
      }

      setStatus('loading');
      try {
        const result = await submitContactFormToFormspree(formId, payload, {
          honeypot: parsed.data._gotcha,
        });
        if (result.ok) {
          setStatus('success');
          setName('');
          setEmail('');
          setPhone('');
          setMessage('');
          setGotcha('');
          return;
        }
        setStatus('error', f.errorMessage);
        openMailtoFallback(payload);
      } catch {
        setStatus('error', f.errorMessage);
        openMailtoFallback(payload);
      }
    },
    [email, f.errorMessage, message, name, phone, resetFeedback, setStatus, _gotcha],
  );

  const disabled = status === 'loading';

  if (status === 'success') {
    return (
      <SuccessMessage
        className="mx-auto mt-10 max-w-xl"
        message={f.successMessage}
        backLabel={f.successBackLabel}
        onBack={() => setStatus('idle')}
      />
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="relative mx-auto mt-10 max-w-xl space-y-6"
      noValidate
    >
      <FormInput
        id="cta-name"
        name="name"
        type="text"
        autoComplete="name"
        label={f.nameLabel}
        placeholder={f.namePlaceholder}
        value={name}
        error={fieldErrors.name}
        errorId="cta-name-error"
        disabled={disabled}
        onChange={(e) => {
          setName(e.target.value);
          if (fieldErrors.name) setFieldErrors((prev) => ({ ...prev, name: undefined }));
        }}
      />

      <FormInput
        id="cta-email"
        name="email"
        type="email"
        autoComplete="email"
        label={f.emailLabel}
        placeholder={f.emailPlaceholder}
        value={email}
        error={fieldErrors.email}
        errorId="cta-email-error"
        disabled={disabled}
        onChange={(e) => {
          setEmail(e.target.value);
          if (fieldErrors.email) setFieldErrors((prev) => ({ ...prev, email: undefined }));
        }}
      />

      <FormInput
        id="cta-phone"
        name="phone"
        type="tel"
        autoComplete="tel"
        label={f.phoneLabel}
        placeholder={f.phonePlaceholder}
        value={phone}
        error={fieldErrors.phone}
        errorId="cta-phone-error"
        disabled={disabled}
        onChange={(e) => {
          setPhone(e.target.value);
          if (fieldErrors.phone) setFieldErrors((prev) => ({ ...prev, phone: undefined }));
        }}
      />

      <div className="absolute -left-[5000px] top-auto" aria-hidden>
        <label htmlFor="cta-gotcha">{f.honeypotInputLabel}</label>
        <input
          id="cta-gotcha"
          name="_gotcha"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={_gotcha}
          onChange={(e) => setGotcha(e.target.value)}
        />
      </div>

      <FormTextarea
        id="cta-message"
        name="message"
        label={f.messageLabel}
        placeholder={f.messagePlaceholder}
        value={message}
        error={fieldErrors.message}
        errorId="cta-message-error"
        disabled={disabled}
        onChange={(e) => {
          setMessage(e.target.value);
          if (fieldErrors.message) setFieldErrors((prev) => ({ ...prev, message: undefined }));
        }}
      />

      {status === 'error' && errorMessage ? (
        <ErrorMessage hint={fallbackHintResolved}>{errorMessage}</ErrorMessage>
      ) : null}

      <Button
        type="submit"
        disabled={disabled}
        isLoading={status === 'loading'}
        className="w-full sm:w-auto"
      >
        {status === 'loading' ? f.submittingLabel : texts.cta.buttonText}
      </Button>
    </form>
  );
}

export default function CtaFormSection() {
  const [status, setStatusState] = useState<SubmitStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  const setStatus = useCallback((s: SubmitStatus, err?: string) => {
    setStatusState(s);
    setErrorMessage(err);
  }, []);

  const ctxValue = useMemo(
    () => ({ status, errorMessage, setStatus }),
    [status, errorMessage, setStatus],
  );

  return (
    <section id="contact" className="bg-gray-100 py-20">
      <div className="container-custom max-w-3xl text-center">
        <h2 className="mb-4 text-3xl font-bold text-primary md:text-4xl">{texts.cta.title}</h2>
        <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-700">
          {texts.cta.description}
        </p>
        <CtaFormSubmitContext.Provider value={ctxValue}>
          <ContactFormBody />
        </CtaFormSubmitContext.Provider>
      </div>
    </section>
  );
}