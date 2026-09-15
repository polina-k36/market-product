const CategoryListSkeleton = () => {
  return (
    <div className="mt-4 flex gap-2 overflow-x-auto scrollbar-none">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="h-10 w-24 shrink-0 animate-pulse rounded-3xl bg-surface-muted"
        />
      ))}
    </div>
  );
};

export default CategoryListSkeleton;
