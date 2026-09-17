interface IProductGridErrorProps {
  onRetry: () => void;
}

const ProductGridError = ({ onRetry }: IProductGridErrorProps) => {
  return (
    <div className="mt-6 flex items-center justify-between gap-4 rounded-xl border border-danger/30 bg-danger/10 px-4 py-3">
      <p className="text-sm text-text-primary">Не удалось загрузить продукты</p>

      <button
        type="button"
        className="shrink-0 text-sm font-semibold text-danger transition-colors hover:text-danger/80"
        onClick={onRetry}
      >
        Повторить
      </button>
    </div>
  );
};

export default ProductGridError;
