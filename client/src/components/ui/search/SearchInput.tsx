import { Search } from 'lucide-react';

interface ISearchInputProps {
  className?: string;
}

const SearchInput = ({ className }: ISearchInputProps) => {
  return (
    <div
      className={`relative flex w-full max-w-4xl items-start ${className ?? ''}`}
    >
      <Search className="absolute top-1/2 left-4 size-5 -translate-y-1/2 text-text-muted" />
      <input
        type="text"
        className="w-full rounded-xl border-2 border-transparent bg-surface-muted pt-2 pr-4 pb-2 pl-12 text-base transition-all duration-200 focus:border-primary focus:bg-surface focus:outline-none"
        placeholder="Поиск продуктов..."
      />
    </div>
  );
};

export default SearchInput;
