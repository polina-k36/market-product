import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Tags } from 'lucide-react';
import Input from '@/components/ui/inputs/Input';
import { useNotificationStore } from '@/stores/notification/notification.store';
import { useModalStore } from '@/stores/modal/modal.store';
import {
  categoryAdminSchema,
  type CategoryAdminFormValues,
} from '../schemas/category-admin.schema';
import FieldError from '@/features/auth/components/FieldError';
import { useCategory } from '../hooks/use-category';
import { useCreateCategory } from '../hooks/use-create-category';
import { useUpdateCategory } from '../hooks/use-update-category';

interface ICategoryAdminFormProps {
  categoryId?: number;
}

const CategoryAdminForm = ({ categoryId }: ICategoryAdminFormProps) => {
  const isUpdate = categoryId !== undefined;
  const { data: category } = useCategory(categoryId ?? -1);
  const createCategory = useCreateCategory();
  const updateCategory = useUpdateCategory(categoryId ?? -1);
  const addNotification = useNotificationStore(
    (state) => state.addNotification,
  );
  const closeModal = useModalStore((state) => state.closeModal);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CategoryAdminFormValues>({
    resolver: zodResolver(categoryAdminSchema),
    defaultValues: {
      title: '',
    },
  });

  useEffect(() => {
    if (category && isUpdate) {
      reset({
        title: category.title,
      });
    }
  }, [category, isUpdate, reset]);

  const onSubmit = (data: CategoryAdminFormValues) => {
    if (isUpdate) {
      updateCategory.mutate(data, {
        onSuccess: () => {
          addNotification({
            type: 'success',
            title: 'Категория обновлена',
            duration: 3000,
          });
          closeModal();
        },
        onError: () => {
          addNotification({
            type: 'error',
            title: 'Не удалось обновить категорию',
            duration: 3000,
          });
        },
      });
      return;
    }

    createCategory.mutate(data, {
      onSuccess: () => {
        addNotification({
          type: 'success',
          title: 'Категория создана',
          duration: 3000,
        });
        closeModal();
      },
      onError: () => {
        addNotification({
          type: 'error',
          title: 'Не удалось создать категорию',
          duration: 3000,
        });
      },
    });
  };

  return (
    <form
      id="category-admin-form"
      onSubmit={handleSubmit(onSubmit)}
      className="mt-6 flex flex-col gap-5"
    >
      <div className="flex flex-col gap-1.5">
        <label className="mb-1.5 block text-xs font-medium text-text-secondary">
          Название категории
        </label>
        <Input
          icon={Tags}
          placeholder="Например, Фрукты"
          {...register('title')}
        />
        <FieldError message={errors.title?.message} />
      </div>
    </form>
  );
};

export default CategoryAdminForm;
