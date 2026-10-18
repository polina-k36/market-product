import { useState } from 'react';
import type { DeliveryMethod } from '@/features/orders/types/order.types';
import { useShops } from '@/features/shops/hooks/use-shops';
import AddressForm from '@/features/user/components/forms/AddressForm';
import { AlertCircle, Check, MapPin, Plus, Store, Truck } from 'lucide-react';
import { useAddresses } from '@/features/addresses/hooks/use-addresses';
import { useShopStore } from '@/stores/shop/shop.store';
import { useChangeShopReservation } from '@/features/reservations/hooks/use-change-shop-reservation';
import { useLocation, useNavigate } from 'react-router';
import Button from '@/components/ui/buttons/Button';
import { useDeliveryMethod } from '@/features/orders/hooks/use-delivery-method';

interface IDeliveryFormProps {
  reservationId: number;
  selectedAddressId: number | null;
  setSelectedAddressId: (id: number | null) => void;
  resetValid: () => void;
  isNotValid?: boolean;
}

const DeliveryForm = ({
  reservationId,
  selectedAddressId,
  setSelectedAddressId,
  resetValid,
  isNotValid = false,
}: IDeliveryFormProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const { data: shops } = useShops();
  const { data: addresses } = useAddresses(); // TODO: обработать загрузку и ошибку адресов
  const { shopId: activeShopId, setShopId: setActiveShopId } = useShopStore();
  const { method: deliveryMethod, setMethod: setDeliveryMethod } =
    useDeliveryMethod();

  const [isAddingAddress, setIsAddingAddress] = useState(false);

  const { mutate: changeShop } = useChangeShopReservation();

  const handleSelectAddress = (addressId: number) => {
    resetValid();
    setSelectedAddressId(addressId);
    setIsAddingAddress(false);
  };

  const handleAddNewAddress = () => {
    resetValid();
    setSelectedAddressId(null);
    setIsAddingAddress(true);
  };

  const changeActiveShop = (shopId: number) => {
    resetValid();
    changeShop(
      {
        reservationId,
        shopId,
      },
      {
        onSuccess: (data) => {
          console.log('changed shop');
          navigate(`/orders/checkout/${data.reservationId}${location.search}`, {
            state: {
              issues: data.items.filter(
                (item) =>
                  item.status === 'UNAVAILABLE' ||
                  item.status === 'PARTIALLY_RESERVED',
              ),
            },
          });
          setActiveShopId(shopId);
        },
        onError: () => {
          console.log('reservation not created'); // TODO: сообщить, что смена магазина невозможна
        },
      },
    );
  };

  return (
    <div
      className={`rounded-2xl border p-4 shadow-sm transition-colors sm:p-6 ${
        isNotValid
          ? 'border-red-500 bg-red-50/50'
          : 'border-transparent bg-surface'
      }`}
    >
      <h2 className="mb-5 flex items-center gap-2 text-[1.1rem] font-bold text-text-primary">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
          2
        </span>
        {deliveryMethod === 'delivery' ? (
          <Truck className="h-5 w-5 text-primary" />
        ) : (
          <Store className="h-5 w-5 text-primary" />
        )}
        Способ получения
      </h2>

      {isNotValid && (
        <div
          role="alert"
          className="mb-5 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <p>
            Пожалуйста, проверьте выбранный способ получения и заполните
            необходимые поля.
          </p>
        </div>
      )}

      <div className="mb-5 grid grid-cols-2 gap-3">
        {[
          { icon: Truck, method: 'delivery', name: 'Доставка' },
          { icon: Store, method: 'pickup', name: 'Самовывоз' },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <label
              key={tab.method}
              className={`flex cursor-pointer items-center justify-start rounded-xl border p-3 transition-all ${
                deliveryMethod === tab.method
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/40'
              }`}
            >
              <input
                type="radio"
                name="deliveryMethod"
                value={tab.method}
                checked={deliveryMethod === tab.method}
                onChange={() => {
                  resetValid();
                  setDeliveryMethod(tab.method as DeliveryMethod);
                }}
                className="sr-only"
              />

              <div className="flex flex-1 items-center gap-3">
                <Icon className="h-5 w-5 text-primary" />

                <p className="text-sm font-semibold text-text-primary">
                  {tab.name}
                </p>
              </div>

              {deliveryMethod === tab.method && (
                <span className="ml-auto flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary text-white">
                  <Check className="h-2.5 w-2.5" />
                </span>
              )}
            </label>
          );
        })}
      </div>

      {deliveryMethod === 'delivery' && (
        <div>
          <p className="mb-2.5 text-xs font-medium text-text-secondary">
            Выберите адрес доставки
          </p>

          <div className="flex flex-wrap gap-2">
            {addresses &&
              addresses.map((address) => {
                const isSelected =
                  selectedAddressId === address.id && !isAddingAddress;

                return (
                  <button
                    key={address.id}
                    type="button"
                    onClick={() => handleSelectAddress(address.id)}
                    className={`flex min-w-45 cursor-pointer items-start gap-3 rounded-lg border px-2.5 py-2 text-left transition-all ${
                      isSelected
                        ? 'border-primary bg-primary/5 shadow-sm'
                        : 'border-border bg-surface hover:border-primary/40 hover:bg-primary/5'
                    }`}
                  >
                    <div className="flex flex-1 items-center justify-start gap-2">
                      <span
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md ${
                          isSelected
                            ? 'bg-primary text-white'
                            : 'bg-primary/10 text-primary'
                        }`}
                      >
                        <MapPin className="h-3.5 w-3.5" />
                      </span>

                      <span className="min-w-0">
                        <span className="block truncate text-xs font-medium text-text-primary">
                          {address.street}, д. {address.house}
                          {address.apartment && `, кв. ${address.apartment}`}
                        </span>

                        <span className="mt-0.5 block text-[11px] text-text-muted">
                          {address.city}
                        </span>
                      </span>
                    </div>

                    {isSelected && (
                      <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary text-white">
                        <Check className="h-2.5 w-2.5" />
                      </span>
                    )}
                  </button>
                );
              })}

            <button
              type="button"
              onClick={handleAddNewAddress}
              className={`flex min-w-38.75 cursor-pointer items-start gap-3 rounded-lg border px-2.5 py-2 text-left transition-all ${
                isAddingAddress
                  ? 'border-primary bg-primary/5 shadow-sm'
                  : 'border-border bg-surface hover:border-primary/40 hover:bg-primary/5'
              }`}
            >
              <div className="flex h-full flex-1 items-center justify-start gap-2">
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md ${
                    isAddingAddress
                      ? 'bg-primary text-white'
                      : 'bg-primary/10 text-primary'
                  }`}
                >
                  <Plus className="h-3.5 w-3.5" />
                </span>

                <span className="text-xs font-medium text-text-primary">
                  Новый адрес
                </span>
              </div>

              {isAddingAddress && (
                <span className="ml-auto flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary text-white">
                  <Check className="h-2.5 w-2.5" />
                </span>
              )}
            </button>
          </div>

          {isAddingAddress && (
            <div className="mt-4">
              <AddressForm
                onSubmitForm={(data) => {
                  resetValid();
                  setIsAddingAddress(false);
                  setSelectedAddressId(data.id);
                }}
              />

              <Button
                type="submit"
                form="address-form"
                variant="primary"
                className="mt-4 w-full"
              >
                Добавить адрес
              </Button>
            </div>
          )}
        </div>
      )}

      {deliveryMethod === 'pickup' && (
        <div>
          <p className="mb-3 text-sm font-medium text-text-secondary">
            Выберите магазин
          </p>

          <div className="flex flex-col gap-3">
            {shops?.map((shop) => (
              <button
                key={shop.id_shop}
                type="button"
                className={`w-full cursor-pointer rounded-xl border p-4 text-left transition-all ${
                  activeShopId === shop.id_shop
                    ? 'border-primary bg-primary/5'
                    : 'border-border bg-surface hover:border-primary/40'
                }`}
                onClick={() => changeActiveShop(shop.id_shop)}
              >
                <div className="flex items-start gap-3">
                  <Store className="mt-0.5 h-5 w-5 shrink-0 text-primary" />

                  <div>
                    <p className="font-medium text-text-primary">
                      Магазин на {shop.shop_street}
                    </p>

                    <p className="mt-1 text-sm text-text-secondary">
                      {shop.shop_city} {shop.shop_street}, д. {shop.shop_house}
                    </p>

                    <p
                      className={`mt-1 text-xs ${
                        new Date().getHours() >= 22
                          ? 'text-red'
                          : 'text-primary'
                      }`}
                    >
                      {new Date().getHours() >= 22
                        ? 'Магазин закрыт. Откроется завтра в 7:00'
                        : 'Сегодня до 22:00'}
                    </p>
                  </div>

                  {activeShopId === shop.id_shop && (
                    <span className="ml-auto flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary text-white">
                      <Check className="h-2.5 w-2.5" />
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DeliveryForm;
