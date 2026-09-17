import NavButton from '@/components/ui/buttons/NavButton';
import { Image } from 'lucide-react';
import { useNavigate } from 'react-router';

const ProductDetailsSkeleton = () => {
  const navigate = useNavigate();
  return (
    <div className="relative mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="grid gap-8 md:grid-cols-2 md:items-start lg:gap-30">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-surface-muted p-4 min-[400px]:m-auto min-[400px]:w-3/4 sm:p-6 md:m-0 md:w-full">
          <NavButton onNavigate={() => navigate(-1)}>Вернуться</NavButton>

          <div className="relative mt-6 flex aspect-square items-center justify-center overflow-hidden rounded-2xl bg-surface">
            <Image className="size-1/3 text-surface-muted" />

            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute inset-y-0 -left-1/2 w-full animate-shimmer bg-linear-to-r from-transparent via-surface/40 to-transparent" />
            </div>

            <div className="absolute top-3 left-3 overflow-hidden rounded-full bg-surface/90 px-3 py-1.5 shadow-sm">
              <div className="relative h-4 w-16 rounded-full bg-surface-muted">
                <div className="absolute inset-y-0 -left-1/2 w-full animate-shimmer bg-linear-to-r from-transparent via-surface/50 to-transparent" />
              </div>
            </div>
          </div>
        </div>
        <div className="pt-1 lg:pt-4">
          <div className="h-8 w-24 animate-pulse rounded-full bg-surface-muted" />

          <div className="mt-4 h-12 w-3/4 animate-pulse rounded-xl bg-surface-muted sm:h-14" />

          <div className="mt-5 flex items-baseline gap-2">
            <div className="h-11 w-32 animate-pulse rounded-lg bg-surface-muted sm:h-12 sm:w-36" />
            <div className="h-6 w-20 animate-pulse rounded-md bg-surface-muted" />
          </div>

          <div className="mt-5 flex items-center justify-between gap-4 rounded-2xl border border-border bg-surface p-3 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="size-10 animate-pulse rounded-xl bg-surface-muted" />

              <div className="h-4 w-32 animate-pulse rounded-md bg-surface-muted" />
            </div>

            <div className="size-12 animate-pulse rounded-xl bg-surface-muted" />
          </div>

          <section className="mt-6">
            <div className="h-6 w-28 animate-pulse rounded-md bg-surface-muted" />

            <div className="mt-3 space-y-2 rounded-2xl border border-border bg-surface-muted p-5">
              <div className="h-4 w-full animate-pulse rounded bg-surface" />
              <div className="h-4 w-full animate-pulse rounded bg-surface" />
              <div className="h-4 w-5/6 animate-pulse rounded bg-surface" />
              <div className="h-4 w-2/3 animate-pulse rounded bg-surface" />
            </div>
          </section>

          <section className="mt-6">
            <div className="h-6 w-24 animate-pulse rounded-md bg-surface-muted" />

            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 rounded-xl border border-border bg-surface px-4 py-3"
                >
                  <div className="size-8 animate-pulse rounded-lg bg-surface-muted" />
                  <div className="h-4 w-20 animate-pulse rounded bg-surface-muted" />
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsSkeleton;
