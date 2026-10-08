import Button from '@/components/ui/buttons/Button';
import VerificationLoading from '@/features/verifications/components/VerificationLoading';
import VerificationMessage from '@/features/verifications/components/VerificationMessage';
import { useAuthStore } from '@/stores/auth/auth.store';
import { CheckCircle2, Mail, ShieldCheck, UserRound } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useEmailConfirm } from '../hooks/use-email-confirm';
import { useUserProfile } from '@/features/auth/hooks/use-user-profile';
import { useNavigate } from 'react-router';

interface IVerificationConfirmEmailLinkProps {
  token: string;
}

const VerificationConfirmEmailLink = ({
  token,
}: IVerificationConfirmEmailLinkProps) => {
  const navigate = useNavigate();

  const { data: user, isLoading: isUserLoading } = useUserProfile();

  const {
    mutate: confirmEmail,
    isPending: pendingEmailConfirm,
    isError: isConfirmError,
    reset: resetConfirm,
    isSuccess: isSuccessConfirm,
  } = useEmailConfirm();

  const setAccessToken = useAuthStore((state) => state.setAccessToken);

  const confirmedRef = useRef(false);

  const isAlreadyVerified = user?.emailVerified === true;

  useEffect(() => {
    if (isUserLoading) return;
    if (isAlreadyVerified) {
      confirmedRef.current = true;
      return;
    }

    if (confirmedRef.current) return;

    confirmEmail(token, {
      onSuccess: (data) => {
        setAccessToken(data.accessToken);
      },
    });

    confirmedRef.current = true;
  }, [token, isUserLoading, isAlreadyVerified]);

  const handleRetry = () => {
    resetConfirm();

    confirmEmail(token, {
      onSuccess: (data) => {
        setAccessToken(data.accessToken);
      },
    });
  };

  const handleProfile = () => {
    navigate('/profile?mode=settings');
  };

  /*
   * ---------------------------------------------------------
   * Уже подтверждена
   * ---------------------------------------------------------
   */
  if (isAlreadyVerified) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background px-4 py-10">
        <div className="w-full max-w-md">
          <div className="overflow-hidden rounded-3xl border border-border bg-surface shadow-sm">
            <div className="px-6 py-8">
              <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-success/10 text-success">
                <ShieldCheck className="size-8" />
              </div>

              <div className="mt-5 text-center">
                <h1 className="text-xl font-bold text-text-primary">
                  Почта уже подтверждена
                </h1>

                <p className="mt-2 text-sm leading-5 text-text-secondary">
                  Этот email уже был подтверждён ранее. Вы можете продолжить
                  пользоваться аккаунтом.
                </p>
              </div>

              <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-surface-muted/30">
                <div className="flex items-center gap-3 border-b border-border px-4 py-3.5">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary-soft text-primary">
                    <UserRound className="size-4" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs text-text-secondary">Имя</p>

                    <p className="truncate text-sm font-semibold text-text-primary">
                      {user?.name ?? '—'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 px-4 py-3.5">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary-soft text-primary">
                    <Mail className="size-4" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs text-text-secondary">Email</p>

                    <p className="truncate text-sm font-semibold text-text-primary">
                      {user?.email ?? '—'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <Button
                  variant="primary"
                  type="button"
                  onClick={handleProfile}
                  className="w-full"
                >
                  Перейти в профиль
                </Button>
              </div>
            </div>
          </div>

          <p className="mt-5 text-center text-xs text-text-muted">
            Если вы не запрашивали подтверждение почты, просто закройте эту
            страницу.
          </p>
        </div>
      </main>
    );
  }

  /*
   * ---------------------------------------------------------
   * Проверяем профиль
   * ---------------------------------------------------------
   */
  if (isUserLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background px-4 py-10">
        <div className="w-full max-w-md overflow-hidden rounded-3xl border border-border bg-surface shadow-sm">
          <div className="flex flex-col items-center px-6 py-10 text-center">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-primary-soft text-primary">
              <ShieldCheck className="size-6" />
            </div>

            <h1 className="mt-4 text-xl font-bold text-text-primary">
              Подтверждение почты
            </h1>

            <VerificationLoading message="Проверяем состояние вашего email..." />
          </div>
        </div>
      </main>
    );
  }

  /*
   * ---------------------------------------------------------
   * Основная страница подтверждения
   * ---------------------------------------------------------
   */

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-10">
      <div className="w-full max-w-md">
        <div className="overflow-hidden rounded-3xl border border-border bg-surface shadow-sm">
          <div className="flex flex-col items-center border-b border-border px-6 py-6 text-center">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-primary-soft text-primary">
              <ShieldCheck className="size-6" />
            </div>

            <h1 className="mt-4 text-xl font-bold text-text-primary">
              Подтверждение почты
            </h1>

            <p className="mt-1 text-sm text-text-secondary">
              Проверяем данные вашего email
            </p>
          </div>

          {pendingEmailConfirm && (
            <div className="px-6 py-8">
              <VerificationLoading message="Проверяем ссылку подтверждения..." />
            </div>
          )}

          {!pendingEmailConfirm && isConfirmError && (
            <div className="px-6 py-8">
              <div className="mx-auto mb-5 flex size-16 items-center justify-center rounded-full bg-danger/10 text-danger">
                <Mail className="size-7" />
              </div>

              <div className="text-center">
                <h2 className="text-lg font-semibold text-text-primary">
                  Не удалось подтвердить почту
                </h2>

                <p className="mt-2 text-sm leading-5 text-text-secondary">
                  Ссылка недействительна, устарела или уже была использована.
                </p>
              </div>

              <div className="mt-5">
                <VerificationMessage variant="error">
                  Проверьте ссылку из письма или запросите новое письмо
                  подтверждения.
                </VerificationMessage>
              </div>

              <div className="mt-6 flex justify-center">
                <Button variant="primary" type="button" onClick={handleRetry}>
                  Попробовать снова
                </Button>
              </div>
            </div>
          )}

          {!pendingEmailConfirm && !isConfirmError && isSuccessConfirm && (
            <div className="px-6 py-8">
              <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-success/10 text-success">
                <CheckCircle2 className="size-8" />
              </div>

              <div className="mt-5 text-center">
                <h2 className="text-xl font-bold text-text-primary">
                  Почта подтверждена!
                </h2>

                <p className="mt-2 text-sm leading-5 text-text-secondary">
                  Ваш email успешно подтверждён. Теперь вы можете продолжить
                  пользоваться аккаунтом.
                </p>
              </div>

              <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-surface-muted/30">
                <div className="flex items-center gap-3 border-b border-border px-4 py-3.5">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary-soft text-primary">
                    <UserRound className="size-4" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs text-text-secondary">Имя</p>

                    <p className="truncate text-sm font-semibold text-text-primary">
                      {user?.name ?? '—'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 px-4 py-3.5">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary-soft text-primary">
                    <Mail className="size-4" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs text-text-secondary">Email</p>

                    <p className="truncate text-sm font-semibold text-text-primary">
                      {user?.email ?? '—'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <Button
                  variant="primary"
                  type="button"
                  onClick={handleProfile}
                  className="w-full"
                >
                  Перейти в профиль
                </Button>
              </div>
            </div>
          )}
        </div>

        <p className="mt-5 text-center text-xs text-text-muted">
          Если вы не запрашивали подтверждение почты, просто закройте эту
          страницу.
        </p>
      </div>
    </main>
  );
};

export default VerificationConfirmEmailLink;
