
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { 
  Download, 
  FileText, 
  Filter, 
  ArrowUpRight, 
  ArrowDownRight,
  Calendar,
  Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FinancialOverviewChart } from "@/components/finance/FinancialOverviewChart";
import { ExpenseByCategoryChart } from "@/components/finance/ExpenseByCategoryChart";
import { TransactionTable } from "@/components/finance/TransactionTable";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

export default function Accounting() {
  const [activeTab, setActiveTab] = useState("overview");
  const [timeRange, setTimeRange] = useState("this-month");
  
  const handleExport = (format: string) => {
    toast.success(`Financial report exported as ${format.toUpperCase()}`, {
      description: "Your file is ready to download",
    });
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Accounting</h1>
          <p className="text-muted-foreground">
            Financial overview of church income and expenses
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="this-month">This Month</SelectItem>
              <SelectItem value="last-month">Last Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" onClick={() => handleExport("pdf")}>
            <FileText className="h-4 w-4 mr-2" />
            PDF
          </Button>
          <Button variant="outline" size="sm" onClick={() => handleExport("excel")}>
            <Download className="h-4 w-4 mr-2" />
            Excel
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Income</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$42,580.00</div>
            <div className="flex items-center text-xs text-green-600 mt-1">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              <span>+8.2% from last month</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$35,210.00</div>
            <div className="flex items-center text-xs text-red-600 mt-1">
              <ArrowDownRight className="h-3 w-3 mr-1" />
              <span>+12.5% from last month</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Net Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$7,370.00</div>
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              <Clock className="h-3 w-3 mr-1" />
              <span>Updated 2 hours ago</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Budget Variance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+$1,230.00</div>
            <div className="flex items-center text-xs text-green-600 mt-1">
              <span>3.7% above budget</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" onValueChange={setActiveTab} className="w-full">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="budget">Budget Comparison</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <Card className="col-span-2 md:col-span-1">
              <CardHeader>
                <CardTitle>Cash Flow</CardTitle>
                <CardDescription>Monthly income vs expenses</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <FinancialOverviewChart />
              </CardContent>
            </Card>
            <Card className="col-span-2 md:col-span-1">
              <CardHeader>
                <CardTitle>Expenses by Category</CardTitle>
                <CardDescription>Breakdown of spending areas</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ExpenseByCategoryChart />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="transactions" className="mt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Transaction Log</CardTitle>
                <CardDescription>Recent financial activity</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </CardHeader>
            <CardContent>
              <TransactionTable />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="budget" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Budget vs Actual</CardTitle>
              <CardDescription>Comparison of planned vs actual expenditure</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center text-muted-foreground py-8">
                <p>Budget comparison feature coming soon.</p>
                <p className="text-sm mt-2">This feature will allow you to track actual spending against budgeted amounts.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="categories" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Financial Categories</CardTitle>
              <CardDescription>Balance breakdown by ministry area</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 border rounded-md">
                  <div className="flex items-center gap-3">
                    <Badge className="bg-blue-500">Worship</Badge>
                    <span className="text-sm font-medium">Worship Ministry</span>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">$8,430.00</div>
                    <div className="text-xs text-muted-foreground">24% of total</div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center p-3 border rounded-md">
                  <div className="flex items-center gap-3">
                    <Badge className="bg-green-500">Missions</Badge>
                    <span className="text-sm font-medium">Missions and Outreach</span>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">$12,650.00</div>
                    <div className="text-xs text-muted-foreground">36% of total</div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center p-3 border rounded-md">
                  <div className="flex items-center gap-3">
                    <Badge className="bg-orange-500">Building</Badge>
                    <span className="text-sm font-medium">Facilities and Maintenance</span>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">$9,830.00</div>
                    <div className="text-xs text-muted-foreground">28% of total</div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center p-3 border rounded-md">
                  <div className="flex items-center gap-3">
                    <Badge className="bg-purple-500">Admin</Badge>
                    <span className="text-sm font-medium">Administration</span>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">$4,300.00</div>
                    <div className="text-xs text-muted-foreground">12% of total</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
