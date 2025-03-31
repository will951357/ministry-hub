
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  Home, 
  Users, 
  Calendar, 
  Settings, 
  FileText, 
  DollarSign, 
  Clock, 
  UsersRound, 
  ChevronRight, 
  ChevronLeft,
  PanelLeft,
  CopyCheck,
  BookOpen
} from 'lucide-react';
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

interface SideNavProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function SideNav({ isOpen, setIsOpen }: SideNavProps) {
  const [activeItem, setActiveItem] = useState('people');
  
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <Home size={20} />, href: '/' },
    { id: 'people', label: 'People', icon: <Users size={20} />, href: '/people' },
    { id: 'ministries', label: 'Ministries', icon: <CopyCheck size={20} />, href: '/ministries' },
    { id: 'groups', label: 'Groups', icon: <UsersRound size={20} />, href: '/groups' },
    { id: 'events', label: 'Events', icon: <Calendar size={20} />, href: '/events' },
    { id: 'finance', label: 'Finance', icon: <DollarSign size={20} />, href: '/finance' },
    { id: 'sermons', label: 'Sermons', icon: <FileText size={20} />, href: '/sermons' },
    { id: 'check-in', label: 'Check In', icon: <Clock size={20} />, href: '/check-in' },
    { id: 'settings', label: 'Settings', icon: <Settings size={20} />, href: '/settings' },
  ];

  return (
    <aside 
      className={cn(
        "fixed left-0 top-0 h-full bg-sidebar text-sidebar-foreground transition-all duration-300 ease-in-out",
        isOpen ? "w-64" : "w-16"
      )}
    >
      <div className="flex h-16 items-center px-4 border-b border-sidebar-border">
        {isOpen ? (
          <div className="flex items-center space-x-2">
            <PanelLeft className="h-6 w-6 text-church-accent" />
            <span className="font-semibold text-xl text-white">ChurchHub</span>
          </div>
        ) : (
          <PanelLeft className="h-6 w-6 mx-auto text-church-accent" />
        )}
      </div>
      
      <div className="py-4">
        <nav className="space-y-1 px-2">
          {navItems.map((item) => (
            <Link
              key={item.id}
              to={item.href}
              className={cn(
                "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-all",
                activeItem === item.id 
                  ? "bg-church-accent text-white" 
                  : "text-sidebar-foreground hover:bg-sidebar-accent/20",
                !isOpen && "justify-center"
              )}
              onClick={() => setActiveItem(item.id)}
            >
              <span className="mr-3">{item.icon}</span>
              {isOpen && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>
      </div>
      
      {isOpen && (
        <div className="absolute bottom-24 left-0 right-0 px-4">
          <div className="flex items-center space-x-3 py-4 border-t border-sidebar-border">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10 border border-church-border">
                    <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                    <AvatarFallback className="bg-church-accent text-white">GC</AvatarFallback>
                  </Avatar>
                  <div className="text-left">
                    <p className="text-sm font-medium text-sidebar-foreground">Pastor John</p>
                    <p className="text-xs text-sidebar-foreground/70">Admin</p>
                  </div>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="bg-white border-church-border">
                <DropdownMenuLabel className="text-church-primary">My Account</DropdownMenuLabel>
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
      )}
      
      <div className="absolute bottom-4 left-0 right-0 flex justify-center">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-full bg-sidebar-border/20 hover:bg-sidebar-border/30 transition-all text-sidebar-foreground"
          variant="ghost"
          size="icon"
        >
          {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </Button>
      </div>
    </aside>
  );
}
