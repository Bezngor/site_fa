/** Валидные значения под `contactFormSchema` (телефон ≥10 цифр, сообщение ≥10 символов после trim). */
export const validContactForm = {
  name: 'Иван',
  email: 'ivan@example.com',
  phone: '+7 (999) 123-45-67',
  message: 'Тестовое сообщение для проверки формы на главной.',
} as const;