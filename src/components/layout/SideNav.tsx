import { useLocation } from 'react-router-dom';
import { 
  Sidebar, 
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenuSub,
  SidebarMenuSubButton
} from '@/components/ui/sidebar';
import { Link } from 'react-router-dom';
import { 
  Home, 
  Users, 
  Calendar,
  FileText,
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
  Baby,
  Book,
  GraduationCap,
  Calculator,
  LayoutGrid,
  ChevronRight
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

export function SideNav() {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <Sidebar>
      <SidebarHeader className="h-16 flex items-center px-4">
        <div className="flex items-center space-x-2">
          <PanelLeft className="h-6 w-6 text-church-accent" />
          <span className="font-semibold text-xl text-white">ChurchHub</span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Dashboard">
                  <Link to="/" className={isActive('/') ? 'bg-sidebar-accent' : ''}>
                    <Home size={20} />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="People">
                  <Link to="/people" className={location.pathname.startsWith('/people') ? 'bg-sidebar-accent' : ''}>
                    <Users size={20} />
                    <span>People</span>
                  </Link>
                </SidebarMenuButton>
                <SidebarMenuSub>
                  <SidebarMenuItem>
                    <SidebarMenuSubButton asChild>
                      <Link to="/people/members">
                        <UserCheck size={18} />
                        <span>Members</span>
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuSubButton asChild>
                      <Link to="/people/visitors">
                        <UserPlus size={18} />
                        <span>Visitors</span>
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuSubButton asChild>
                      <Link to="/people/journeys">
                        <Map size={18} />
                        <span>Journeys</span>
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuSubButton asChild>
                      <Link to="/people/appointments">
                        <CalendarClock size={18} />
                        <span>Appointments</span>
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuSubButton asChild>
                      <Link to="/people/birthdays">
                        <Cake size={18} />
                        <span>Birthdays</span>
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuSubButton asChild>
                      <Link to="/people/kids">
                        <Baby size={18} />
                        <span>Kids</span>
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuItem>
                </SidebarMenuSub>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Calendar">
                  <Link to="/calendar" className={isActive('/calendar') ? 'bg-sidebar-accent' : ''}>
                    <Calendar size={20} />
                    <span>Calendar</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Finance">
                  <Link to="/finance" className={location.pathname.startsWith('/finance') ? 'bg-sidebar-accent' : ''}>
                    <BadgeDollarSign size={20} />
                    <span>Finance</span>
                  </Link>
                </SidebarMenuButton>
                <SidebarMenuSub>
                  <SidebarMenuItem>
                    <SidebarMenuSubButton asChild>
                      <Link to="/finance/donations">
                        <BadgeDollarSign size={18} />
                        <span>Donations</span>
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuSubButton asChild>
                      <Link to="/finance/tithes">
                        <Receipt size={18} />
                        <span>Tithes</span>
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuSubButton asChild>
                      <Link to="/finance/funds">
                        <PiggyBank size={18} />
                        <span>Funds</span>
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuSubButton asChild>
                      <Link to="/finance/accounting">
                        <Calculator size={18} />
                        <span>Accounting</span>
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuItem>
                </SidebarMenuSub>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="App Member">
                  <Link to="/app-member" className={location.pathname.startsWith('/app-member') ? 'bg-sidebar-accent' : ''}>
                    <Calculator size={20} />
                    <span>App Member</span>
                  </Link>
                </SidebarMenuButton>
                <SidebarMenuSub>
                  <SidebarMenuItem>
                    <SidebarMenuSubButton asChild>
                      <Link to="/app-member/blog">
                        <FileText size={18} />
                        <span>Blog</span>
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuSubButton asChild>
                      <Link to="/app-member/app-manager">
                        <LayoutGrid size={18} />
                        <span>App Manager</span>
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuItem>
                </SidebarMenuSub>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Ministries">
                  <Link to="/ministries" className={isActive('/ministries') ? 'bg-sidebar-accent' : ''}>
                    <CopyCheck size={20} />
                    <span>Ministries</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Groups">
                  <Link to="/groups" className={location.pathname.startsWith('/groups') ? 'bg-sidebar-accent' : ''}>
                    <Users size={20} />
                    <span>Groups</span>
                  </Link>
                </SidebarMenuButton>
                <SidebarMenuSub>
                  <SidebarMenuItem>
                    <SidebarMenuSubButton asChild>
                      <Link to="/groups">
                        <Users size={18} />
                        <span>Church Groups</span>
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuSubButton asChild>
                      <Link to="/groups/learning">
                        <GraduationCap size={18} />
                        <span>Learning</span>
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuItem>
                </SidebarMenuSub>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Events">
                  <Link to="/events" className={isActive('/events') ? 'bg-sidebar-accent' : ''}>
                    <Calendar size={20} />
                    <span>Events</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center space-x-3 w-full">
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
          <DropdownMenuContent align="start" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Switch Church</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
