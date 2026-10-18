import Modal from '@/components/layout/modal/Modal';
import { MapPin, Save } from 'lucide-react';
import { useUserModalStore } from '../../store/user-modal.store';
import AddressForm from '../forms/AddressForm';

const AddressModal = () => {
  const onClose = useUserModalStore((state) => state.closeModal);
  const modal = useUserModalStore((state) => state.modal);
  return (
    <Modal
      onClose={onClose}
      isOpen={
        modal?.type === 'create-address' || modal?.type === 'update-address'
      }
      header={{
        title: 'Новый адрес',
        subtitle: 'Добавьте адрес для доставки',
        icon: MapPin,
      }}
      footer={{
        btnSubmitTitle: 'Сохранить',
        btnSubmitIcon: Save,
        formId: 'address-form',
      }}
      padding="p-6 sm:p-8"
      size="small"
    >
      <AddressForm
        addressId={
          modal?.type === 'update-address' ? modal.addressId : undefined
        }
        onSubmitForm={() => onClose()}
      />
    </Modal>
  );
};
export default AddressModal;
