
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { 
  PiggyBank, 
  Plus, 
  ArrowUpRight, 
  ArrowDownRight,
  BarChart3
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

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
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Funds</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">Across all ministries</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Funds Raised</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$271,650.00</div>
            <p className="text-xs text-muted-foreground">Across all active funds</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Funding Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">49.4%</div>
            <Progress value={49.4} className="h-2 mt-2" />
          </CardContent>
        </Card>
      </div>

      <h2 className="text-xl font-semibold mt-8">Active Funds</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {funds.map((fund) => (
          <Card key={fund.id}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle>{fund.name}</CardTitle>
                <Badge variant={fund.status === "active" ? "default" : "outline"}>
                  {fund.status === "active" ? "Active" : "Upcoming"}
                </Badge>
              </div>
              <CardDescription>${fund.current.toLocaleString()} of ${fund.goal.toLocaleString()}</CardDescription>
            </CardHeader>
            <CardContent>
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
                  <PiggyBank className="h-4 w-4 mr-1 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">42 contributors</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between pt-2">
              <Button variant="outline" size="sm">
                <BarChart3 className="h-4 w-4 mr-2" />
                View Details
              </Button>
              <Button size="sm">
                Contribute
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
