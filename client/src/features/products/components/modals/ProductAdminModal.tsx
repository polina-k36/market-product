import { Package, Save } from 'lucide-react';
import Modal from '@/components/layout/modal/Modal';
import ProductAdminForm from '../forms/ProductAdminForm';
import { useModalStore } from '@/stores/modal/modal.store';

const ProductAdminModal = () => {
  const modal = useModalStore((state) => state.modal);
  const closeModal = useModalStore((state) => state.closeModal);

  const isCreate = modal?.type === 'create-product';
  const isUpdate = modal?.type === 'update-product';

  return (
    <Modal
      onClose={closeModal}
      isOpen={isCreate || isUpdate}
      header={{
        title: isCreate ? 'Новый товар' : 'Редактирование товара',
        subtitle: isCreate
          ? 'Заполните данные нового товара'
          : 'Измените данные товара',
        icon: Package,
      }}
      footer={{
        btnSubmitTitle: isCreate ? 'Добавить товар' : 'Сохранить',
        btnSubmitIcon: Save,
        formId: 'product-admin-form',
      }}
      padding="p-6 sm:p-8"
      size="medium"
    >
      <ProductAdminForm
        key={isUpdate ? `update-${modal.productId}` : 'create'}
        productId={isUpdate ? modal.productId : undefined}
      />
    </Modal>
  );
};

export default ProductAdminModal;
