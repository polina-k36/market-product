import { Store, Save } from 'lucide-react';
import Modal from '@/components/layout/modal/Modal';
import ShopAdminForm from '../forms/ShopAdminForm';
import { useModalStore } from '@/stores/modal/modal.store';

const ShopAdminModal = () => {
  const modal = useModalStore((state) => state.modal);
  const closeModal = useModalStore((state) => state.closeModal);

  const isCreate = modal?.type === 'create-shop';
  const isUpdate = modal?.type === 'update-shop';

  return (
    <Modal
      onClose={closeModal}
      isOpen={isCreate || isUpdate}
      header={{
        title: isCreate ? 'Новый магазин' : 'Редактирование магазина',
        subtitle: isCreate
          ? 'Заполните данные нового магазина'
          : 'Измените данные магазина',
        icon: Store,
      }}
      footer={{
        btnSubmitTitle: isCreate ? 'Добавить магазин' : 'Сохранить',
        btnSubmitIcon: Save,
        formId: 'shop-admin-form',
      }}
      padding="p-6 sm:p-8"
      size="medium"
    >
      <ShopAdminForm
        key={isUpdate ? `update-${modal.shopId}` : 'create'}
        shopId={isUpdate ? modal.shopId : undefined}
      />
    </Modal>
  );
};

export default ShopAdminModal;
