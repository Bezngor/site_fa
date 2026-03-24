import { Button } from './Button';

type SuccessMessageProps = {
  message: string;
  onBack: () => void;
  backLabel?: string;
  className?: string;
};

export function SuccessMessage({
  message,
  onBack,
  backLabel = 'Вернуться',
  className = '',
}: SuccessMessageProps) {
  return (
    <div
      className={`rounded-md border border-emerald-200 bg-emerald-50 px-4 py-4 text-left text-sm text-emerald-900 shadow-sm ${className}`}
      role="status"
    >
      <p className="mb-4 leading-relaxed">{message}</p>
      <Button type="button" variant="secondary" onClick={onBack} className="rounded-md">
        {backLabel}
      </Button>
    </div>
  );
}