import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router';

interface IFullLogoProps {
  variant: 'primary' | 'white';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const FullLogo = ({ variant, size = 'md', className }: IFullLogoProps) => {
  const variants = {
    primary: {
      icon: 'bg-primary text-text-inverse',
      link: 'text-text-primary',
    },
    white: {
      icon: 'bg-surface/20 backdrop-blur-sm text-text-inverse',
      link: 'text-text-inverse',
    },
  };

  const sizes = {
    sm: {
      link: 'text-base font-extrabold',
      icon: 'size-8',
    },
    md: {
      link: 'text-xl font-extrabold',
      icon: 'size-10',
    },
    lg: {
      link: 'text-3xl font-bold ',
      icon: 'size-12',
    },
  };
  return (
    <Link to="/" className={`flex w-fit items-center gap-2 ${className}`}>
      <div
        className={`flex items-center justify-center rounded-xl p-2.5 ${variants[variant].icon} ${sizes[size].icon}`}
      >
        <ShoppingCart strokeWidth={2} />
      </div>
      <span
        className={`m-0 leading-6 ${variants[variant].link} ${sizes[size].link}`}
      >
        FreshMart
      </span>
    </Link>
  );
};

export default FullLogo;
