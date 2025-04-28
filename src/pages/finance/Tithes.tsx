import { Card } from "@/components/ui/card";
import { BadgeDollarSign, Download, Filter, Users, TrendingUp, PercentCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { ChartCard } from "@/components/dashboard/ChartCard";
import { TitheTable } from "@/components/finance/TitheTable";
import { titheRecords } from "@/data/tithes";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { DataFilters, type FilterValues } from "@/components/shared/DataFilters";
export default function Tithes() {
  const navigate = useNavigate();
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [filterValues, setFilterValues] = useState<FilterValues>({});

  // Calculate statistics
  const lastMonthTithers = 174; // Previous month's count
  const currentTithers = 186;
  const tithersChange = currentTithers - lastMonthTithers;
  const lastMonthTotal = 17550;
  const currentMonthTotal = 18450;
  const monthlyChange = (currentMonthTotal - lastMonthTotal) / lastMonthTotal * 100;
  const lastYearTotal = 161760;
  const currentYearTotal = 187320;
  const yearlyChange = (currentYearTotal - lastYearTotal) / lastYearTotal * 100;
  const handleExport = () => {
    const csvContent = "data:text/csv;charset=utf-8," + ["Member Name", "Amount", "Date", "Frequency", "Status", "Last Tithe"].join(",") + "\n" + titheRecords.filter(record => selectedStatus === "all" || record.status === selectedStatus).map(record => [record.memberName, record.amount, record.date, record.frequency, record.status, record.lastTithe || ""].join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "tithes.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const filterOptions = [{
    id: "date",
    type: "date" as const,
    label: "Date",
    description: "Filter by tithe date"
  }, {
    id: "payment",
    type: "payment" as const,
    label: "Payment Method",
    description: "Filter by payment method"
  }, {
    id: "amount",
    type: "amount" as const,
    label: "Amount",
    description: "Filter by tithe amount"
  }];
  const paymentMethods = [{
    value: "Credit Card",
    label: "Credit Card"
  }, {
    value: "Cash",
    label: "Cash"
  }, {
    value: "Bank Transfer",
    label: "Bank Transfer"
  }, {
    value: "Check",
    label: "Check"
  }];
  const handleFilterChange = (filters: FilterValues) => {
    setFilterValues(filters);
  };
  const filteredRecords = titheRecords.filter(record => {
    const recordDate = new Date(record.date);

    // Handle date filtering
    if (filterValues.dateCondition === "on" && filterValues.startDate) {
      const filterDate = new Date(filterValues.startDate);
      if (recordDate.getDate() !== filterDate.getDate() || recordDate.getMonth() !== filterDate.getMonth() || recordDate.getFullYear() !== filterDate.getFullYear()) {
        return false;
      }
    } else if (filterValues.dateCondition === "between" && filterValues.startDate && filterValues.endDate) {
      if (recordDate < filterValues.startDate || recordDate > filterValues.endDate) {
        return false;
      }
    }

    // Handle amount filtering
    if (filterValues.amountCondition) {
      if (filterValues.amountCondition === "lt" && record.amount >= (filterValues.amountValue || 0)) {
        return false;
      }
      if (filterValues.amountCondition === "gt" && record.amount <= (filterValues.amountValue || 0)) {
        return false;
      }
      if (filterValues.amountCondition === "between") {
        if (record.amount < (filterValues.amountValue || 0) || record.amount > (filterValues.amountMax || Infinity)) {
          return false;
        }
      }
    }
    return selectedStatus === "all" || record.status === selectedStatus;
  });
  return <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tithes</h1>
          <p className="text-muted-foreground">
            Track and monitor tithe contributions
          </p>
        </div>
        <div className="flex items-center gap-2">
          
          <div className='flex gap-4 items-center'>
            <Button variant="outline" size="sm" onClick={handleExport}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
          
          <Button size="sm" onClick={() => navigate("/finance/tithes/new")}>
            <BadgeDollarSign className="h-4 w-4 mr-2" />
            Record Tithe
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard title="Total Tithing Members" value={currentTithers.toString()} description={`${tithersChange >= 0 ? "+" : ""}${tithersChange} from last month`} icon={<Users className="h-4 w-4" />} />
        <StatsCard title="Monthly Tithe Total" value={`$${currentMonthTotal.toLocaleString()}`} description={`${monthlyChange >= 0 ? "+" : ""}${monthlyChange.toFixed(1)}% from last month`} icon={<BadgeDollarSign className="h-4 w-4" />} />
        <StatsCard title="Yearly Tithe Total" value={`$${currentYearTotal.toLocaleString()}`} description={`${yearlyChange >= 0 ? "+" : ""}${yearlyChange.toFixed(1)}% from last year`} icon={<TrendingUp className="h-4 w-4" />} />
        <StatsCard title="Consistency Rate" value="78%" footer={<Progress value={78} className="h-2 mt-2" />} icon={<PercentCircle className="h-4 w-4" />} />
      </div>

      <ChartCard title="Tithe Tracking">
        <Tabs defaultValue="all" onValueChange={setSelectedStatus}>
          <div className="flex flex-col">
            <div className="flex justify-between">
              <TabsList className="mb-4">
                <TabsTrigger value="all">All Members</TabsTrigger>
                <TabsTrigger value="consistent">Consistent</TabsTrigger>
                <TabsTrigger value="irregular">Irregular</TabsTrigger>
                <TabsTrigger value="new">New Tithers</TabsTrigger>
              </TabsList>
            </div>

            <DataFilters onFilterChange={handleFilterChange} filterOptions={filterOptions} paymentMethods={paymentMethods} />
          </div>

          <TabsContent value="all" className="border rounded-md">
            <div className="p-4">
              <TitheTable records={filteredRecords} />
            </div>
          </TabsContent>
          <TabsContent value="consistent" className="border rounded-md">
            <div className="p-4">
              <TitheTable records={titheRecords.filter(r => r.status === "consistent")} />
            </div>
          </TabsContent>
          <TabsContent value="irregular" className="border rounded-md">
            <div className="p-4">
              <TitheTable records={titheRecords.filter(r => r.status === "irregular")} />
            </div>
          </TabsContent>
          <TabsContent value="new" className="border rounded-md">
            <div className="p-4">
              <TitheTable records={titheRecords.filter(r => r.status === "new")} />
            </div>
          </TabsContent>
        </Tabs>
      </ChartCard>
    </div>;
}