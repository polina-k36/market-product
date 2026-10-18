import Modal from '@/components/layout/modal/Modal';
import Button from '@/components/ui/buttons/Button';
import ButtonIcon from '@/components/ui/buttons/ButtonIcon';
import { useUserProfile } from '@/features/auth/hooks/use-user-profile';
import VerificationLoading from '@/features/verifications/components/VerificationLoading';
import VerificationMessage from '@/features/verifications/components/VerificationMessage';
import VerificationSuccess from '@/features/verifications/components/VerificationSuccess';
import { useCodeEmail } from '@/features/verifications/hooks/use-code-email';
import { useEmailConfirm } from '@/features/verifications/hooks/use-email-confirm';
import { useAuthStore } from '@/stores/auth/auth.store';
import { LoaderCircle, Mail, RotateCcw, ShieldCheck, X } from 'lucide-react';
import {
  useEffect,
  useRef,
  useState,
  type ClipboardEvent,
  type FormEvent,
  type KeyboardEvent,
} from 'react';

interface IVerifyEmailCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CODE_LENGTH = 6;

const VerifyEmailCodeModal = ({
  isOpen,
  onClose,
}: IVerifyEmailCodeModalProps) => {
  //BUG: при изменении почты у меня проблемы с доступам кк верификации вероятно проблемы с токеном или изменение в бд
  const [code, setCode] = useState('');
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  const { data: user } = useUserProfile();

  const {
    mutate: confirmEmail,
    isPending: pendingEmailConfirm,
    isError: isConfirmError,
    reset: resetConfirm,
    isSuccess: isSuccessConfirm,
  } = useEmailConfirm();

  const {
    mutate: sendEmail,
    isPending: pendingSend,
    isError: isSendError,
    reset: resetSend,
  } = useCodeEmail();

  const setAccessToken = useAuthStore((state) => state.setAccessToken);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const sendRef = useRef(0);

  useEffect(() => {
    if (isOpen && sendRef.current === 0 && user?.emailVerified === false) {
      sendEmail();
      sendRef.current += 1;
    }
  }, [isOpen, sendEmail, user]);

  const focusInput = (index: number) => {
    inputRefs.current[index]?.focus();
  };

  const handleChange = (value: string, index: number) => {
    if (pendingEmailConfirm) {
      return;
    }
    resetConfirm();
    const digit = value.replace(/\D/g, '').slice(-1);
    if (!digit) {
      return;
    }
    const codeArray = code.split('');
    codeArray[index] = digit;
    const nextCode = codeArray.join('').slice(0, CODE_LENGTH);
    setCode(nextCode);
    if (index < CODE_LENGTH - 1) {
      focusInput(index + 1);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (pendingEmailConfirm) {
      return;
    }
    resetConfirm();

    if (e.key === 'Backspace') {
      e.preventDefault();
      const codeArray = code.split('');
      if (codeArray[index]) {
        codeArray[index] = '';
        setCode(codeArray.join(''));
        return;
      }

      if (index > 0) {
        codeArray[index - 1] = '';
        setCode(codeArray.join(''));
        focusInput(index - 1);
      }
      return;
    }

    if (e.key === 'ArrowLeft' && index > 0) {
      e.preventDefault();
      focusInput(index - 1);
      return;
    }

    if (e.key === 'ArrowRight' && index < CODE_LENGTH - 1) {
      e.preventDefault();
      focusInput(index + 1);
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    resetConfirm();

    if (pendingEmailConfirm) {
      return;
    }
    const pastedCode = e.clipboardData
      .getData('text')
      .replace(/\D/g, '')
      .slice(0, CODE_LENGTH);
    if (!pastedCode) {
      return;
    }

    setCode(pastedCode);
    const nextIndex = Math.min(pastedCode.length, CODE_LENGTH - 1);
    focusInput(nextIndex);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (code.length !== CODE_LENGTH || pendingEmailConfirm) {
      return;
    }

    confirmEmail(code, {
      onSuccess: (data) => {
        setAccessToken(data.accessToken);
        setCode('');
        setFocusedIndex(null);
      },
    });
  };

  const handleResend = () => {
    if (pendingSend) {
      return;
    }

    setCode('');
    setFocusedIndex(null);
    sendEmail(undefined, {
      onSuccess: () => {
        focusInput(0);
        sendRef.current += 1;
      },
    });
  };

  const handleClose = () => {
    //FIXME: обдумать повторную отправки и отслеживания этих состояний
    resetConfirm();
    resetSend();
    setCode('');
    setFocusedIndex(null);
    sendRef.current = 0;
    onClose();
  };

  return (
    <Modal isOpen={isOpen} size="small">
      <div className="w-full">
        <div className="flex items-start justify-between gap-4 border-b border-border px-5 py-4">
          <div className="flex items-start gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary">
              <Mail className="size-5" />
            </div>

            <div>
              <h2 className="text-base font-semibold text-text-primary">
                Подтверждение почты
              </h2>

              <p className="mt-0.5 text-sm text-text-secondary">
                Подтверждение по коду
              </p>
            </div>
          </div>

          <ButtonIcon
            variant="transparent"
            type="button"
            aria-label="Закрыть"
            onClick={handleClose}
            disabled={pendingEmailConfirm || pendingSend}
          >
            <X className="size-4" />
          </ButtonIcon>
        </div>
        {isSuccessConfirm ? (
          <VerificationSuccess />
        ) : (
          <div className="px-5 py-6">
            <div className="text-center">
              <p className="text-sm text-text-secondary">
                Мы отправили код подтверждения на
              </p>

              <p className="mt-1 font-medium text-text-primary">
                {user?.email}
              </p>
            </div>

            {pendingSend ? (
              <VerificationLoading message="Отправляем новый код..." />
            ) : isSendError ? (
              <div className="mt-6">
                <VerificationMessage variant="error">
                  Не удалось отправить код. Попробуйте ещё раз.
                </VerificationMessage>

                <button
                  type="button"
                  onClick={handleResend}
                  className="mx-auto mt-4 flex items-center gap-1.5 text-xs font-medium text-primary transition hover:text-primary/80"
                >
                  <RotateCcw className="size-3.5" />
                  Попробовать снова
                </button>
              </div>
            ) : (
              <>
                <form
                  id="verify-email-code-form"
                  className="mt-7"
                  onSubmit={handleSubmit}
                >
                  <p className="mb-3 text-center text-xs font-medium text-text-secondary">
                    Введите 6-значный код
                  </p>

                  <div className="flex justify-center gap-2">
                    {Array.from({ length: CODE_LENGTH }).map((_, index) => {
                      const value = code[index] ?? '';
                      const isActive = focusedIndex === index;

                      return (
                        <div
                          key={index}
                          className={`relative flex size-11 items-center justify-center rounded-xl border text-lg font-semibold transition sm:size-12 ${
                            isConfirmError
                              ? 'border-red-400 text-red-500'
                              : isActive
                                ? 'border-primary ring-2 ring-primary/15'
                                : 'border-border text-text-primary'
                          }`}
                        >
                          {value}

                          <input
                            ref={(element) => {
                              inputRefs.current[index] = element;
                            }}
                            type="text"
                            inputMode="numeric"
                            autoComplete={index === 0 ? 'one-time-code' : 'off'}
                            maxLength={1}
                            value={value}
                            onChange={(e) =>
                              handleChange(e.target.value, index)
                            }
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            onPaste={handlePaste}
                            onFocus={() => setFocusedIndex(index)}
                            onBlur={() => setFocusedIndex(null)}
                            aria-label={`Цифра ${index + 1}`}
                            className="absolute inset-0 h-full w-full cursor-text opacity-0 outline-none"
                          />
                        </div>
                      );
                    })}
                  </div>

                  {isConfirmError && (
                    <div className="mt-4">
                      <VerificationMessage variant="error">
                        Неверный код. Проверьте цифры и попробуйте ещё раз.
                      </VerificationMessage>
                    </div>
                  )}
                </form>

                <button
                  type="button"
                  onClick={handleResend}
                  disabled={pendingEmailConfirm}
                  className="mx-auto mt-5 flex items-center gap-1.5 text-xs font-medium text-primary transition hover:text-primary/80 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <RotateCcw className="size-3.5" />
                  Отправить код повторно
                </button>
              </>
            )}
          </div>
        )}

        <div className="flex items-center justify-end gap-2 border-t border-border px-5 py-4">
          <Button variant="transparent" type="button" onClick={handleClose}>
            Закрыть
          </Button>
          {!isSuccessConfirm && (
            <Button
              variant="primary"
              type="submit"
              form="verify-email-code-form"
              disabled={
                code.length !== CODE_LENGTH ||
                pendingEmailConfirm ||
                pendingSend
              }
            >
              {pendingEmailConfirm ? (
                <>
                  <LoaderCircle className="size-4 animate-spin" />
                  Проверяем...
                </>
              ) : (
                <>
                  <ShieldCheck className="size-4" />
                  Подтвердить
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default VerifyEmailCodeModal;
