import AdminTable from '@/components/ui/table/AdminTable';
import { useProducts } from '../../hooks/use-products';
import { productColumns } from '../../tables/product-columns';
import { useModalStore } from '@/stores/modal/modal.store';
import type { IPromoProduct } from '../../types/products.types';
import ProductAdminModal from '../modals/ProductAdminModal';
import Button from '@/components/ui/buttons/Button';
import { useRemoveProduct } from '../../hooks/use-remove-product';
import { useNotificationStore } from '@/stores/notification/notification.store';

const ProductsTable = () => {
  const { data: products } = useProducts({ page: 1 });
  const { mutate: removeProduct } = useRemoveProduct();
  const { addNotification } = useNotificationStore();
  const openCreateProductModal = useModalStore(
    (state) => state.openCreateProductModal,
  );
  const openUpdateProductModal = useModalStore(
    (state) => state.openUpdateProductModal,
  );

  const onAdd = () => {
    openCreateProductModal();
  };

  const onEdit = (row: IPromoProduct) => {
    openUpdateProductModal(row.id);
  };

  const onDelete = (row: IPromoProduct) => {
    removeProduct(row.id, {
      onSuccess: (data) => {
        addNotification({
          type: 'success',
          title: 'Удаление товара',
          description: `Продукт #${data.id} успешно удален`,
          duration: 3000,
        });
      },
      onError: () => {
        addNotification({
          type: 'error',
          title: 'Ошибка удаления товара',
          description: `Продукт #${row.id} не был удален`,
          duration: 3000,
        });
      },
    });
  };

  if (!products) return null;

  return (
    <section className="flex min-h-0 min-w-0 flex-1 flex-col gap-5 overflow-hidden">
      <div className="flex shrink-0 flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-semibold text-text-primary">
            Справочник — Продукты
          </h2>
          <p className="mt-1 text-sm text-text-secondary">
            Всего записей: {products.data.length}
          </p>
        </div>
        <Button variant="primary" type="button" onClick={onAdd}>
          + Добавить
        </Button>
      </div>

      <AdminTable
        data={products.data}
        columns={productColumns}
        getRowId={(product) => product.id}
        onEdit={onEdit}
        onDelete={onDelete}
        horizontalScroll
      />
      <ProductAdminModal />
    </section>
  );
};

export default ProductsTable;
