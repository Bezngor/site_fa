import { forwardRef, useId, type TextareaHTMLAttributes } from 'react';

export type FormTextareaProps = {
  label: string;
  error?: string;
  errorId?: string;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

export const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  ({ label, error, errorId, id, className, disabled, rows = 5, ...props }, ref) => {
    const fallbackId = useId();
    const textareaId = id ?? fallbackId;
    const errId = errorId ?? `${textareaId}-error`;
    const hasError = Boolean(error);

    const controlClass = [
      'w-full resize-y rounded-md border bg-white px-4 py-2.5 text-gray-900 shadow-sm',
      'placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-accent/30 disabled:opacity-60',
      hasError
        ? 'border-red-500 focus:border-red-500 focus:ring-red-500/30'
        : 'border-gray-300 focus:border-accent',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div>
        <label htmlFor={textareaId} className="mb-1.5 block text-sm font-medium text-primary">
          {label}
        </label>
        <textarea
          {...props}
          id={textareaId}
          ref={ref}
          rows={rows}
          disabled={disabled}
          aria-invalid={hasError}
          aria-describedby={hasError ? errId : undefined}
          className={controlClass}
        />
        {hasError ? (
          <p id={errId} className="mt-1.5 text-sm text-red-600" role="alert">
            {error}
          </p>
        ) : null}
      </div>
    );
  },
);

FormTextarea.displayName = 'FormTextarea';