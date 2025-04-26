
import { StatsCard } from "@/components/dashboard/StatsCard";
import { UserPlus, UserCheck, Users, Calendar } from "lucide-react";

type VisitorStatsProps = {
  visitorsLast30Days: number;
  previousPeriodVisitors: number;
  totalConversions: number;
  visitorsInEvents: number;
};

export function VisitorStats({
  visitorsLast30Days,
  previousPeriodVisitors,
  totalConversions,
  visitorsInEvents
}: VisitorStatsProps) {
  const variationPercentage = ((visitorsLast30Days - previousPeriodVisitors) / previousPeriodVisitors) * 100;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Visitors"
        description="Last 30 days"
        value={visitorsLast30Days.toString()}
        icon={<UserPlus size={20} />}
        trend={{
          value: parseFloat(variationPercentage.toFixed(1)),
          isPositive: variationPercentage > 0
        }}
        className="bg-white rounded-lg border border-church-border shadow-sm"
      />
      <StatsCard
        title="Follow-up Pending"
        value="12"
        icon={<UserCheck size={20} />}
        className="bg-white rounded-lg border border-church-border shadow-sm cursor-pointer"
        onClick={() => window.location.href = "/people/members"}
        footer={
          <div className="text-sm text-blue-600 flex items-center">
            <span>See requests</span>
          </div>
        }
      />
      <StatsCard
        title="Visitor Conversions"
        value={totalConversions.toString()}
        icon={<Users size={20} />}
        description="Last 30 days"
        className="bg-white rounded-lg border border-church-border shadow-sm cursor-pointer"
        onClick={() => window.location.href = "/people/members"}
        footer={
          <div className="text-sm text-blue-600 flex items-center">
            <span>See all new members</span>
          </div>
        }
      />
      <StatsCard
        title="Event Registrations"
        value={visitorsInEvents.toString()}
        icon={<Calendar size={20} />}
        description="Visitors registered for events"
        className="bg-white rounded-lg border border-church-border shadow-sm cursor-pointer"
        onClick={() => window.location.href = "/events"}
        footer={
          <div className="text-sm text-blue-600 flex items-center">
            <span>See all registrations</span>
          </div>
        }
      />
    </div>
  );
}
