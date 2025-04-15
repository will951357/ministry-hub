
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend, Tooltip } from "recharts";

const data = [
  { name: "Jan", income: 22450, expenses: 18200 },
  { name: "Feb", income: 19800, expenses: 17600 },
  { name: "Mar", income: 23700, expenses: 19300 },
  { name: "Apr", income: 21900, expenses: 20100 },
  { name: "May", income: 25400, expenses: 21300 },
  { name: "Jun", income: 26800, expenses: 22900 },
  { name: "Jul", income: 27500, expenses: 24100 },
  { name: "Aug", income: 28200, expenses: 23400 },
  { name: "Sep", income: 30500, expenses: 25700 },
  { name: "Oct", income: 34200, expenses: 28600 },
  { name: "Nov", income: 38900, expenses: 32100 },
  { name: "Dec", income: 42580, expenses: 35210 },
];

const chartConfig = {
  income: {
    label: "Income",
    theme: {
      light: "#4f46e5",
      dark: "#818cf8",
    },
  },
  expenses: {
    label: "Expenses",
    theme: {
      light: "#ef4444",
      dark: "#f87171",
    },
  },
};

export function FinancialOverviewChart() {
  return (
    <ChartContainer config={chartConfig} className="h-full w-full">
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="name" tick={{ fontSize: 12 }} />
        <YAxis 
          tickFormatter={(value) => `$${value.toLocaleString()}`}
          tick={{ fontSize: 12 }}
        />
        <Tooltip 
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <ChartTooltipContent
                  active={active}
                  payload={payload}
                  formatter={(value, name) => [
                    `$${value.toLocaleString()}`,
                    typeof name === 'string' 
                      ? name.charAt(0).toUpperCase() + name.slice(1)
                      : String(name) // Convert number or other types to string safely
                  ]}
                />
              );
            }
            return null;
          }}
        />
        <Legend />
        <Bar dataKey="income" fill="var(--color-income)" radius={[4, 4, 0, 0]} barSize={30} />
        <Bar dataKey="expenses" fill="var(--color-expenses)" radius={[4, 4, 0, 0]} barSize={30} />
      </BarChart>
    </ChartContainer>
  );
}
