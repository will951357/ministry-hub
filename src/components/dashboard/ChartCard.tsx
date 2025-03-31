
import { ReactNode } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface ChartCardProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export function ChartCard({ title, description, children }: ChartCardProps) {
  return (
    <Card className="border-church-border bg-white">
      <CardHeader className="pb-2">
        <CardTitle className="text-church-primary">{title}</CardTitle>
        {description && <CardDescription className="text-church-secondary">{description}</CardDescription>}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
