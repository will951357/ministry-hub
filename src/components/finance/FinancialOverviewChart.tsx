
import { ChartContainer } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
  { month: "Apr", income: 42580, expenses: 35210 },
  { month: "May", income: 38900, expenses: 32100 },
  { month: "Jun", income: 34200, expenses: 28600 },
  { month: "Jul", income: 30500, expenses: 25700 },
  { month: "Aug", income: 28200, expenses: 23400 },
  { month: "Sep", income: 27500, expenses: 24100 },
  { month: "Oct", income: 26800, expenses: 22900 },
  { month: "Nov", income: 25400, expenses: 21300 },
  { month: "Dec", income: 21900, expenses: 20100 },
  { month: "Jan", income: 23700, expenses: 19300 },
  { month: "Feb", income: 19800, expenses: 17600 },
  { month: "Mar", income: 22450, expenses: 18200 },
];

const chartConfig = {
  income: {
    label: "Income",
    theme: {
      light: "#16a34a",
      dark: "#4ade80",
    },
  },
  expenses: {
    label: "Expenses",
    theme: {
      light: "#dc2626",
      dark: "#ef4444",
    },
  },
};

export function FinancialOverviewChart() {
  return (
    <ChartContainer config={chartConfig}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, left: 40, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="month" tick={{ fontSize: 12 }} />
          <YAxis 
            tickFormatter={(value) => `$${value / 1000}k`}
            tick={{ fontSize: 12 }}
          />
          <Tooltip
            formatter={(value) => [`$${value.toLocaleString()}`]}
          />
          <Legend />
          <Line 
            type="monotone"
            dataKey="income"
            stroke="var(--color-income)"
            strokeWidth={2}
            dot={{ fill: "var(--color-income)" }}
          />
          <Line 
            type="monotone"
            dataKey="expenses"
            stroke="var(--color-expenses)"
            strokeWidth={2}
            dot={{ fill: "var(--color-expenses)" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
