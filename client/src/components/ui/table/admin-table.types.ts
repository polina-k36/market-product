import type { ReactNode } from 'react';

export interface IAdminTableColumn<T> {
  key: string;
  title: string;
  width?: number | string;
  minWidth?: number | string;
  maxWidth?: number | string;
  maxLines?: number;
  searchable?: boolean;
  value?: (row: T) => unknown;
  render?: (row: T) => ReactNode;
  align?: 'left' | 'center' | 'right';
  className?: string;
}
