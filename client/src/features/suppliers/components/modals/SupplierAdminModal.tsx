import { Truck, Save } from 'lucide-react';
import Modal from '@/components/layout/modal/Modal';
import SupplierAdminForm from '../forms/SupplierAdminForm';
import { useModalStore } from '@/stores/modal/modal.store';

const SupplierAdminModal = () => {
  const modal = useModalStore((state) => state.modal);
  const closeModal = useModalStore((state) => state.closeModal);

  const isCreate = modal?.type === 'create-supplier';
  const isUpdate = modal?.type === 'update-supplier';

  return (
    <Modal
      onClose={closeModal}
      isOpen={isCreate || isUpdate}
      header={{
        title: isCreate ? 'Новый поставщик' : 'Редактирование поставщика',
        subtitle: isCreate
          ? 'Заполните данные нового поставщика'
          : 'Измените данные поставщика',
        icon: Truck,
      }}
      footer={{
        btnSubmitTitle: isCreate ? 'Добавить поставщика' : 'Сохранить',
        btnSubmitIcon: Save,
        formId: 'supplier-admin-form',
      }}
      padding="p-6 sm:p-8"
      size="medium"
    >
      <SupplierAdminForm
        key={isUpdate ? `update-${modal.supplierId}` : 'create'}
        supplierId={isUpdate ? modal.supplierId : undefined}
      />
    </Modal>
  );
};

export default SupplierAdminModal;
