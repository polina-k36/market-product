import { CheckCircle2 } from 'lucide-react';

interface IVerificationSuccessProps {
  title?: string;
  message?: string;
}

const VerificationSuccess = ({
  title = 'Почта подтверждена',
  message = 'Ваш email успешно подтверждён.',
}: IVerificationSuccessProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-8 text-center">
      <div className="flex size-14 items-center justify-center rounded-full bg-success/10 text-success">
        <CheckCircle2 className="size-7" />
      </div>

      <h3 className="mt-4 text-base font-semibold text-text-primary">
        {title}
      </h3>

      <p className="mt-1.5 max-w-xs text-sm leading-5 text-text-secondary">
        {message}
      </p>
    </div>
  );
};

export default VerificationSuccess;
