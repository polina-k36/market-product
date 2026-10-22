import {
  PROFILE_QUERY_KEY,
  useUserProfile,
} from '@/features/auth/hooks/use-user-profile';
import {
  CircleAlert,
  CircleCheck,
  CreditCard,
  MapPin,
  Plus,
  User2,
} from 'lucide-react';
import { useUserModalStore } from '../store/user-modal.store';
import { useRemoveAddress } from '@/features/addresses/hooks/use-remove-address';
import { useQueryClient } from '@tanstack/react-query';
import { IMaskInput } from 'react-imask';
import AddressCardForUserSettings from '@/features/addresses/components/user-settings/AddressCardForUserSettings';
import { useNotificationStore } from '@/stores/notification/notification.store';

const ProfileSettings = () => {
  const { data: user } = useUserProfile();
  const { openCreateAddressModal, openUpdateAddressModal, openUserInfoModal } =
    useUserModalStore();
  const queryClient = useQueryClient();
  const { addNotification } = useNotificationStore();

  const { mutate } = useRemoveAddress();

  const onDeleteAddress = (id: number) => {
    mutate(id, {
      onSuccess: () => {
        queryClient.refetchQueries({
          queryKey: PROFILE_QUERY_KEY,
        });
      },
      onError: (e) => {
        addNotification({
          type: 'error',
          title: 'Ошибка удаления адреса',
          description: e.message,
          duration: 0,
        });
      },
    });
  };

  return (
    <div>
      <h2 className="mb-6 text-xl font-bold text-text-primary">
        Настройки аккаунта
      </h2>
      {user && (
        <div className="space-y-5">
          <section className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500">
                  <User2 className="size-5" />
                </div>

                <div>
                  <h3 className="font-semibold text-orange-500">
                    Личная информация
                  </h3>

                  <p className="mt-0.5 text-xs text-text-muted">
                    Основные данные аккаунта
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={openUserInfoModal}
                className="cursor-pointer text-sm font-medium text-text-secondary transition-colors duration-200 hover:text-orange-500"
              >
                Изменить
              </button>
            </div>

            <div className="mt-5 divide-y divide-border">
              <div className="pb-3">
                <p className="text-xs text-text-muted">Имя</p>
                <p className="mt-1 text-sm font-medium text-text-primary">
                  {user.name}
                </p>
              </div>

              <div className="py-3">
                <p className="text-xs text-text-muted">Email</p>

                <div className="mt-1 flex flex-wrap items-center gap-2">
                  <p className="truncate text-sm font-medium text-text-primary">
                    {user.email}
                  </p>

                  {user.emailVerified ? (
                    <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[0.6875rem] font-semibold text-emerald-500">
                      <CircleCheck className="size-3" />
                      Подтверждён
                    </span>
                  ) : (
                    <button
                      type="button"
                      className="inline-flex shrink-0 cursor-pointer items-center gap-1 rounded-full bg-orange-500/10 px-2 py-0.5 text-[0.6875rem] font-semibold text-orange-500 transition-colors duration-200 hover:bg-orange-500/15"
                    >
                      <CircleAlert className="size-3" />
                      Подтвердите почту
                    </button>
                  )}
                </div>
              </div>

              <div className="pt-3">
                <p className="text-xs text-text-muted">Телефон</p>
                <IMaskInput
                  className="mt-1 border-0 text-sm font-medium text-text-primary focus:outline-0"
                  mask="+{7} (000) 000-00-00"
                  value={user.phone ?? ''}
                  readOnly
                />
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500">
                  <MapPin className="size-5" />
                </div>

                <div>
                  <h3 className="font-semibold text-emerald-500">
                    Адреса доставки
                  </h3>

                  <p className="mt-0.5 text-xs text-text-muted">
                    Сохранено: {user.addresses.length}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={openCreateAddressModal}
                className="inline-flex cursor-pointer items-center gap-1.5 text-sm font-medium text-text-secondary transition-colors duration-200 hover:text-emerald-500"
              >
                <Plus className="size-4" />
                Добавить
              </button>
            </div>

            <div className="mt-5 space-y-2.5">
              {user.addresses.map((address) => (
                <AddressCardForUserSettings
                  address={address}
                  key={address.id}
                  onDelete={onDeleteAddress}
                  onEdit={openUpdateAddressModal}
                />
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-500">
                  <CreditCard className="size-5" />
                </div>

                <div>
                  <h3 className="font-semibold text-violet-500">
                    Способы оплаты
                  </h3>

                  <p className="mt-0.5 text-xs text-text-muted">
                    Сохранено: {user.cards.length}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-5 space-y-2.5">
              {user.cards.map((card) => (
                <div
                  key={card.id}
                  className="rounded-xl border border-border bg-surface p-4 transition-colors hover:border-primary/30"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <CreditCard className="size-5" aria-hidden="true" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-sm leading-6 font-semibold text-text-primary">
                        •••• •••• •••• {card.cardLast4}
                      </p>

                      <p className="mt-1 text-xs text-text-muted">
                        {card.cardBrand}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default ProfileSettings;
