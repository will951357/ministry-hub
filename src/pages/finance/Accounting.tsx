import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Download, Filter, ArrowUpRight, ArrowDownRight, Calendar, Clock, Plus, Receipt } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FinancialOverviewChart } from "@/components/finance/FinancialOverviewChart";
import { ExpenseByCategoryChart } from "@/components/finance/ExpenseByCategoryChart";
import { TransactionTable } from "@/components/finance/TransactionTable";
import { IncomeByFundChart } from "@/components/finance/IncomeByFundChart";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { BudgetVsActualChart } from "@/components/finance/BudgetVsActualChart";
import { BudgetUsageByCategory } from "@/components/finance/BudgetUsageByCategory";
import { FundBalanceChart } from "@/components/finance/FundBalanceChart";
import { BudgetTable } from "@/components/finance/BudgetTable";
import { DataFilters, type FilterValues } from "@/components/shared/DataFilters";
export default function Accounting() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [timeRange, setTimeRange] = useState("this-month");
  const [selectedMonth, setSelectedMonth] = useState("april-2025");
  const [filterValues, setFilterValues] = useState<FilterValues>({});
  const handleExport = (format: string) => {
    toast.success(`Financial report exported as ${format.toUpperCase()}`, {
      description: "Your file is ready to download"
    });
  };
  const filterOptions = [{
    id: "date",
    type: "date" as const,
    label: "Date",
    description: "Filter by transaction date"
  }, {
    id: "category",
    type: "payment" as const,
    label: "Category",
    description: "Filter by transaction category"
  }, {
    id: "amount",
    type: "amount" as const,
    label: "Amount",
    description: "Filter by transaction amount"
  }];
  const categoryOptions = [{
    value: "Worship",
    label: "Worship"
  }, {
    value: "Missions",
    label: "Missions"
  }, {
    value: "Building",
    label: "Building"
  }, {
    value: "Admin",
    label: "Admin"
  }, {
    value: "Tithes",
    label: "Tithes"
  }, {
    value: "Education",
    label: "Education"
  }, {
    value: "Youth",
    label: "Youth"
  }];
  const handleFilterChange = (filters: FilterValues) => {
    setFilterValues(filters);
  };
  return <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Accounting</h1>
          <p className="text-muted-foreground">
            Financial overview of church income and expenses
          </p>
        </div>
        <div className="flex items-center gap-2">
          
          <div className='flex gap-4 items-center'>
            <Button variant="outline" size="sm" onClick={handleExport}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
          
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="p-3">
          <CardHeader className="pb-1">
            <CardTitle className="text-xs font-medium text-muted-foreground">Total Income</CardTitle>
          </CardHeader>
          <CardContent className="p-1">
            <div className="text-xl font-bold">$42,580.00</div>
            <div className="flex items-center text-xs text-green-600 mt-1">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              <span>+8.2% from last month</span>
            </div>
          </CardContent>
        </Card>
      
        <Card className="p-3">
          <CardHeader className="pb-1">
            <CardTitle className="text-xs font-medium text-muted-foreground">Total Expenses</CardTitle>
          </CardHeader>
          <CardContent className="p-1">
            <div className="text-xl font-bold">$35,210.00</div>
            <div className="flex items-center text-xs text-red-600 mt-1">
              <ArrowDownRight className="h-3 w-3 mr-1" />
              <span>+12.5% from last month</span>
            </div>
          </CardContent>
        </Card>
      
        <Card className="p-3">
          <CardHeader className="pb-1">
            <CardTitle className="text-xs font-medium text-muted-foreground">Net Balance</CardTitle>
          </CardHeader>
          <CardContent className="p-1">
            <div className="text-xl font-bold">$7,370.00</div>
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              <Clock className="h-3 w-3 mr-1" />
              <span>Updated 2 hours ago</span>
            </div>
          </CardContent>
        </Card>
      
        <Card className="p-3">
          <CardHeader className="pb-1">
            <CardTitle className="text-xs font-medium text-muted-foreground">Budget Variance</CardTitle>
          </CardHeader>
          <CardContent className="p-1">
            <div className="text-xl font-bold">+$1,230.00</div>
            <div className="flex items-center text-xs text-green-600 mt-1">
              <span>3.7% above budget</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="dashboard" onValueChange={setActiveTab} className="w-full">

        <div className="flex justify-between">
          <TabsList>
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="budget">Budget Planning</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="dashboard" className="space-y-6">
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>Annual Financial Overview</CardTitle>
              <CardDescription>Income vs Expenses trends over the past year</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <FinancialOverviewChart />
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Expenses by Category</CardTitle>
                <CardDescription>Breakdown for {selectedMonth}</CardDescription>
              </CardHeader>
              <CardContent className="h-[350px]">
                <ExpenseByCategoryChart />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Income by Fund</CardTitle>
                <CardDescription>Fund distribution for {selectedMonth}</CardDescription>
              </CardHeader>
              <CardContent className="h-[350px]">
                <IncomeByFundChart />
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Budget vs Actual YTD</CardTitle>
              <CardDescription>Year-to-date comparison through {selectedMonth}</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <BudgetVsActualChart />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="transactions" className="mt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Transaction Log</CardTitle>
                <CardDescription>Recent financial activity</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button asChild variant="outline" size="sm">
                  <Link to="/finance/expenses/new">
                    <Receipt className="h-4 w-4 mr-2" />
                    Add Expense
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <DataFilters onFilterChange={handleFilterChange} filterOptions={filterOptions} paymentMethods={categoryOptions} />
              <TransactionTable />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="budget" className="space-y-4 mt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Budget Planning</CardTitle>
                <CardDescription>Define and track budget by category</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                  
                  <SelectContent>
                    <SelectItem value="january-2025">January 2025</SelectItem>
                    <SelectItem value="february-2025">February 2025</SelectItem>
                    <SelectItem value="march-2025">March 2025</SelectItem>
                    <SelectItem value="april-2025">April 2025</SelectItem>
                    <SelectItem value="may-2025">May 2025</SelectItem>
                    <SelectItem value="june-2025">June 2025</SelectItem>
                  </SelectContent>
                </Select>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Category
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <BudgetTable selectedMonth={selectedMonth} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>;
}