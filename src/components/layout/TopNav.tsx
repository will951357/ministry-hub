
import { Bell, Search, Menu } from 'lucide-react';
import { Input } from '@/components/ui/input';
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
        <div className="flex items-center">
          <button onClick={toggleSidebar} className="mr-4 p-2 rounded-md hover:bg-church-muted text-church-primary">
            <Menu size={20} />
          </button>
          <div className="hidden md:flex md:w-72">
            <div className="relative w-full">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-church-secondary" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-full bg-church-background pl-8 md:w-[320px] lg:w-[360px] border-church-border text-church-primary"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="relative p-2 rounded-md hover:bg-church-muted text-church-primary">
            <Bell size={20} />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-church-danger"></span>
          </button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 rounded-full">
                <Avatar className="h-8 w-8 border border-church-border">
                  <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                  <AvatarFallback className="bg-church-accent text-white">GC</AvatarFallback>
                </Avatar>
                <span className="hidden text-sm font-medium md:inline text-church-primary">Grace Church</span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white border-church-border">
              <DropdownMenuLabel className="text-church-primary">My Church</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-church-border" />
              <DropdownMenuItem className="text-church-secondary hover:text-church-primary hover:bg-church-muted">Profile</DropdownMenuItem>
              <DropdownMenuItem className="text-church-secondary hover:text-church-primary hover:bg-church-muted">Settings</DropdownMenuItem>
              <DropdownMenuItem className="text-church-secondary hover:text-church-primary hover:bg-church-muted">Switch Church</DropdownMenuItem>
              <DropdownMenuSeparator className="bg-church-border" />
              <DropdownMenuItem className="text-church-secondary hover:text-church-primary hover:bg-church-muted">Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
