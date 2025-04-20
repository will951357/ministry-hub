import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
interface StatsCardProps {
  title: string;
  value: string;
  description?: string | ReactNode;
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