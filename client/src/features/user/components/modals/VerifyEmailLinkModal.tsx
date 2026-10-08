import Modal from '@/components/layout/modal/Modal';
import Button from '@/components/ui/buttons/Button';
import ButtonIcon from '@/components/ui/buttons/ButtonIcon';
import VerificationLoading from '@/features/verifications/components/VerificationLoading';
import VerificationMessage from '@/features/verifications/components/VerificationMessage';
import VerificationSuccess from '@/features/verifications/components/VerificationSuccess';
import { useUserProfile } from '@/features/auth/hooks/use-user-profile';
import { CheckCircle2, Mail, RefreshCw, X } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useLinkEmail } from '@/features/verifications/hooks/use-link-email';

interface IVerifyEmailLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const VerifyEmailLinkModal = ({
  isOpen,
  onClose,
}: IVerifyEmailLinkModalProps) => {
  const { data: user } = useUserProfile();

  const {
    mutate: sendEmail,
    isPending: pendingSend,
    isError: isSendError,
    reset: resetSend,
  } = useLinkEmail();
  const sendRef = useRef(0);

  useEffect(() => {
    console.log('use effect');
    if (isOpen && sendRef.current === 0 && user?.emailVerified === false) {
      sendEmail();
      console.log('if');
      sendRef.current += 1;
    }
  }, [isOpen, sendEmail, user]);

  const handleResend = () => {
    if (pendingSend || user?.emailVerified === true) {
      return;
    }
    resetSend();
    sendEmail();
    sendRef.current += 1;
  };

  const handleClose = () => {
    resetSend();
    sendRef.current = 0;
    onClose();
  };

  return (
    <Modal isOpen={isOpen} size="small">
      <div className="w-full">
        <div className="flex items-start justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary">
              <Mail className="size-5" />
            </div>

            <div>
              <h2 className="text-base font-semibold text-text-primary">
                Подтверждение почты
              </h2>

              <p className="mt-0.5 text-sm text-text-secondary">
                Подтверждение по ссылке
              </p>
            </div>
          </div>

          <ButtonIcon
            variant="transparent"
            type="button"
            aria-label="Закрыть"
            onClick={handleClose}
            disabled={pendingSend}
          >
            <X className="size-4" />
          </ButtonIcon>
        </div>

        {user?.emailVerified === true ? (
          <VerificationSuccess
            title="Почта уже подтверждена"
            message="Ваш email уже подтверждён. Повторная верификация не требуется."
          />
        ) : pendingSend ? (
          <VerificationLoading message="Отправляем письмо с подтверждением..." />
        ) : isSendError ? (
          <div className="px-5 py-7 sm:px-6">
            <VerificationMessage variant="error">
              Не удалось отправить письмо с подтверждением. Попробуйте ещё раз.
            </VerificationMessage>

            <button
              type="button"
              onClick={handleResend}
              className="mx-auto mt-5 flex items-center gap-1.5 text-xs font-medium text-primary transition-colors hover:text-primary/80"
            >
              <RefreshCw className="size-3.5" />
              Попробовать снова
            </button>
          </div>
        ) : (
          <div className="px-5 py-7 text-center sm:px-6">
            <div className="mx-auto mb-5 flex size-16 items-center justify-center rounded-2xl bg-primary-soft text-primary">
              <Mail className="size-7" />
            </div>

            <h3 className="text-lg font-semibold text-text-primary">
              Проверьте свою почту
            </h3>

            <p className="mx-auto mt-2 max-w-sm text-sm leading-5 text-text-secondary">
              Мы отправили письмо с подтверждением на адрес
            </p>

            <p className="mt-1 text-sm font-semibold text-text-primary">
              {user?.email}
            </p>

            <div className="mt-6 rounded-xl border border-border bg-surface-muted/30 p-4 text-left">
              <div className="flex gap-3">
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" />

                <div>
                  <p className="text-sm font-semibold text-text-primary">
                    Перейдите по ссылке из письма
                  </p>

                  <p className="mt-1 text-xs leading-5 text-text-secondary">
                    После перехода по ссылке ваш email будет автоматически
                    подтверждён.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-center gap-1.5 text-xs text-text-secondary">
              <span>Не получили письмо?</span>

              <button
                type="button"
                onClick={handleResend}
                disabled={pendingSend}
                className="inline-flex items-center gap-1 font-semibold text-primary transition-colors hover:text-primary/80 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <RefreshCw className="size-3.5" />
                Отправить повторно
              </button>
            </div>
          </div>
        )}

        <div className="flex justify-end border-t border-border px-5 py-4 sm:px-6">
          <Button
            variant="transparent"
            type="button"
            onClick={handleClose}
            disabled={pendingSend}
          >
            Закрыть
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default VerifyEmailLinkModal;
