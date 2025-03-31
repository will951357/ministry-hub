
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
}

export function StatsCard({
  title,
  value,
  description,
  icon,
  trend,
  className,
}: StatsCardProps) {
  return (
    <div className={cn("stats-card", className)}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <h3 className="mt-2 text-2xl font-semibold">{value}</h3>
          {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
          {trend && (
            <p className={cn(
              "text-xs mt-2 flex items-center",
              trend.isPositive ? "text-church-secondary" : "text-church-danger"
            )}>
              {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
              <span className="text-muted-foreground ml-1">from last month</span>
            </p>
          )}
        </div>
        {icon && <div className="rounded-md bg-primary/10 p-2 text-primary">{icon}</div>}
      </div>
    </div>
  );
}
