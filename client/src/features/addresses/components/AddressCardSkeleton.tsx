const AddressCardSkeleton = () => {
  return (
    <div
      aria-hidden="true"
      className="flex w-full items-start gap-4 rounded-xl p-3"
    >
      <div className="size-10 shrink-0 animate-pulse rounded-lg bg-background" />

      <div className="min-w-0 flex-1 space-y-3 py-1">
        <div className="h-4 w-2/3 animate-pulse rounded bg-background" />

        <div className="h-3 w-4/5 animate-pulse rounded bg-background" />

        <div className="h-3 w-1/2 animate-pulse rounded bg-background" />

        <div className="h-3 w-2/5 animate-pulse rounded bg-background" />
      </div>

      <div className="size-4 shrink-0 animate-pulse rounded-full bg-background" />
    </div>
  );
};

export default AddressCardSkeleton;
