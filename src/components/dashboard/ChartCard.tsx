
import { ReactNode } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface ChartCardProps {
  title: string;
  description?: string;
  children: ReactNode;
  icon?: ReactNode;
  className?: string;
}

export function ChartCard({ title, description, children, icon, className }: ChartCardProps) {
  return (
    <Card className={cn("relative p-6 border-church-border bg-white", className)}>
      {icon && (
        <div className="absolute top-4 right-4 p-2 rounded-full bg-primary/10 text-primary">
          {icon}
        </div>
      )}
      
      <div className="mb-6">
        <h3 className="text-lg font-medium text-church-primary">{title}</h3>
        {description && <p className="text-sm text-church-secondary">{description}</p>}
      </div>

      {children}
    </Card>
  );
}
