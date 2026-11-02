import { WalletCards, Save } from 'lucide-react';
import Modal from '@/components/layout/modal/Modal';
import UnitAdminForm from '../forms/UnitAdminForm';
import { useModalStore } from '@/stores/modal/modal.store';

const NdsAdminModal = () => {
  const modal = useModalStore((state) => state.modal);
  const closeModal = useModalStore((state) => state.closeModal);

  const isCreate = modal?.type === 'create-nds';
  const isUpdate = modal?.type === 'update-nds';

  return (
    <Modal
      onClose={closeModal}
      isOpen={isCreate || isUpdate}
      header={{
        title: isCreate
          ? 'Новая единица измерения'
          : 'Редактирование единицы измерения',
        subtitle: isCreate
          ? 'Заполните данные новой единицы измерения'
          : 'Измените данные единицы измерения',
        icon: WalletCards,
      }}
      footer={{
        btnSubmitTitle: isCreate ? 'Добавить единицу' : 'Сохранить',
        btnSubmitIcon: Save,
        formId: 'nds-admin-form',
      }}
      padding="p-6 sm:p-8"
      size="medium"
    >
      <UnitAdminForm
        key={isUpdate ? `update-${modal.ndsId}` : 'create'}
        unitId={isUpdate ? modal.ndsId : undefined}
      />
    </Modal>
  );
};

export default NdsAdminModal;
