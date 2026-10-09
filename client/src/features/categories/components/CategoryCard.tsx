import { useProductFilters } from '@/features/products/hooks/use-product-filters';

interface ICategoryCardProps {
  id?: number;
  name: string;
}

const CategoryCard = ({ id, name }: ICategoryCardProps) => {
  const { filters, actions } = useProductFilters();
  //FIXME: улучшить дизайн кнопок
  const changeCategory = () => {
    actions.setCategoryId(id);
  };

  return (
    <button
      className={`w-fit cursor-pointer rounded-3xl border pt-2 pr-4 pb-2 pl-4 font-semibold whitespace-nowrap ${
        (id === undefined && filters.categoryId === undefined) ||
        filters.categoryId === id
          ? 'bg-primary text-text-inverse'
          : 'border-border bg-surface text-text-primary hover:bg-primary-soft hover:text-primary'
      } `}
      onClick={changeCategory}
    >
      {name}
    </button>
  );
};

export default CategoryCard;
