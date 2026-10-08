import { ShoppingBag } from 'lucide-react';

const CartPanelEmpty = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center px-6 text-center">
      <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-neutral-100">
        <ShoppingBag className="h-10 w-10 text-neutral-300" />
      </div>
      <h3 className="mb-2 text-lg font-semibold text-text-primary">
        Корзина пуста
      </h3>
      <p className="text-sm text-text-secondary">Добавьте товары из каталога</p>
      <button
        onClick={() => {}}
        className="mt-6 cursor-pointer rounded-xl bg-primary-soft px-6 py-2.5 text-sm font-semibold text-primary transition-colors duration-200 hover:bg-primary-hover hover:text-primary-soft"
      >
        В каталог
      </button>
    </div>
  );
};

export default CartPanelEmpty;
