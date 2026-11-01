import { WalletCards, Save } from 'lucide-react';
import Modal from '@/components/layout/modal/Modal';
import PaymentMethodAdminForm from '../forms/PaymentMethodAdminForm';
import { useModalStore } from '@/stores/modal/modal.store';

const PaymentMethodAdminModal = () => {
  const modal = useModalStore((state) => state.modal);
  const closeModal = useModalStore((state) => state.closeModal);

  const isCreate = modal?.type === 'create-payment-method';
  const isUpdate = modal?.type === 'update-payment-method';

  return (
    <Modal
      onClose={closeModal}
      isOpen={isCreate || isUpdate}
      header={{
        title: isCreate
          ? 'Новый способ оплаты'
          : 'Редактирование способа оплаты',
        subtitle: isCreate
          ? 'Заполните данные нового способа оплаты'
          : 'Измените данные способа оплаты',
        icon: WalletCards,
      }}
      footer={{
        btnSubmitTitle: isCreate ? 'Добавить способ оплаты' : 'Сохранить',
        btnSubmitIcon: Save,
        formId: 'payment-method-admin-form',
      }}
      padding="p-6 sm:p-8"
      size="medium"
    >
      <PaymentMethodAdminForm
        key={isUpdate ? `update-${modal.paymentMethodId}` : 'create'}
        paymentMethodId={isUpdate ? modal.paymentMethodId : undefined}
      />
    </Modal>
  );
};

export default PaymentMethodAdminModal;
