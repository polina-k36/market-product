import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router';

const FullLogo = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="flex size-10 items-center justify-center rounded-xl bg-primary">
        <ShoppingCart className="size-5 text-white" strokeWidth={2} />
      </div>
      <Link
        to="/"
        className="m-0 text-xl leading-6 font-extrabold text-text-primary"
      >
        <span>FreshMart</span>
      </Link>
    </div>
  );
};

export default FullLogo;
