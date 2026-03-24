import type { ContactFormData, FormspreeSubmitResult } from '@/types';

const DEFAULT_TIMEOUT_MS = 12_000;

export type SubmitContactFormOptions = {
  timeoutMs?: number;
  /** Honeypot для Formspree; при успешной клиентской валидации — пустая строка. */
  honeypot?: string;
};

/**
 * POST JSON на Formspree. Без UI: AbortController, таймаут по умолчанию 12 с.
 */
export async function submitContactFormToFormspree(
  formId: string,
  data: ContactFormData,
  options: SubmitContactFormOptions = {},
): Promise<FormspreeSubmitResult> {
  const timeoutMs = options.timeoutMs ?? DEFAULT_TIMEOUT_MS;
  const honeypot = options.honeypot ?? '';
  const url = `https://formspree.io/f/${formId.trim()}`;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        phone: data.phone,
        message: data.message,
        _replyto: data.email,
        _gotcha: honeypot,
      }),
      signal: controller.signal,
    });

    if (!res.ok) {
      return { ok: false, reason: 'http' };
    }
    return { ok: true };
  } catch (err) {
    const isAbort =
      err instanceof DOMException
        ? err.name === 'AbortError'
        : err instanceof Error && err.name === 'AbortError';
    if (isAbort) {
      return { ok: false, reason: 'timeout' };
    }
    return { ok: false, reason: 'network' };
  } finally {
    clearTimeout(timer);
  }
}