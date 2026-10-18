import { useProductFilters } from '@/features/products/hooks/use-product-filters';

interface ICategoryCardProps {
  id?: number;
  name: string;
}

const CategoryCard = ({ id, name }: ICategoryCardProps) => {
  const { filters, actions } = useProductFilters();

  const isSelected =
    id === undefined
      ? filters.categoryId === undefined
      : filters.categoryId === id;

  const changeCategory = () => {
    actions.setCategoryId(id);
  };

  return (
    <button
      type="button"
      onClick={changeCategory}
      aria-pressed={isSelected}
      className={`group relative inline-flex w-fit shrink-0 cursor-pointer items-center justify-center rounded-full border px-4 py-2.5 text-sm font-semibold whitespace-nowrap transition-all duration-200 ease-out focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:outline-none active:scale-[0.97] ${
        isSelected
          ? 'border-primary bg-primary text-text-inverse shadow-md shadow-primary/20'
          : 'border-border/80 bg-surface text-text-secondary hover:border-primary/40 hover:bg-primary/5 hover:text-primary'
      }`}
    >
      <span className="relative">{name}</span>
    </button>
  );
};

export default CategoryCard;
