
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  Home, 
  Users, 
  Calendar, 
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
  Smartphone,
  Baby,
  Book,
  GraduationCap,
  Calculator,
  LayoutGrid
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
  isMobileView: boolean;
}

export function SideNav({ isOpen, setIsOpen, isMobileView }: SideNavProps) {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState(() => {
    const path = location.pathname;
    if (path === '/') return 'dashboard';
    if (path.startsWith('/people')) return 'people';
    if (path.startsWith('/finance')) return 'finance';
    if (path.startsWith('/app-member')) return 'app-member';
    if (path.startsWith('/groups')) return 'groups';
    return path.substring(1);
  });
  
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  
  useEffect(() => {
    if (isOpen) {
      if (activeItem === 'people' || activeItem === 'finance' || activeItem === 'app-member' || activeItem === 'groups') {
        setOpenSubmenu(activeItem);
      }
    }
  }, []);
  
  const toggleSubmenu = (id: string) => {
    setOpenSubmenu(prev => prev === id ? null : id);
  };
  
  const [membershipRequestsCount, setMembershipRequestsCount] = useState(4);
  
  // Function to handle menu item clicks, will close the sidebar on mobile
  const handleMenuItemClick = () => {
    if (isMobileView) {
      setIsOpen(false);
    }
  };
  
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <Home size={20} />, href: '/' },
    { id: 'calendar', label: 'Calendar', icon: <Calendar size={20} />, href: '/calendar' },
    { 
      id: 'people', 
      label: 'People', 
      icon: <Users size={20} />, 
      href: '/people',
      badge: membershipRequestsCount,
      subItems: [
        { 
          id: 'members', 
          label: 'Members', 
          icon: <UserCheck size={18} />, 
          href: '/people/members',
          badge: membershipRequestsCount 
        },
        { id: 'visitors', label: 'Visitors', icon: <UserPlus size={18} />, href: '/people/visitors' },
        { id: 'journeys', label: 'Journeys', icon: <Map size={18} />, href: '/people/journeys' },
        { id: 'appointments', label: 'Appointments', icon: <CalendarClock size={18} />, href: '/people/appointments' },
        { id: 'birthdays', label: 'Birthdays', icon: <Cake size={18} />, href: '/people/birthdays' },
        { id: 'kids', label: 'Kids', icon: <Baby size={18} />, href: '/people/kids' },
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
        { id: 'accounting', label: 'Accounting', icon: <Calculator size={18} />, href: '/finance/accounting' },
      ]
    },
    { 
      id: 'app-member', 
      label: 'App Member', 
      icon: <Smartphone size={20} />, 
      href: '/app-member',
      subItems: [
        { id: 'blog', label: 'Blog', icon: <FileText size={18} />, href: '/app-member/blog' },
        { id: 'app-manager', label: 'App Manager', icon: <LayoutGrid size={18} />, href: '/app-member/app-manager' },
      ]
    },
    { id: 'ministries', label: 'Ministries', icon: <CopyCheck size={20} />, href: '/ministries' },
    { 
      id: 'groups', 
      label: 'Groups', 
      icon: <UsersRound size={20} />, 
      href: '/groups',
      subItems: [
        { id: 'groups-main', label: 'Church Groups', icon: <UsersRound size={18} />, href: '/groups' },
        { id: 'learning', label: 'Learning', icon: <GraduationCap size={18} />, href: '/groups/learning' },
      ]
    },
    { id: 'events', label: 'Events', icon: <Calendar size={20} />, href: '/events' },
  ];

  return (
    <aside 
      className={cn(
        "fixed left-0 top-0 h-full bg-sidebar text-sidebar-foreground transition-all duration-300 ease-in-out z-20",
        isOpen ? "w-64" : "w-0 md:w-16",
        isMobileView && !isOpen && "transform -translate-x-full md:transform-none"
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
                open={openSubmenu === item.id && isOpen}
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
                        toggleSubmenu(item.id);
                      }
                      setActiveItem(item.id);
                    }}
                  >
                    <span className={cn("mr-3", !isOpen && "mr-0")}>{item.icon}</span>
                    {isOpen && (
                      <>
                        <span className="flex-1 text-left">{item.label}</span>
                        {item.badge && (
                          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white text-xs font-medium">
                            {item.badge}
                          </span>
                        )}
                        <ChevronRight 
                          className={cn("h-4 w-4 transition-transform ml-2", 
                            openSubmenu === item.id && "transform rotate-90"
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
                          location.pathname === subItem.href || (location.pathname === item.href && subItem.id === "members") || (location.pathname === item.href && subItem.id === "groups-main")
                            ? "bg-sidebar-accent/30 text-white" 
                            : "text-sidebar-foreground/90 hover:bg-sidebar-accent/10 hover:text-sidebar-foreground"
                        )}
                        onClick={() => {
                          setActiveItem(item.id);
                          handleMenuItemClick(); // Close sidebar on mobile when submenu item is clicked
                        }}
                      >
                        <span className="mr-3">{subItem.icon}</span>
                        <span className="flex-1">{subItem.label}</span>
                        {subItem.badge && (
                          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white text-xs font-medium">
                            {subItem.badge}
                          </span>
                        )}
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
                onClick={() => {
                  setActiveItem(item.id);
                  handleMenuItemClick(); // Close sidebar on mobile when menu item is clicked
                }}
              >
                <span className={cn("mr-3", !isOpen && "mr-0")}>{item.icon}</span>
                {isOpen && <span>{item.label}</span>}
              </Link>
            )
          ))}
        </nav>
      </div>
      
      {isOpen && (
        <div className="absolute bottom-16 left-0 right-0 px-4">
          <div className="flex items-center space-x-3 py-3 border-t border-sidebar-border">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10 border border-church-border">
                    <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                    <AvatarFallback className="bg-church-accent text-white">PJ</AvatarFallback>
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
                <DropdownMenuItem className="text-church-secondary hover:text-church-primary hover:bg-church-muted">Switch Church</DropdownMenuItem>
                <DropdownMenuSeparator className="bg-church-border" />
                <DropdownMenuItem className="text-church-secondary hover:text-church-primary hover:bg-church-muted">Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      )}
      
      {!isMobileView && (
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
      )}
    </aside>
  );
}
