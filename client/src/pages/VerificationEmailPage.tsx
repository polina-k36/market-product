import VerificationConfirmEmailLink from '@/features/verifications/components/VerificationConfirmEmailLink';
import { useSearchParams } from 'react-router';

const VerificationEmailPage = () => {
  const [searchParams] = useSearchParams();
  return (
    <>
      {searchParams.get('token') !== null ? (
        <VerificationConfirmEmailLink token={searchParams.get('token') ?? ''} />
      ) : (
        'пусто'
      )}
    </>
  );
};

export default VerificationEmailPage;
