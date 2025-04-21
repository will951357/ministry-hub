
import { Bell, Calendar, BookOpen } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface TopNavProps {
  toggleSidebar: () => void;
}

export function TopNav({ toggleSidebar }: TopNavProps) {
  return (
    <header className="sticky top-0 z-10 h-16 border-b border-church-border bg-white shadow-sm">
      <div className="flex h-full items-center justify-between px-4">
        <div className="flex flex-col items-start justify-center">
          <h2 className="text-xl font-semibold text-church-primary">Grace Community Church</h2>
          <p className="text-xs text-church-secondary italic">"For by grace you have been saved through faith." — Ephesians 2:8</p>
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
          </TooltipProvider>
        </div>
      </div>
    </header>
  );
}
