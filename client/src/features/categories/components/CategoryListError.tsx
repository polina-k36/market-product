interface ICategoryListErrorProps {
  resetErrorBoundary: () => void;
}

const CategoryListError = ({ resetErrorBoundary }: ICategoryListErrorProps) => {
  return (
    <div className="mt-4 flex items-center justify-between gap-4 rounded-xl border border-danger/30 bg-danger/10 px-4 py-3">
      <p className="text-sm text-text-primary">
        Не удалось загрузить категории
      </p>

      <button
        type="button"
        onClick={resetErrorBoundary}
        className="shrink-0 text-sm font-semibold text-danger transition-colors hover:text-danger/80"
      >
        Повторить
      </button>
    </div>
  );
};

export default CategoryListError;
