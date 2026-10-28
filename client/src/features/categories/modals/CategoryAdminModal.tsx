import { Save, Tags } from 'lucide-react';
import Modal from '@/components/layout/modal/Modal';
import CategoryAdminForm from '../forms/CategoryAdminForm';
import { useModalStore } from '@/stores/modal/modal.store';

const CategoryAdminModal = () => {
  const modal = useModalStore((state) => state.modal);
  const closeModal = useModalStore((state) => state.closeModal);

  const isCreate = modal?.type === 'create-category';
  const isUpdate = modal?.type === 'update-category';

  return (
    <Modal
      onClose={closeModal}
      isOpen={isCreate || isUpdate}
      header={{
        title: isCreate ? 'Новая категория' : 'Редактирование категории',
        subtitle: isCreate
          ? 'Укажите название новой категории'
          : 'Измените название категории',
        icon: Tags,
      }}
      footer={{
        btnSubmitTitle: isCreate ? 'Добавить категорию' : 'Сохранить',
        btnSubmitIcon: Save,
        formId: 'category-admin-form',
      }}
      padding="p-6 sm:p-8"
      size="small"
    >
      <CategoryAdminForm
        key={isUpdate ? `update-${modal?.categoryId}` : 'create'}
        categoryId={isUpdate ? modal?.categoryId : undefined}
      />
    </Modal>
  );
};

export default CategoryAdminModal;
