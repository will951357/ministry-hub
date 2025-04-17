
import { Plus, Receipt, Filter, Download } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Expenses() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Expenses</h1>
          <p className="text-muted-foreground">
            Track and manage church expenses
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
          <Button asChild>
            <Link to="/finance/expenses/new">
              <Plus className="h-4 w-4 mr-2" />
              New Expense
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Expenses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12,450.00</div>
            <p className="text-xs text-muted-foreground">
              +8.2% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              This Month
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$2,840.00</div>
            <p className="text-xs text-muted-foreground">36 expenses</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Average Expense
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$345.80</div>
            <p className="text-xs text-muted-foreground">Per transaction</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Expenses</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="border rounded-md mt-6">
          <div className="p-4">
            <p className="text-center text-muted-foreground py-8">
              No expenses to display.
              <br />
              <Link to="/finance/expenses/new" className="text-primary hover:underline">
                Add your first expense
              </Link>
            </p>
          </div>
        </TabsContent>
        <TabsContent value="pending" className="border rounded-md mt-6">
          <div className="p-4">
            <p className="text-center text-muted-foreground py-8">
              No pending expenses to review.
            </p>
          </div>
        </TabsContent>
        <TabsContent value="approved" className="border rounded-md mt-6">
          <div className="p-4">
            <p className="text-center text-muted-foreground py-8">
              No approved expenses to display.
            </p>
          </div>
        </TabsContent>
        <TabsContent value="rejected" className="border rounded-md mt-6">
          <div className="p-4">
            <p className="text-center text-muted-foreground py-8">
              No rejected expenses to display.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
