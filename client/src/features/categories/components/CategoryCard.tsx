import { useSearchParams } from 'react-router';

interface ICategoryCardProps {
  id?: number;
  name: string;
}

const CategoryCard = ({ id, name }: ICategoryCardProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const changeCategory = () => {
    if (id === undefined) {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);

        next.delete('category');

        return next;
      });
    } else {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);

        next.set('category', `${id}`);
        console.log(id);

        return next;
      });
    }
  };

  return (
    <button
      className={`
      pt-2 pb-2 pl-4 pr-4 border w-fit rounded-3xl font-semibold cursor-pointer whitespace-nowrap
      ${
        (id === undefined && searchParams.get('category') === null) ||
        Number(searchParams.get('category')) === id
          ? 'bg-primary text-text-inverse'
          : 'bg-surface border-border hover:bg-primary-soft hover:text-primary'
      }
      `}
      onClick={changeCategory}
    >
      {name}
    </button>
  );
};

export default CategoryCard;
