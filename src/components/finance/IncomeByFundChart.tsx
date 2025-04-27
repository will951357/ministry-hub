
import { ChartContainer } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "General Fund", income: 18500 },
  { name: "Building Fund", income: 12300 },
  { name: "Missions Fund", income: 8400 },
  { name: "Youth Ministry", income: 4200 },
  { name: "Outreach", income: 3500 },
];

const chartConfig = {
  income: {
    label: "Income",
    theme: {
      light: "#16a34a",
      dark: "#4ade80",
    },
  },
};

export function IncomeByFundChart() {
  return (
    <ChartContainer config={chartConfig}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 10, right: 30, left: 40, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis 
            dataKey="name" 
            tick={{ fontSize: 12 }}
            angle={-45}
            textAnchor="end"
          />
          <YAxis
            tickFormatter={(value) => `$${value / 1000}k`}
            tick={{ fontSize: 12 }}
          />
          <Tooltip
            formatter={(value) => [`$${value.toLocaleString()}`, "Income"]}
          />
          <Legend />
          <Bar 
            dataKey="income" 
            fill="var(--color-income)"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
