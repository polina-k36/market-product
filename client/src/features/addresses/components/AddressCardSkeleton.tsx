const AddressCardSkeleton = () => {
  return (
    <div className="flex min-w-45 animate-pulse items-start gap-3 rounded-lg border border-border bg-surface px-2.5 py-2">
      <div className="flex flex-1 items-center gap-2">
        <div className="size-7 shrink-0 rounded-md bg-surface-muted" />

        <div className="min-w-0 flex-1 space-y-1.5">
          <div className="h-3 w-4/5 rounded bg-surface-muted" />
          <div className="h-2.5 w-2/5 rounded bg-surface-muted" />
        </div>
      </div>

      <div className="size-4 shrink-0 rounded-full bg-surface-muted" />
    </div>
  );
};

export default AddressCardSkeleton;
