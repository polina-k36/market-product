const ProductCardSkeleton = () => {
  return (
    <div className="overflow-hidden rounded-2xl bg-surface shadow-2xs">
      <div className="relative flex aspect-square items-center justify-center overflow-hidden bg-surface-muted">
        <div className="absolute inset-0 animate-shimmer bg-linear-to-r from-transparent via-surface/50 to-transparent" />

        <div className="absolute top-3 left-3 h-7 w-20 rounded-full bg-surface/20 shadow-sm"></div>
      </div>

      <div className="p-5">
        <div className="relative h-6 w-3/5 overflow-hidden rounded-md bg-surface-muted">
          <div className="absolute inset-0 animate-shimmer bg-linear-to-r from-transparent via-surface/50 to-transparent" />
        </div>

        <div className="mt-5 flex items-center justify-between">
          <div className="space-y-2">
            <div className="relative h-8 w-28 overflow-hidden rounded-md bg-surface-muted">
              <div className="absolute inset-0 animate-shimmer bg-linear-to-r from-transparent via-surface/50 to-transparent" />
            </div>

            <div className="relative h-4 w-14 overflow-hidden rounded-md bg-surface-muted">
              <div className="absolute inset-0 animate-shimmer bg-linear-to-r from-transparent via-surface/50 to-transparent" />
            </div>
          </div>
          <div className="relative size-11 overflow-hidden rounded-xl bg-surface-muted">
            <div className="absolute inset-0 animate-shimmer bg-linear-to-r from-transparent via-surface/50 to-transparent" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
