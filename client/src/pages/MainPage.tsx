import HorizontalScroll from '@/components/layout/horizontal-scroll/HorizontalScroll';
import MainLayout from '@/components/layout/main-layout/MainLayout';
import { features } from '@/components/widgets/feature-card/feature-card.data';
import FeatureCard from '@/components/widgets/feature-card/FeatureCard';
import HeroBanner from '@/components/widgets/hero-banner/HeroBanner';
import CategoryList from '@/features/categories/components/CategoryList';
import CategoryListError from '@/features/categories/components/CategoryListError';
import CategoryListSkeleton from '@/features/categories/components/CategoryListSkeleton';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

const MainPage = () => {
  return (
    <>
      <MainLayout>
        <HeroBanner />
        <HorizontalScroll className="md:grid md:grid-cols-2 md:grid-rows-2 md:p-0 lg:flex">
          {features.map((feature) => (
            <FeatureCard key={feature.id} {...feature} />
          ))}
        </HorizontalScroll>

        <ErrorBoundary FallbackComponent={CategoryListError}>
          <Suspense fallback={<CategoryListSkeleton />}>
            <CategoryList />
          </Suspense>
        </ErrorBoundary>
      </MainLayout>
    </>
  );
};

export default MainPage;
