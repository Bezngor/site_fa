import { z } from 'zod';
import { texts } from '@/lib/data/texts';

function countDigits(value: string): number {
  return (value.match(/\d/g) ?? []).length;
}

const v = texts.cta.form.validation;

export const contactFormSchema = z.object({
  name: z
    .string()
    .transform((s) => s.trim())
    .pipe(z.string().min(2, v.nameMin)),
  email: z
    .string()
    .transform((s) => s.trim())
    .pipe(z.string().email(v.emailInvalid)),
  phone: z.string().refine((s) => countDigits(s) >= 10, v.phoneDigits),
  message: z
    .string()
    .transform((s) => s.trim())
    .pipe(z.string().min(10, v.messageMin)),
  _gotcha: z
    .union([z.string(), z.undefined()])
    .transform((t) => (t ?? '').trim())
    .refine((s) => s.length === 0, v.honeypot),
});

export type ContactFormSchemaInput = z.input<typeof contactFormSchema>;
export type ContactFormSchemaOutput = z.infer<typeof contactFormSchema>;
