
import { MainLayout } from '@/components/layout/MainLayout';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { ChartCard } from '@/components/dashboard/ChartCard';
import { AttendanceChart } from '@/components/dashboard/AttendanceChart';
import { EventList } from '@/components/dashboard/EventList';
import { RecentMembers } from '@/components/dashboard/RecentMembers';
import { Users, Calendar, DollarSign, UserPlus } from 'lucide-react';

export default function Dashboard() {
  return (
    <MainLayout>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-church-primary">Dashboard</h1>
          <div className="text-sm text-church-secondary">
            <span className="font-medium">Today is:</span> Sunday, October 15, 2023
          </div>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard 
            title="Total Members" 
            value="1,284" 
            icon={<Users className="h-4 w-4" />}
            trend={{ value: 12, isPositive: true }}
          />
          <StatsCard 
            title="Weekly Attendance" 
            value="652" 
            icon={<UserPlus className="h-4 w-4" />}
            trend={{ value: 8, isPositive: true }}
          />
          <StatsCard 
            title="Upcoming Events" 
            value="8" 
            icon={<Calendar className="h-4 w-4" />}
          />
          <StatsCard 
            title="Monthly Donations" 
            value="$24,350" 
            icon={<DollarSign className="h-4 w-4" />}
            trend={{ value: 5, isPositive: true }}
          />
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <div className="md:col-span-2 lg:col-span-4">
            <ChartCard 
              title="Attendance" 
              description="Yearly attendance overview"
            >
              <AttendanceChart />
            </ChartCard>
          </div>
          <div className="md:col-span-2 lg:col-span-3">
            <EventList />
          </div>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2">
          <RecentMembers />
          <ChartCard title="Engagement & Growth">
            <div className="flex h-[300px] items-center justify-center text-church-secondary">
              Engagement metrics chart coming soon...
            </div>
          </ChartCard>
        </div>
      </div>
    </MainLayout>
  );
}
