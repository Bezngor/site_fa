import React, { forwardRef } from 'react';

type CommonProps = {
  label: string;
  error?: string;
  className?: string;
  id?: string;
};

export type InputFieldProps = CommonProps &
  React.InputHTMLAttributes<HTMLInputElement>;

export type TextareaFieldProps = CommonProps &
  React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const inputId =
      id ?? `field-${label.replace(/\s+/g, '-').toLowerCase()}`;

    const inputStyles = `w-full rounded-md border ${
      error ? 'border-red-500' : 'border-gray-300'
    } bg-white p-3 text-primary outline-none transition-colors focus:ring-2 focus:ring-accent`;

    return (
      <div className="flex flex-col gap-1">
        <label htmlFor={inputId} className="text-sm font-medium text-primary">
          {label}
        </label>
        <input
          {...props}
          id={inputId}
          ref={ref}
          className={`${inputStyles} ${className ?? ''}`}
        />
        {error && <span className="text-sm text-red-500">{error}</span>}
      </div>
    );
  },
);

InputField.displayName = 'InputField';

export const TextareaField = forwardRef<
  HTMLTextAreaElement,
  TextareaFieldProps
>(({ label, error, className, id, ...props }, ref) => {
  const inputId =
    id ?? `field-${label.replace(/\s+/g, '-').toLowerCase()}`;

  const inputStyles = `w-full rounded-md border ${
    error ? 'border-red-500' : 'border-gray-300'
  } bg-white p-3 text-primary outline-none transition-colors focus:ring-2 focus:ring-accent`;

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={inputId} className="text-sm font-medium text-primary">
        {label}
      </label>
      <textarea
        {...props}
        id={inputId}
        ref={ref}
        className={`${inputStyles} min-h-[100px] resize-y ${
          className ?? ''
        }`}
      />
      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  );
});

TextareaField.displayName = 'TextareaField';