import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
interface StatsCardProps {
  title: string;
  value: string;
  description?: string;
  icon?: ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
  onClick?: () => void;
  footer?: ReactNode;
}
export function StatsCard({
  title,
  value,
  description,
  icon,
  trend,
  className,
  onClick,
  footer
}: StatsCardProps) {
  return;
}