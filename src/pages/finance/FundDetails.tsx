
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { 
  ArrowLeft, 
  Users, 
  Calendar, 
  PiggyBank, 
  ArrowUpRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ChartCard } from "@/components/dashboard/ChartCard";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format, parseISO, subDays } from "date-fns";
import { mockFundDonations } from "@/data/fundDonations";
import { funds } from "@/data/funds";
import { FundDonorTable } from "../finance/components/FundDonorTable";
import { FundDonationsChart } from "../finance/components/FundDonationsChart";

export default function FundDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");
  const fundId = Number(id);
  
  // Find the current fund
  const fund = funds.find(f => f.id === fundId);
  
  // Get donations specific to this fund
  const fundDonations = mockFundDonations.filter(donation => 
    donation.fundId === fundId
  );
  
  // Calculate statistics
  const totalRaised = fundDonations.reduce((sum, donation) => sum + donation.amount, 0);
  const uniqueDonors = new Set(fundDonations.map(d => d.donorId)).size;
  const recentDonations = fundDonations
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);
  
  const latestDonation = fundDonations.length > 0 ? 
    Math.max(...fundDonations.map(d => new Date(d.date).getTime())) : 
    null;
    
  const monthlyDonations = fundDonations
    .filter(d => {
      const donationDate = new Date(d.date);
      const thirtyDaysAgo = subDays(new Date(), 30);
      return donationDate >= thirtyDaysAgo;
    })
    .reduce((sum, donation) => sum + donation.amount, 0);

  // If fund not found, show error
  if (!fund) {
    return (
      <div className="container mx-auto py-6">
        <div className="flex items-center mb-4">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => navigate("/finance/funds")}
            className="mr-2"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Funds
          </Button>
        </div>
        <Card className="p-6">
          <h1 className="text-xl font-bold">Fund Not Found</h1>
          <p className="text-muted-foreground">The fund you're looking for doesn't exist.</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigate('/finance/funds')}
            className="h-8 w-8"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">{fund.name}</h1>
            <p className="text-muted-foreground">
              Fund ID: {fundId} • Created on {format(new Date(), "MMMM d, yyyy")}
            </p>
          </div>
        </div>
        <Badge className={`${fund.status === 'active' ? 'bg-green-500' : fund.status === 'upcoming' ? 'bg-blue-500' : 'bg-gray-500'}`}>
          {fund.status.charAt(0).toUpperCase() + fund.status.slice(1)}
        </Badge>
      </div>
      
      <Card className="p-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <h2 className="text-xl font-semibold">{fund.name}</h2>
            <div className="mt-2">
              <Progress value={fund.progress} className="h-2 mb-1" />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>${totalRaised.toLocaleString()} raised of ${fund.goal.toLocaleString()}</span>
                <span>{fund.progress}% Complete</span>
              </div>
            </div>
            
            {fund.status === 'active' && (
              <div className="mt-6 space-y-4">
                <Button className="w-full">
                  <PiggyBank className="h-4 w-4 mr-2" />
                  Contribute Now
                </Button>
              </div>
            )}
          </div>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-medium">Description</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {fund.description || "This fund supports our community through targeted initiatives and projects."}
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium text-sm">Ministry</h3>
                <p className="text-sm">{fund.ministry || "General"}</p>
              </div>
              <div>
                <h3 className="font-medium text-sm">Duration</h3>
                <p className="text-sm">
                  {format(new Date(), "MMM d, yyyy")} - 
                  {fund.endDate ? format(new Date(fund.endDate), " MMM d, yyyy") : " Ongoing"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>
      
      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-3">
        <StatsCard
          title="Total Raised"
          value={`$${totalRaised.toLocaleString()}`}
          description={`${fund.progress}% of ${fund.goal.toLocaleString()} goal`}
          icon={<PiggyBank className="h-4 w-4" />}
          footer={<Progress value={fund.progress} className="h-2 mt-2" />}
        />
        <StatsCard
          title="Contributors"
          value={uniqueDonors.toString()}
          description="Unique donors"
          icon={<Users className="h-4 w-4" />}
        />
        <StatsCard
          title="Monthly Donations"
          value={`$${monthlyDonations.toLocaleString()}`}
          description="Last 30 days"
          icon={<ArrowUpRight className="h-4 w-4" />}
        />
      </div>
      
      {/* Donations Chart */}
      <ChartCard title="Donations Over Time">
        <div className="h-80">
          <FundDonationsChart donations={fundDonations} />
        </div>
      </ChartCard>
      
      {/* Donations Table */}
      <ChartCard title="Donors">
        <Tabs defaultValue="all" onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Donations</TabsTrigger>
            <TabsTrigger value="recent">Recent</TabsTrigger>
            <TabsTrigger value="largest">Largest</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="border rounded-md">
            <FundDonorTable donations={fundDonations} />
          </TabsContent>
          
          <TabsContent value="recent" className="border rounded-md">
            <FundDonorTable 
              donations={fundDonations.sort((a, b) => 
                new Date(b.date).getTime() - new Date(a.date).getTime()
              ).slice(0, 10)} 
            />
          </TabsContent>
          
          <TabsContent value="largest" className="border rounded-md">
            <FundDonorTable 
              donations={fundDonations.sort((a, b) => b.amount - a.amount).slice(0, 10)} 
            />
          </TabsContent>
        </Tabs>
      </ChartCard>
    </div>
  );
}
