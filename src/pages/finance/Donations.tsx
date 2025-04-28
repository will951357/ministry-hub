import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { DollarSign, Download, Filter, PiggyBank, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { ChartCard } from "@/components/dashboard/ChartCard";
import { DonationTable } from "@/components/finance/DonationTable";
import { mockDonations } from "@/data/donations";
import { DonationFilters } from "@/components/finance/DonationFilters";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { format } from "date-fns";
import type { FilterValues } from "@/components/finance/DonationFilters";

export default function Donations() {
  const [activeTab, setActiveTab] = useState("all");
  const [filterValues, setFilterValues] = useState<FilterValues>({});
  const navigate = useNavigate();

  const filteredDonations = mockDonations.filter(donation => {
    const donationDate = new Date(donation.date);

    // Handle date filtering
    if (filterValues.dateCondition === "on" && filterValues.startDate) {
      const filterDate = new Date(filterValues.startDate);
      if (donationDate.getDate() !== filterDate.getDate() ||
          donationDate.getMonth() !== filterDate.getMonth() ||
          donationDate.getFullYear() !== filterDate.getFullYear()) {
        return false;
      }
    } else if (filterValues.dateCondition === "between" && filterValues.startDate && filterValues.endDate) {
      if (donationDate < filterValues.startDate || donationDate > filterValues.endDate) {
        return false;
      }
    }

    if (filterValues.paymentMethod && donation.paymentMethod !== filterValues.paymentMethod) return false;

    // Handle amount filtering
    if (filterValues.amountCondition) {
      if (filterValues.amountCondition === "lt" && donation.amount >= (filterValues.amountValue || 0)) {
        return false;
      }
      if (filterValues.amountCondition === "gt" && donation.amount <= (filterValues.amountValue || 0)) {
        return false;
      }
      if (filterValues.amountCondition === "between") {
        if (donation.amount < (filterValues.amountValue || 0) || donation.amount > (filterValues.amountMax || Infinity)) {
          return false;
        }
      }
    }
    return true;
  });

  const handleFilterChange = (filters: FilterValues) => {
    setFilterValues(filters);
    // Here you could update URL parameters if needed
    // For example: updateUrlParams(filters);
  };

  const handleExport = () => {
    const headers = ['Date', 'Donor', 'Type', 'Amount', 'Fund', 'Payment Method', 'Observation'];
    const csvContent = [headers.join(','), ...filteredDonations.map(d => [format(new Date(d.date), 'yyyy-MM-dd'), d.donor, d.donorType, d.amount, d.fund, d.paymentMethod, d.observation || ''].map(value => `"${value}"`).join(','))].join('\n');
    const blob = new Blob([csvContent], {
      type: 'text/csv'
    });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `donations_${format(new Date(), 'yyyy-MM-dd')}.csv`;
    a.click();
  };

  return <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Donations</h1>
          <p className="text-muted-foreground">
            Manage and track all donations to the church
          </p>
        </div>
        <div className="flex items-center gap-2">

          <div className='flex gap-4 items-center'>
            <Button variant="outline" size="sm" onClick={handleExport}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
          
          <Button size="sm" onClick={() => navigate("/finance/donations/new")}>
            <DollarSign className="h-4 w-4 mr-2" />
            Add Donation
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <StatsCard title="Total Donations" value="$24,560.00" description="+12.5% from last month" icon={<DollarSign className="h-4 w-4" />} />
        <StatsCard title="Donations This Month" value="$3,240.00" description="42 donations" icon={<CreditCard className="h-4 w-4" />} />
        <StatsCard title="Average Donation" value="$78.50" description="Per donation" icon={<PiggyBank className="h-4 w-4" />} />
      </div>

      <ChartCard title="Donations Track">
        <Tabs defaultValue="all" onValueChange={setActiveTab} className="w-full">
          <div className='flex flex-col space-y-2'>
            <div className='flex justify-between items-center'>
              <TabsList>
                <TabsTrigger value="all">All Donations</TabsTrigger>
                <TabsTrigger value="recent">Recent</TabsTrigger>
                <TabsTrigger value="recurring">Recurring</TabsTrigger>
                <TabsTrigger value="special">Special Projects</TabsTrigger>
              </TabsList>
            </div>
            
            <DonationFilters onFilterChange={handleFilterChange} />
          </div>
          
          <TabsContent value="all" className="border rounded-md mt-6">
            <div className="p-4">
              <DonationTable donations={filteredDonations} />
            </div>
          </TabsContent>
          <TabsContent value="recent" className="border rounded-md mt-6">
            <div className="p-4">
              <DonationTable donations={filteredDonations.slice(0, 3)} />
            </div>
          </TabsContent>
          <TabsContent value="recurring" className="border rounded-md mt-6">
            <div className="p-4">
              <DonationTable donations={filteredDonations.filter(d => d.observation?.includes('Monthly'))} />
            </div>
          </TabsContent>
          <TabsContent value="special" className="border rounded-md mt-6">
            <div className="p-4">
              <DonationTable donations={filteredDonations.filter(d => d.fund === 'Building' || d.fund === 'Community Outreach')} />
            </div>
          </TabsContent>
        </Tabs>
      </ChartCard>
    </div>;
}
