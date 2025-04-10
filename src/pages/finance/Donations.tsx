
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { DollarSign, Download, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button>
            <DollarSign className="h-4 w-4 mr-2" />
            Add Donation
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Donations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$24,560.00</div>
            <p className="text-xs text-muted-foreground">+12.5% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Donations This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$3,240.00</div>
            <p className="text-xs text-muted-foreground">42 donations</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Average Donation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$78.50</div>
            <p className="text-xs text-muted-foreground">Per donation</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" onValueChange={setActiveTab} className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Donations</TabsTrigger>
          <TabsTrigger value="recent">Recent</TabsTrigger>
          <TabsTrigger value="recurring">Recurring</TabsTrigger>
          <TabsTrigger value="special">Special Projects</TabsTrigger>
        </TabsList>
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
    </div>
  );
}
