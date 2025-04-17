import { useState } from "react";
import { 
  Card,
  CardFooter
} from "@/components/ui/card";
import { 
  PiggyBank, 
  Plus, 
  ArrowUpRight, 
  ArrowDownRight,
  BarChart3,
  FileStack,
  Users,
  PercentCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { ChartCard } from "@/components/dashboard/ChartCard";

export default function Funds() {
  const funds = [
    {
      id: 1,
      name: "Building Fund",
      current: 245600,
      goal: 500000,
      progress: 49,
      status: "active"
    },
    {
      id: 2,
      name: "Mission Trip",
      current: 12300,
      goal: 25000,
      progress: 49,
      status: "active"
    },
    {
      id: 3,
      name: "Youth Ministry",
      current: 8750,
      goal: 10000,
      progress: 87.5,
      status: "active"
    },
    {
      id: 4,
      name: "Christmas Outreach",
      current: 5000,
      goal: 15000,
      progress: 33.3,
      status: "upcoming"
    }
  ];

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Funds</h1>
          <p className="text-muted-foreground">
            Manage special funds and campaigns
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create New Fund
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <StatsCard
          title="Active Funds"
          value="4"
          description="Across all ministries"
          icon={<FileStack className="h-4 w-4" />}
        />
        <StatsCard
          title="Total Funds Raised"
          value="$271,650.00"
          description="Across all active funds"
          icon={<PiggyBank className="h-4 w-4" />}
        />
        <StatsCard
          title="Funding Progress"
          value="49.4%"
          footer={<Progress value={49.4} className="h-2 mt-2" />}
          icon={<PercentCircle className="h-4 w-4" />}
        />
      </div>

      <h2 className="text-xl font-semibold mt-8">Active Funds</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {funds.map((fund) => (
          <ChartCard 
            key={fund.id} 
            title={fund.name}
            description={`$${fund.current.toLocaleString()} of $${fund.goal.toLocaleString()}`}
            icon={<PiggyBank className="h-4 w-4" />}
          >
            <div>
              <Progress value={fund.progress} className="h-2 mb-2" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{fund.progress}% Complete</span>
                <span>${(fund.goal - fund.current).toLocaleString()} Remaining</span>
              </div>

              <div className="flex justify-between mt-4">
                <div className="flex items-center text-green-600">
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                  <span className="text-sm">+$2,450 this month</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">42 contributors</span>
                </div>
              </div>
              
              <div className="flex justify-between mt-4 pt-2 border-t">
                <Button variant="outline" size="sm">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  View Details
                </Button>
                <Button size="sm">
                  Contribute
                </Button>
              </div>
            </div>
          </ChartCard>
        ))}
      </div>
    </div>
  );
}
