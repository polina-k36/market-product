import type { LucideIcon } from 'lucide-react';

interface IFeatureCardProps {
  icon: LucideIcon;
  colorIcon: 'blue' | 'green' | 'purple' | 'red';
  title: string;
  subtitle: string;
}

const FeatureCard = ({
  icon,
  colorIcon,
  title,
  subtitle,
}: IFeatureCardProps) => {
  const iconColors = {
    blue: 'bg-blue/20 text-blue',
    green: 'bg-green/20 text-green',
    purple: 'bg-purple/20 text-purple',
    red: 'bg-red/20 text-red',
  };
  const Icon = icon;

  return (
    <div
      className="flex items-center justify-start gap-3  bg-surface rounded-2xl p-6 pt-4 pb-4 border border-border transition-all 
      hover:-translate-y-1 hover:shadow-lg min-w-70 md:block md:p-6 lg:flex-1"
    >
      <div
        className={`flex items-center justify-center size-10 rounded-xl
        ${iconColors[colorIcon]} md:mb-4 md:size-14`}
      >
        {<Icon />}
      </div>
      <div>
        <h3 className="text-base font-semibold text-text-primary mb-1">
          {title}
        </h3>
        <p className="text-xs font-semibold text-text-secondary">{subtitle}</p>
      </div>
    </div>
  );
};

export default FeatureCard;
