import { 
  Card, 
  CardContent
} from "@/components/ui/card";
import { BadgeDollarSign, Download, Filter, Users, TrendingUp, PercentCircle, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { ChartCard } from "@/components/dashboard/ChartCard";
import { TitheTable } from "@/components/finance/TitheTable";
import { titheRecords } from "@/data/tithes";

export default function Tithes() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tithes</h1>
          <p className="text-muted-foreground">
            Track and monitor tithe contributions
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button>
            <BadgeDollarSign className="h-4 w-4 mr-2" />
            Record Tithe
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Tithing Members"
          value="186"
          description={<span className="text-green-500">+12</span> + " from last month"}
          icon={<Users className="h-4 w-4" />}
        />
        <StatsCard
          title="Monthly Tithe Total"
          value="$18,450.00"
          description={<span className="text-green-500">+5.2%</span> + " from last month"}
          icon={<BadgeDollarSign className="h-4 w-4" />}
        />
        <StatsCard
          title="Yearly Tithe Total"
          value="$187,320.00"
          description={<span className="text-green-500">+15.8%</span> + " from last year"}
          icon={<TrendingUp className="h-4 w-4" />}
        />
        <StatsCard
          title="Consistency Rate"
          value="78%"
          footer={<Progress value={78} className="h-2 mt-2" />}
          icon={<PercentCircle className="h-4 w-4" />}
        />
      </div>

      <ChartCard title="Tithe Tracking" description="Monitor tithe contributions and consistency" icon={<UserCheck className="h-5 w-5" />}>
        <Tabs defaultValue="all">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Members</TabsTrigger>
            <TabsTrigger value="consistent">Consistent</TabsTrigger>
            <TabsTrigger value="irregular">Irregular</TabsTrigger>
            <TabsTrigger value="new">New Tithers</TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <div className="rounded-md border">
              <div className="p-4">
                <TitheTable records={titheRecords} />
              </div>
            </div>
          </TabsContent>
          <TabsContent value="consistent">
            <div className="rounded-md border">
              <div className="p-4">
                <TitheTable records={titheRecords} status="consistent" />
              </div>
            </div>
          </TabsContent>
          <TabsContent value="irregular">
            <div className="rounded-md border">
              <div className="p-4">
                <TitheTable records={titheRecords} status="irregular" />
              </div>
            </div>
          </TabsContent>
          <TabsContent value="new">
            <div className="rounded-md border">
              <div className="p-4">
                <TitheTable records={titheRecords} status="new" />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </ChartCard>
    </div>
  );
}
