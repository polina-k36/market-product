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
    <div className="flex min-w-70 items-center justify-start gap-3 rounded-2xl border border-border bg-surface p-6 pt-4 pb-4 transition-all hover:-translate-y-1 hover:shadow-lg md:block md:p-6 lg:flex-1">
      <div
        className={`flex size-10 items-center justify-center rounded-xl ${iconColors[colorIcon]} md:mb-4 md:size-14`}
      >
        {<Icon />}
      </div>
      <div>
        <h3 className="mb-1 text-base font-semibold text-text-primary">
          {title}
        </h3>
        <p className="text-xs font-semibold text-text-secondary">{subtitle}</p>
      </div>
    </div>
  );
};

export default FeatureCard;
