
import { Bell, Menu, Calendar, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface TopNavProps {
  toggleSidebar: () => void;
  showMenuButton: boolean;
}

export function TopNav({ toggleSidebar, showMenuButton }: TopNavProps) {
  return (
    <header className="sticky top-0 z-10 h-16 border-b border-church-border bg-white shadow-sm">
      <div className="flex h-full items-center justify-between px-4">
        <div className="flex items-center gap-4">
          {showMenuButton && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleSidebar}
              className="md:hidden text-church-primary hover:bg-church-muted hover:text-church-accent"
            >
              <Menu size={24} />
            </Button>
          )}
          <div className="flex flex-col items-start justify-center">
            <h2 className="text-xl font-semibold text-church-primary truncate">
              <span className="md:hidden">GCC</span>
              <span className="hidden md:inline">Grace Community Church</span>
            </h2>
            <p className="text-xs text-church-secondary italic hidden md:block">"For by grace you have been saved through faith." — Ephesians 2:8</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="relative text-church-primary hover:bg-church-muted hover:text-church-accent">
                  <Bell size={20} />
                  <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-church-danger"></span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Notifications</p>
              </TooltipContent>
            </Tooltip>

            <div className="hidden md:flex">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-church-primary hover:bg-church-muted hover:text-church-accent">
                    <Calendar size={20} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Calendar</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-church-primary hover:bg-church-muted hover:text-church-accent">
                    <BookOpen size={20} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Scripture</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </TooltipProvider>
        </div>
      </div>
    </header>
  );
}
