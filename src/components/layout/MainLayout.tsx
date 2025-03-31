
import { PropsWithChildren, useState } from 'react';
import { SideNav } from './SideNav';
import { TopNav } from './TopNav';
import { cn } from '@/lib/utils';

export function MainLayout({ children }: PropsWithChildren) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  return (
    <div className="min-h-screen bg-church-background-light flex">
      {/* Sidebar */}
      <SideNav isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      {/* Main content */}
      <div className={cn(
        "flex-1 transition-all duration-300 ease-in-out",
        isSidebarOpen ? "ml-64" : "ml-16"
      )}>
        <TopNav toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
