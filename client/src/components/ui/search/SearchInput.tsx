import { Search } from 'lucide-react';

interface ISearchInputProps {
  className?: string;
}

const SearchInput = ({ className }: ISearchInputProps) => {
  return (
    <div
      className={`relative flex items-start w-full max-w-4xl ${className ?? ''}`}
    >
      <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-text-muted" />
      <input
        type="text"
        className="w-full pt-2 pr-4 pb-2 pl-12 bg-surface-muted rounded-xl border-2 border-transparent text-base transition-all duration-200 focus:border-primary focus:bg-surface focus:outline-none"
        placeholder="Поиск продуктов..."
      />
    </div>
  );
};

export default SearchInput;
