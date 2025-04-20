
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
  return (
    <Card onClick={onClick} className={cn("relative", className)}>
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          {icon && (
            <div className="p-1.5 rounded-full bg-primary/10 text-primary">
              {icon}
            </div>
          )}
        </div>
        
        <div>
          <h3 className="text-xl font-bold">{value}</h3>
          
          {description && (
            <p className="text-sm text-muted-foreground mt-1">
              {description}
            </p>
          )}
          
          {trend && (
            <div className={cn(
              "flex items-center text-xs mt-2",
              trend.isPositive ? "text-green-600" : "text-red-600"
            )}>
              <span>
                {trend.isPositive ? "+" : "-"}{Math.abs(trend.value)}%
              </span>
              <span className="ml-1">from last period</span>
            </div>
          )}
        </div>
      </CardContent>
      
      {footer && (
        <CardFooter className="pt-0 pb-3 px-4">
          {footer}
        </CardFooter>
      )}
    </Card>
  );
}
