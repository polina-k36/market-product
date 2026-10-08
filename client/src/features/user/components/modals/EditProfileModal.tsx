import Modal from '@/components/layout/modal/Modal';
import Button from '@/components/ui/buttons/Button';
import ButtonIcon from '@/components/ui/buttons/ButtonIcon';
import { KeyRound, Mail, ShieldCheck, User, User2, X } from 'lucide-react';
import { useState } from 'react';

import EditUserInfoForm from '../forms/EditUserInfoForm';
import ChangePasswordForm from '../forms/ChangePasswordForm';
import { useUserModalStore } from '../../store/user-modal.store';
import VerifyEmailLinkModal from './VerifyEmailLinkModal';
import VerifyEmailCodeModal from './VerifyEmailCodeModal';
import { useUserProfile } from '@/features/auth/hooks/use-user-profile';

type ProfileTab = 'personal' | 'password' | 'email';

const EditProfileModal = () => {
  const onClose = useUserModalStore((state) => state.closeModal);
  const modal = useUserModalStore((state) => state.modal);
  const { data: user } = useUserProfile();

  const [activeTab, setActiveTab] = useState<ProfileTab>('personal');
  const [isVerifyLinkOpen, setIsVerifyLinkOpen] = useState(false);
  const [isVerifyCodeOpen, setIsVerifyCodeOpen] = useState(false);

  const isOpen = modal?.type === 'user';

  const handleClose = () => {
    onClose();
    setActiveTab('personal');
  };

  return (
    <Modal isOpen={isOpen} size="big">
      <div className="flex min-h-107.5 flex-col sm:flex-row">
        <aside className="w-full shrink-0 border-b border-border bg-surface-muted/40 p-3 sm:w-48 sm:border-r sm:border-b-0 sm:p-4">
          <div className="mb-5 flex items-center justify-between sm:block">
            <div>
              <p className="text-xs font-medium tracking-wide text-text-muted uppercase">
                Настройки
              </p>

              <h2 className="mt-1 text-base font-bold text-text-primary">
                Профиль
              </h2>
            </div>

            <ButtonIcon
              variant="transparent"
              type="button"
              aria-label="Закрыть"
              onClick={handleClose}
              className="sm:hidden"
            >
              <X className="size-4" />
            </ButtonIcon>
          </div>

          <nav className="flex gap-1 overflow-x-auto sm:block">
            <button
              type="button"
              onClick={() => setActiveTab('personal')}
              className={`flex shrink-0 items-center gap-2 rounded-xl px-3 py-2.5 text-sm transition-colors sm:w-full ${
                activeTab === 'personal'
                  ? 'bg-primary-soft font-semibold text-primary'
                  : 'font-medium text-text-secondary hover:bg-surface-muted hover:text-text-primary'
              }`}
            >
              <User2 className="size-4" />
              Личные данные
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('password')}
              className={`flex shrink-0 items-center gap-2 rounded-xl px-3 py-2.5 text-sm transition-colors sm:mt-1 sm:w-full ${
                activeTab === 'password'
                  ? 'bg-primary-soft font-semibold text-primary'
                  : 'font-medium text-text-secondary hover:bg-surface-muted hover:text-text-primary'
              }`}
            >
              <KeyRound className="size-4" />
              Пароль
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('email')}
              className={`flex shrink-0 items-center gap-2 rounded-xl px-3 py-2.5 text-sm transition-colors sm:mt-1 sm:w-full ${
                activeTab === 'email'
                  ? 'bg-primary-soft font-semibold text-primary'
                  : 'font-medium text-text-secondary hover:bg-surface-muted hover:text-text-primary'
              }`}
            >
              <Mail className="size-4" />
              Почта
            </button>
          </nav>
        </aside>

        <div className="min-w-0 flex-1">
          <div className="hidden justify-end p-4 sm:flex">
            <ButtonIcon
              variant="transparent"
              type="button"
              aria-label="Закрыть"
              onClick={handleClose}
            >
              <X className="size-4" />
            </ButtonIcon>
          </div>

          <div className="px-5 pt-6 pb-6 sm:px-7 sm:pt-0">
            {activeTab === 'personal' && (
              <>
                <div className="mb-6">
                  <div className="flex items-center gap-2.5">
                    <div className="flex size-9 items-center justify-center rounded-lg bg-orange-500/10 text-orange-500">
                      <User className="size-4" />
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-text-primary">
                        Личные данные
                      </h3>

                      <p className="text-xs text-text-muted">
                        Измените данные своего профиля
                      </p>
                    </div>
                  </div>
                </div>

                <EditUserInfoForm />

                <div className="mt-6 flex items-center justify-end gap-2 border-t border-border pt-5">
                  <Button
                    variant="transparent"
                    type="button"
                    onClick={handleClose}
                  >
                    Отмена
                  </Button>

                  <Button
                    variant="primary"
                    type="submit"
                    form="edit-user-info-form"
                  >
                    <ShieldCheck className="size-4" />
                    Сохранить
                  </Button>
                </div>
              </>
            )}

            {activeTab === 'password' && (
              <>
                <div className="mb-6">
                  <div className="flex items-center gap-2.5">
                    <div className="flex size-9 items-center justify-center rounded-lg bg-orange-500/10 text-orange-500">
                      <KeyRound className="size-4" />
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-text-primary">
                        Изменение пароля
                      </h3>

                      <p className="text-xs text-text-muted">
                        Обновите пароль для защиты аккаунта
                      </p>
                    </div>
                  </div>
                </div>

                <ChangePasswordForm />

                <div className="mt-6 flex items-center justify-end gap-2 border-t border-border pt-5">
                  <Button
                    variant="transparent"
                    type="button"
                    onClick={handleClose}
                  >
                    Отмена
                  </Button>

                  <Button
                    variant="primary"
                    type="submit"
                    form="change-password-form"
                  >
                    <ShieldCheck className="size-4" />
                    Изменить пароль
                  </Button>
                </div>
              </>
            )}

            {activeTab === 'email' && (
              <>
                <div className="mb-6">
                  <div className="flex items-center gap-2.5">
                    <div className="flex size-9 items-center justify-center rounded-lg bg-orange-500/10 text-orange-500">
                      <Mail className="size-4" />
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-text-primary">
                        Электронная почта
                      </h3>

                      <p className="text-xs text-text-muted">
                        Подтвердите адрес электронной почты для защиты аккаунта
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="rounded-xl border border-border bg-surface-muted/30 p-4">
                    <div className="flex items-start gap-3">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary-soft text-primary">
                        <Mail className="size-4" />
                      </div>

                      <div className="min-w-0">
                        <p className="text-xs font-medium text-text-muted">
                          Ваш email
                        </p>

                        <p className="mt-1 truncate text-sm font-semibold text-text-primary">
                          {user?.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`rounded-xl border p-4 ${
                      user?.emailVerified
                        ? 'border-emerald-500/20 bg-emerald-500/5'
                        : 'border-amber-500/20 bg-amber-500/5'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${
                          user?.emailVerified
                            ? 'bg-emerald-500/10 text-emerald-500'
                            : 'bg-amber-500/10 text-amber-500'
                        }`}
                      >
                        <ShieldCheck className="size-5" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p
                          className={`text-sm font-semibold ${
                            user?.emailVerified
                              ? 'text-emerald-600'
                              : 'text-amber-600'
                          }`}
                        >
                          {user?.emailVerified
                            ? 'Почта подтверждена'
                            : 'Почта не подтверждена'}
                        </p>

                        <p className="mt-1 text-xs leading-5 text-text-muted">
                          {user?.emailVerified
                            ? 'Ваш адрес электронной почты подтверждён и может использоваться для восстановления доступа к аккаунту.'
                            : 'Подтвердите адрес электронной почты, чтобы повысить безопасность аккаунта и использовать его для восстановления доступа.'}
                        </p>

                        {!user?.emailVerified && (
                          <div className="mt-4 space-y-2.5">
                            <p className="text-xs font-semibold text-text-secondary">
                              Выберите способ подтверждения
                            </p>

                            <div className="grid gap-2 sm:grid-cols-2">
                              <button
                                type="button"
                                onClick={() => setIsVerifyLinkOpen(true)}
                                className="group rounded-xl border border-border bg-surface p-3 text-left transition-colors hover:border-primary/30 hover:bg-primary-soft/30"
                              >
                                <div className="flex items-start gap-2.5">
                                  <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary-soft text-primary">
                                    <Mail className="size-4" />
                                  </div>

                                  <div>
                                    <p className="text-xs font-semibold text-text-primary">
                                      По ссылке
                                    </p>

                                    <p className="mt-0.5 text-[11px] leading-4 text-text-muted">
                                      Перейдите по ссылке из письма
                                    </p>
                                  </div>
                                </div>
                              </button>
                              <button
                                type="button"
                                onClick={() => setIsVerifyCodeOpen(true)}
                                className="group rounded-xl border border-border bg-surface p-3 text-left transition-colors hover:border-primary/30 hover:bg-primary-soft/30"
                              >
                                <div className="flex items-start gap-2.5">
                                  <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary-soft text-primary">
                                    <ShieldCheck className="size-4" />
                                  </div>

                                  <div>
                                    <p className="text-xs font-semibold text-text-primary">
                                      По коду
                                    </p>

                                    <p className="mt-0.5 text-[11px] leading-4 text-text-muted">
                                      Введите код из письма
                                    </p>
                                  </div>
                                </div>
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="rounded-xl border border-border bg-surface-muted/30 p-4">
                    <div className="flex gap-3">
                      <div className="mt-0.5 shrink-0 text-text-muted">
                        <Mail className="size-4" />
                      </div>

                      <div>
                        <p className="text-xs font-semibold text-text-secondary">
                          Зачем подтверждать почту?
                        </p>

                        <p className="mt-1 text-xs leading-5 text-text-muted">
                          Подтверждённый email помогает восстановить доступ к
                          аккаунту и получать важные уведомления.
                        </p>
                      </div>
                    </div>
                  </div>

                  <VerifyEmailLinkModal
                    isOpen={isVerifyLinkOpen}
                    onClose={() => setIsVerifyLinkOpen(false)}
                  />

                  <VerifyEmailCodeModal
                    isOpen={isVerifyCodeOpen}
                    onClose={() => setIsVerifyCodeOpen(false)}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default EditProfileModal;
