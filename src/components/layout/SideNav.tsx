
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  Home, 
  Users, 
  Calendar, 
  Settings, 
  FileText, 
  DollarSign, 
  UsersRound, 
  ChevronRight, 
  ChevronLeft,
  PanelLeft,
  CopyCheck,
  BadgeDollarSign,
  Receipt,
  PiggyBank,
  UserCheck,
  UserPlus,
  Map,
  CalendarClock,
  Cake,
  Smartphone
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
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface SideNavProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function SideNav({ isOpen, setIsOpen }: SideNavProps) {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState(() => {
    // Determine the active item based on the current path
    const path = location.pathname;
    if (path === '/') return 'dashboard';
    if (path.startsWith('/people')) return 'people';
    if (path.startsWith('/finance')) return 'finance';
    if (path.startsWith('/app-member')) return 'app-member';
    return path.substring(1); // Remove the leading slash
  });
  
  const [openSubmenus, setOpenSubmenus] = useState<string[]>(['people', 'finance', 'app-member']);
  
  const toggleSubmenu = (id: string) => {
    setOpenSubmenus(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id) 
        : [...prev, id]
    );
  };
  
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <Home size={20} />, href: '/' },
    { 
      id: 'people', 
      label: 'People', 
      icon: <Users size={20} />, 
      href: '/people',
      subItems: [
        { id: 'members', label: 'Members', icon: <UserCheck size={18} />, href: '/people/members' },
        { id: 'visitors', label: 'Visitors', icon: <UserPlus size={18} />, href: '/people/visitors' },
        { id: 'journeys', label: 'Journeys', icon: <Map size={18} />, href: '/people/journeys' },
        { id: 'appointments', label: 'Appointments', icon: <CalendarClock size={18} />, href: '/people/appointments' },
        { id: 'birthdays', label: 'Birthdays', icon: <Cake size={18} />, href: '/people/birthdays' },
      ]
    },
    { 
      id: 'finance', 
      label: 'Finance', 
      icon: <DollarSign size={20} />, 
      href: '/finance',
      subItems: [
        { id: 'donations', label: 'Donations', icon: <BadgeDollarSign size={18} />, href: '/finance/donations' },
        { id: 'tithes', label: 'Tithes', icon: <Receipt size={18} />, href: '/finance/tithes' },
        { id: 'funds', label: 'Funds', icon: <PiggyBank size={18} />, href: '/finance/funds' },
      ]
    },
    { 
      id: 'app-member', 
      label: 'App Member', 
      icon: <Smartphone size={20} />, 
      href: '/app-member',
      subItems: [
        { id: 'blog', label: 'Blog', icon: <FileText size={18} />, href: '/app-member/blog' },
      ]
    },
    { id: 'ministries', label: 'Ministries', icon: <CopyCheck size={20} />, href: '/ministries' },
    { id: 'groups', label: 'Groups', icon: <UsersRound size={20} />, href: '/groups' },
    { id: 'events', label: 'Events', icon: <Calendar size={20} />, href: '/events' },
    { id: 'settings', label: 'Settings', icon: <Settings size={20} />, href: '/settings' },
  ];

  return (
    <aside 
      className={cn(
        "fixed left-0 top-0 h-full bg-sidebar text-sidebar-foreground transition-all duration-300 ease-in-out z-20",
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
      
      <div className="py-4 overflow-y-auto h-[calc(100vh-4rem-6rem)]">
        <nav className="space-y-1 px-2">
          {navItems.map((item) => (
            item.subItems ? (
              <Collapsible 
                key={item.id}
                open={openSubmenus.includes(item.id) && isOpen}
                className="w-full"
              >
                <CollapsibleTrigger asChild>
                  <button
                    className={cn(
                      "flex items-center w-full rounded-md px-3 py-2 text-sm font-medium transition-all",
                      activeItem === item.id 
                        ? "bg-church-accent text-white" 
                        : "text-sidebar-foreground hover:bg-sidebar-accent/20",
                      !isOpen && "justify-center"
                    )}
                    onClick={() => {
                      if (isOpen) {
                        toggleSubmenu(item.id);
                      } else {
                        setIsOpen(true);
                        if (!openSubmenus.includes(item.id)) {
                          toggleSubmenu(item.id);
                        }
                      }
                      setActiveItem(item.id);
                    }}
                  >
                    <span className={cn("mr-3", !isOpen && "mr-0")}>{item.icon}</span>
                    {isOpen && (
                      <>
                        <span className="flex-1 text-left">{item.label}</span>
                        <ChevronRight 
                          className={cn("h-4 w-4 transition-transform", 
                            openSubmenus.includes(item.id) && "transform rotate-90"
                          )} 
                        />
                      </>
                    )}
                  </button>
                </CollapsibleTrigger>
                {isOpen && (
                  <CollapsibleContent className="pl-9 pr-2 pt-1 space-y-1">
                    {item.subItems.map((subItem) => (
                      <Link
                        key={subItem.id}
                        to={subItem.href}
                        className={cn(
                          "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-all",
                          location.pathname === subItem.href || location.pathname === item.href && subItem.id === "members"
                            ? "bg-sidebar-accent/30 text-white" 
                            : "text-sidebar-foreground/90 hover:bg-sidebar-accent/10 hover:text-sidebar-foreground"
                        )}
                        onClick={() => setActiveItem(item.id)}
                      >
                        <span className="mr-3">{subItem.icon}</span>
                        <span>{subItem.label}</span>
                      </Link>
                    ))}
                  </CollapsibleContent>
                )}
              </Collapsible>
            ) : (
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
                <span className={cn("mr-3", !isOpen && "mr-0")}>{item.icon}</span>
                {isOpen && <span>{item.label}</span>}
              </Link>
            )
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
