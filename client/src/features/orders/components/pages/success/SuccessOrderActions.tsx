import Button from '@/components/ui/buttons/Button';
import { Package, ShoppingBag } from 'lucide-react';

const SuccessOrderActions = () => {
  return (
    <div className="flex flex-col items-center justify-between gap-3 sm:flex-row lg:gap-7">
      <Button variant="transparent" className="w-full border border-primary">
        <Package className="h-4 w-4" /> Мои заказы
      </Button>
      <Button variant="primary" className="w-full">
        <ShoppingBag className="h-4 w-4" />
        Продолжить покупки
      </Button>
    </div>
  );
};

export default SuccessOrderActions;
