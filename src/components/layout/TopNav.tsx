
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

        <div className="flex items-center gap-4">
          <button className="relative p-2 rounded-md hover:bg-church-muted text-church-primary">
            <Bell size={20} />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-church-danger"></span>
          </button>
          
          <button className="p-2 rounded-md hover:bg-church-muted text-church-primary">
            <Calendar size={20} />
          </button>
          
          <button className="p-2 rounded-md hover:bg-church-muted text-church-primary">
            <BookOpen size={20} />
          </button>
        </div>
      </div>
    </header>
  );
}
