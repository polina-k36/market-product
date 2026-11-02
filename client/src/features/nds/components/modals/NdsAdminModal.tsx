import { WalletCards, Save } from 'lucide-react';
import Modal from '@/components/layout/modal/Modal';
import NdsAdminForm from '../forms/NdsAdminForm';
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
        title: isCreate ? 'Новая ставка НДС' : 'Редактирование ставки НДС',
        subtitle: isCreate
          ? 'Заполните данные новой ставки НДС'
          : 'Измените данные ставки НДС',
        icon: WalletCards,
      }}
      footer={{
        btnSubmitTitle: isCreate ? 'Добавить ставку' : 'Сохранить',
        btnSubmitIcon: Save,
        formId: 'nds-admin-form',
      }}
      padding="p-6 sm:p-8"
      size="medium"
    >
      <NdsAdminForm
        key={isUpdate ? `update-${modal.ndsId}` : 'create'}
        ndsId={isUpdate ? modal.ndsId : undefined}
      />
    </Modal>
  );
};

export default NdsAdminModal;
