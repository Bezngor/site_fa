import type { ReactNode } from 'react';

type ErrorMessageProps = {
  children: ReactNode;
  hint?: ReactNode;
  showIcon?: boolean;
  className?: string;
};

export function ErrorMessage({ children, hint, showIcon = true, className = '' }: ErrorMessageProps) {
  return (
    <div
      className={`space-y-2 rounded-md bg-amber-50 px-4 py-3 text-sm text-amber-950 ${className}`}
      role="alert"
    >
      <div className="flex gap-3">
        {showIcon ? (
          <svg
            className="mt-0.5 h-5 w-5 shrink-0 text-amber-700"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden
          >
            <path
              fillRule="evenodd"
              d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 00-.75.75v4.5a.75.75 0 001.5 0v-4.5A.75.75 0 0010 5zm0 10a1 1 0 100-2 1 1 0 000 2z"
              clipRule="evenodd"
            />
          </svg>
        ) : null}
        <div className="min-w-0 flex-1 space-y-2">
          <div>{children}</div>
          {hint ? <p className="text-amber-900/90">{hint}</p> : null}
        </div>
      </div>
    </div>
  );
}