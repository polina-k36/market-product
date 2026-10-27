import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Boxes,
  FileText,
  Layers,
  Package,
  Percent,
  Tag,
  Wallet,
} from 'lucide-react';
import Input from '@/components/ui/inputs/Input';
import FieldError from '@/features/auth/components/FieldError';
import FormError from '@/features/auth/components/FormError';
import {
  productAdminSchema,
  type ProductAdminFormInput,
  type ProductAdminFormValues,
} from '../../schemas/product-admin.schema';
import Select from '@/components/ui/inputs/Select';
import { useCategories } from '@/features/categories/hooks/use-categories';
import { useUnits } from '@/features/units/hooks/use-units';
import { useNds } from '@/features/nds/hooks/use-nds';
import { useProduct } from '../../hooks/use-product';
import { useUpdateProduct } from '../../hooks/use-update-product';
import { useCreateProduct } from '../../hooks/use-create-product';
import { useNotificationStore } from '@/stores/notification/notification.store';
import { useModalStore } from '@/stores/modal/modal.store';

interface IProductAdminFormProps {
  productId?: number;
  serverError?: string;
  onCloseError?: () => void;
}

//TODO: сделать добавление/обновление изображения

const ProductAdminForm = ({
  productId,
  serverError,
  onCloseError,
}: IProductAdminFormProps) => {
  const { data: product } = useProduct(productId);
  const { mutate: updateProduct } = useUpdateProduct(productId ?? -1);
  const { mutate: createProduct } = useCreateProduct();
  const { data: categories } = useCategories();
  const { data: units } = useUnits();
  const { data: ndsRates } = useNds();
  const addNotification = useNotificationStore(
    (state) => state.addNotification,
  );
  const closeModal = useModalStore((state) => state.closeModal);

  const {
    register,
    handleSubmit,
    getFieldState,
    reset,
    formState: { errors },
  } = useForm<ProductAdminFormInput, unknown, ProductAdminFormValues>({
    resolver: zodResolver(productAdminSchema),
    defaultValues: {
      title: '',
      description: '',
      composition: '',
      price: '',
      categoryId: '',
      unitId: '',
      ndsId: '',
    },
  });

  useEffect(() => {
    reset({
      title: product?.title ?? '',
      description: product?.description ?? '',
      composition: product?.composition ?? '',
      price: product?.price?.toString() ?? '',
      categoryId: product?.category.id.toString() ?? '',
      unitId: product?.unit.id.toString() ?? '',
      ndsId: product?.nds.id.toString() ?? '',
    });
  }, [product, reset]);

  const onSubmit = (data: ProductAdminFormValues) => {
    if (productId) {
      updateProduct(
        {
          ...data,
          price: Number(data.price),
          categoryId: Number(data.categoryId),
          unitId: Number(data.unitId),
          ndsId: Number(data.ndsId),
        },
        {
          onSuccess: (data) => {
            addNotification({
              type: 'success',
              title: 'Обновление товара',
              description: `Продукт #${data.id} успешно обновлен`,
              duration: 3000,
            });
            closeModal();

            reset({
              title: '',
              description: '',
              composition: '',
              price: '',
              categoryId: '',
              unitId: '',
              ndsId: '',
            });
          },
          onError: () => {
            addNotification({
              type: 'error',
              title: 'Ошибка обновления товара',
              description: `Продукт не удалось обновить`,
              duration: 3000,
            });
          },
        },
      );
    } else {
      createProduct(
        {
          ...data,
          price: Number(data.price),
          categoryId: Number(data.categoryId),
          unitId: Number(data.unitId),
          ndsId: Number(data.ndsId),
          imageKey: '',
        },
        {
          onSuccess: (data) => {
            addNotification({
              type: 'success',
              title: 'Добавление товара',
              description: `Продукт #${data.id} успешно добавлен`,
              duration: 3000,
            });
            closeModal();

            reset({
              title: '',
              description: '',
              composition: '',
              price: '',
              categoryId: '',
              unitId: '',
              ndsId: '',
            });
          },
          onError: () => {
            addNotification({
              type: 'error',
              title: 'Ошибка добавления товара',
              description: `Продукт не удалось добавить`,
              duration: 3000,
            });
          },
        },
      );
    }
  };

  const getValid = (field: keyof ProductAdminFormInput) => {
    const state = getFieldState(field);
    return state.isTouched ? !state.invalid : undefined;
  };

  return (
    <>
      {serverError && (
        <FormError message={serverError} onClose={onCloseError ?? (() => {})} />
      )}

      <form
        id="product-admin-form"
        className="mt-6 space-y-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <label className="mb-1.5 block text-xs font-medium text-text-secondary">
            Название товара
          </label>
          <Input
            icon={Package}
            type="text"
            placeholder="Молоко 3.2%"
            {...register('title')}
            valid={getValid('title')}
          />
          <FieldError message={errors.title?.message} />
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium text-text-secondary">
            Описание
          </label>
          <Input
            icon={FileText}
            type="text"
            placeholder="Описание товара"
            {...register('description')}
            valid={getValid('description')}
          />
          <FieldError message={errors.description?.message} />
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium text-text-secondary">
            Состав
          </label>
          <Input
            icon={Layers}
            type="text"
            placeholder="Молоко цельное, нормализованное"
            {...register('composition')}
            valid={getValid('composition')}
          />
          <FieldError message={errors.composition?.message} />
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium text-text-secondary">
            Цена
          </label>
          <Input
            icon={Wallet}
            type="number"
            min="0"
            step="0.01"
            placeholder="129.99"
            {...register('price')}
            valid={getValid('price')}
          />
          <FieldError message={errors.price?.message} />
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium text-text-secondary">
            Категория
          </label>
          <Select
            icon={Tag}
            options={categories.map((category) => ({
              value: category.id,
              label: category.title,
            }))}
            placeholder="Выберите категорию"
            {...register('categoryId')}
            valid={getValid('categoryId')}
          />
          <FieldError message={errors.categoryId?.message} />
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium text-text-secondary">
            Единица измерения
          </label>
          {units && (
            <>
              <Select
                icon={Boxes}
                options={units.map((unit) => ({
                  value: unit.id,
                  label: unit.fullTitle,
                }))}
                placeholder="Выберите единицу"
                {...register('unitId')}
                valid={getValid('unitId')}
              />
              <FieldError message={errors.unitId?.message} />
            </>
          )}
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium text-text-secondary">
            Ставка НДС
          </label>
          {ndsRates && (
            <>
              <Select
                icon={Percent}
                options={ndsRates.map((rate) => ({
                  value: rate.id,
                  label: rate.titleRate,
                }))}
                placeholder="Выберите ставку НДС"
                {...register('ndsId')}
                valid={getValid('ndsId')}
              />
              <FieldError message={errors.ndsId?.message} />
            </>
          )}
        </div>
      </form>
    </>
  );
};

export default ProductAdminForm;
