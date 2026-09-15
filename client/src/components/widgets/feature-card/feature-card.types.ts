import type { LucideIcon } from 'lucide-react';

export interface IFeatureData {
  id: number;
  icon: LucideIcon;
  colorIcon: 'blue' | 'purple' | 'red' | 'green';
  title: string;
  subtitle: string;
}
