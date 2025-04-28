
import { useMemo } from "react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  TooltipProps 
} from "recharts";
import { format, parseISO, subDays, eachDayOfInterval } from "date-fns";
import { FundDonation } from "@/data/fundDonations";

interface FundDonationsChartProps {
  donations: FundDonation[];
}

export function FundDonationsChart({ donations }: FundDonationsChartProps) {
  // Process donations data for chart display
  const chartData = useMemo(() => {
    // Get earliest and latest dates
    if (donations.length === 0) {
      // Generate some dummy data for empty state
      const today = new Date();
      const dates = eachDayOfInterval({
        start: subDays(today, 30),
        end: today
      });
      
      return dates.map(date => ({
        date: format(date, "yyyy-MM-dd"),
        amount: 0,
        formattedDate: format(date, "MMM d")
      }));
    }
    
    // Sort donations by date
    const sortedDonations = [...donations].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    
    // Get date range
    const earliestDate = parseISO(sortedDonations[0].date);
    const latestDate = parseISO(sortedDonations[sortedDonations.length - 1].date);
    
    // Generate all dates in range
    const dates = eachDayOfInterval({
      start: earliestDate,
      end: latestDate
    });
    
    // Create a map of date to donation amount
    const donationsByDate = new Map();
    
    // Initialize all dates with zero
    dates.forEach(date => {
      const dateStr = format(date, "yyyy-MM-dd");
      donationsByDate.set(dateStr, 0);
    });
    
    // Fill in actual donation amounts
    donations.forEach(donation => {
      const dateStr = donation.date;
      const currentAmount = donationsByDate.get(dateStr) || 0;
      donationsByDate.set(dateStr, currentAmount + donation.amount);
    });
    
    // Convert to array format for chart
    return Array.from(donationsByDate.entries()).map(([date, amount]) => ({
      date,
      amount,
      formattedDate: format(parseISO(date), "MMM d")
    }));
  }, [donations]);
  
  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background p-3 border rounded-md shadow-md">
          <p className="font-medium">{format(parseISO(label), "MMM d, yyyy")}</p>
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-primary">${Number(payload[0].value).toLocaleString()}</span> in donations
          </p>
        </div>
      );
    }
    
    return null;
  };
  
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={chartData}
        margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
      >
        <defs>
          <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis 
          dataKey="formattedDate" 
          tickMargin={10}
          tick={{ fontSize: 12 }}
          tickFormatter={(value) => value}
        />
        <YAxis 
          tickFormatter={(value) => `$${value}`}
          tick={{ fontSize: 12 }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Area 
          type="monotone" 
          dataKey="amount" 
          stroke="#8884d8" 
          fillOpacity={1} 
          fill="url(#colorAmount)" 
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
