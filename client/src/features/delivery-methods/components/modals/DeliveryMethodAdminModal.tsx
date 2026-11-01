import { WalletCards, Save } from 'lucide-react';
import Modal from '@/components/layout/modal/Modal';
import DeliveryMethodAdminForm from '../forms/DeliveryMethodAdminForm';
import { useModalStore } from '@/stores/modal/modal.store';

const DeliveryMethodAdminModal = () => {
  const modal = useModalStore((state) => state.modal);
  const closeModal = useModalStore((state) => state.closeModal);

  const isCreate = modal?.type === 'create-delivery-method';
  const isUpdate = modal?.type === 'update-delivery-method';

  return (
    <Modal
      onClose={closeModal}
      isOpen={isCreate || isUpdate}
      header={{
        title: isCreate
          ? 'Новый способ доставки'
          : 'Редактирование способа доставки',
        subtitle: isCreate
          ? 'Заполните данные нового способа доставки'
          : 'Измените данные способа доставки',
        icon: WalletCards,
      }}
      footer={{
        btnSubmitTitle: isCreate ? 'Добавить способ доставки' : 'Сохранить',
        btnSubmitIcon: Save,
        formId: 'delivery-method-admin-form',
      }}
      padding="p-6 sm:p-8"
      size="medium"
    >
      <DeliveryMethodAdminForm
        key={isUpdate ? `update-${modal.deliveryMethodId}` : 'create'}
        deliveryMethodId={isUpdate ? modal.deliveryMethodId : undefined}
      />
    </Modal>
  );
};

export default DeliveryMethodAdminModal;
