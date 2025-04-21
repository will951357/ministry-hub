
import { PropsWithChildren, useState, useEffect } from 'react';
import { SideNav } from './SideNav';
import { TopNav } from './TopNav';
import { cn } from '@/lib/utils';

export function MainLayout({ children }: PropsWithChildren) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobileView(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);
  
  return (
    <div className="min-h-screen bg-church-background flex">
      <SideNav 
        isOpen={isSidebarOpen} 
        setIsOpen={setIsSidebarOpen}
        isMobileView={isMobileView}
      />
      
      <div className={cn(
        "flex-1 transition-all duration-300 ease-in-out",
        !isMobileView && isSidebarOpen ? "ml-64" : "ml-0 md:ml-16"
      )}>
        <TopNav 
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          showMenuButton={isMobileView} 
        />
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
