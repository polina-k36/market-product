import { CircleAlert } from 'lucide-react';

interface IFieldErrorProps {
  message?: string;
}

const FieldError = ({ message }: IFieldErrorProps) => {
  if (!message) return null;

  return (
    <div
      role="alert"
      className="mt-2 flex animate-field-error items-center gap-2 rounded-lg border border-danger/20 bg-danger/10 px-3 py-2 text-xs font-medium text-danger"
    >
      <CircleAlert className="size-3.5 shrink-0" />
      <span>{message}</span>
    </div>
  );
};

export default FieldError;
