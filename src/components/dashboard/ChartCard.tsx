
import { ReactNode } from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface ChartCardProps {
  title: string;
  description?: string;
  children: ReactNode;
  icon?: ReactNode;
}

export function ChartCard({ title, description, children, icon }: ChartCardProps) {
  return (
    <Card className="relative p-6 border-church-border bg-white">
      {icon && (
        <div className="absolute top-4 right-4 p-2 rounded-full bg-primary/10">
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
