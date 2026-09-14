import { ShoppingCart } from 'lucide-react';

const FullLogo = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="flex size-10 items-center justify-center rounded-xl bg-primary">
        <ShoppingCart className="size-5 text-white" strokeWidth={2} />
      </div>
      <a
        href="/"
        className="m-0 text-xl font-extrabold leading-6 text-text-primary"
      >
        <span>FreshMart</span>
      </a>
    </div>
  );
};

export default FullLogo;
