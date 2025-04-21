
import { PropsWithChildren } from 'react';
import { SideNav } from './SideNav';
import { TopNav } from './TopNav';
import { cn } from '@/lib/utils';
import { 
  SidebarProvider,
  SidebarTrigger,
  SidebarInset 
} from '@/components/ui/sidebar';

export function MainLayout({ children }: PropsWithChildren) {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full bg-church-background">
        <SideNav />
        <SidebarInset>
          <TopNav />
          <main className="p-6">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
