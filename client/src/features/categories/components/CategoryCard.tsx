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
      className={`w-fit cursor-pointer rounded-3xl border pt-2 pr-4 pb-2 pl-4 font-semibold whitespace-nowrap ${
        (id === undefined && searchParams.get('category') === null) ||
        Number(searchParams.get('category')) === id
          ? 'bg-primary text-text-inverse'
          : 'border-border bg-surface hover:bg-primary-soft hover:text-primary'
      } `}
      onClick={changeCategory}
    >
      {name}
    </button>
  );
};

export default CategoryCard;
