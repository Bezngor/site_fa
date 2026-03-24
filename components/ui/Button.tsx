import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  isLoading = false,
  className = '',
  disabled,
  children,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center gap-2 rounded-md px-6 py-3 font-semibold transition-all duration-200 disabled:cursor-not-allowed';
  const variants: Record<'primary' | 'secondary', string> = {
    primary: 'bg-accent text-primary hover:bg-amber-500',
    secondary:
      'bg-transparent border-2 border-accent text-accent hover:bg-accent hover:text-primary',
  };

  const isDisabled = disabled || isLoading;

  return (
    <button
      {...props}
      disabled={isDisabled}
      aria-disabled={isDisabled}
      aria-busy={isLoading}
      className={`${baseStyles} ${variants[variant]} ${
        isLoading ? 'opacity-70' : ''
      } ${isDisabled && !isLoading ? 'opacity-70' : ''} ${className}`}
    >
      {isLoading && (
        <svg
          className="h-5 w-5 animate-spin"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      )}
      {children}
    </button>
  );
};