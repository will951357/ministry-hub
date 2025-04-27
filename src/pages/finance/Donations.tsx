import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { DollarSign, Download, Filter, ArrowUpRight, PiggyBank, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { ChartCard } from "@/components/dashboard/ChartCard";

export default function Donations() {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Donations</h1>
          <p className="text-muted-foreground">
            Manage and track all donations to the church
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button>
            <DollarSign className="h-4 w-4 mr-2" />
            Add Donation
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <StatsCard
          title="Total Donations"
          value="$24,560.00"
          description="+12.5% from last month"
          icon={<DollarSign className="h-4 w-4" />}
        />
        <StatsCard
          title="Donations This Month"
          value="$3,240.00"
          description="42 donations"
          icon={<CreditCard className="h-4 w-4" />}
        />
        <StatsCard
          title="Average Donation"
          value="$78.50"
          description="Per donation"
          icon={<PiggyBank className="h-4 w-4" />}
        />
      </div>

      <ChartCard title="Donations Track">
        
        <Tabs defaultValue="all" onValueChange={setActiveTab} className="w-full">
        
        <div className='flex flex-row justify-between items-center'>
          <div>
            <TabsList>
              <TabsTrigger value="all">All Donations</TabsTrigger>
              <TabsTrigger value="recent">Recent</TabsTrigger>
              <TabsTrigger value="recurring">Recurring</TabsTrigger>
              <TabsTrigger value="special">Special Projects</TabsTrigger>
            </TabsList>
          </div>

          <div className='flex gap-4'>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
        
        <TabsContent value="all" className="border rounded-md mt-6">
          <div className="p-4">
            <p className="text-center text-muted-foreground py-8">
              No donations to display. Add a donation to get started.
            </p>
          </div>
        </TabsContent>
        <TabsContent value="recent" className="border rounded-md mt-6">
          <div className="p-4">
            <p className="text-center text-muted-foreground py-8">
              No recent donations to display.
            </p>
          </div>
        </TabsContent>
        <TabsContent value="recurring" className="border rounded-md mt-6">
          <div className="p-4">
            <p className="text-center text-muted-foreground py-8">
              No recurring donations to display.
            </p>
          </div>
        </TabsContent>
        <TabsContent value="special" className="border rounded-md mt-6">
          <div className="p-4">
            <p className="text-center text-muted-foreground py-8">
              No special project donations to display.
            </p>
          </div>
        </TabsContent>
      </Tabs>
      
      </ChartCard>
      
    </div>
  );
}
