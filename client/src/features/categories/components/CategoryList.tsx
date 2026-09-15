import { useCategories } from '../hooks/useCategories';
import CategoryCard from './CategoryCard';
import HorizontalScroll from '@/components/layout/horizontal-scroll/HorizontalScroll';

const CategoryList = () => {
  const { data } = useCategories();

  return (
    <HorizontalScroll gap="gap-1">
      <CategoryCard name="Все" />
      {data.map((category) => (
        <CategoryCard
          key={category.id}
          id={category.id}
          name={category.title}
        />
      ))}
    </HorizontalScroll>
  );
};

export default CategoryList;
