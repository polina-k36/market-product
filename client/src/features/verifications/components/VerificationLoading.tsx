import { LoaderCircle } from 'lucide-react';

interface IVerificationLoadingProps {
  message: string;
}

const VerificationLoading = ({ message }: IVerificationLoadingProps) => {
  return (
    <div className="flex min-h-40 flex-col items-center justify-center gap-3">
      <div className="flex size-11 items-center justify-center rounded-full bg-primary-soft text-primary">
        <LoaderCircle className="size-5 animate-spin" />
      </div>

      <p className="text-sm font-medium text-text-secondary">{message}</p>
    </div>
  );
};

export default VerificationLoading;
