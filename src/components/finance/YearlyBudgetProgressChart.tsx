
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
  { name: "Jan", budget: 12500, actual: 10800 },
  { name: "Feb", budget: 25000, actual: 21900 },
  { name: "Mar", budget: 37500, actual: 33200 },
  { name: "Apr", budget: 50000, actual: 48500 },
  { name: "May", budget: 62500, actual: 0 },
  { name: "Jun", budget: 75000, actual: 0 },
  { name: "Jul", budget: 87500, actual: 0 },
  { name: "Aug", budget: 100000, actual: 0 },
  { name: "Sep", budget: 112500, actual: 0 },
  { name: "Oct", budget: 125000, actual: 0 },
  { name: "Nov", budget: 137500, actual: 0 },
  { name: "Dec", budget: 150000, actual: 0 },
];

const chartConfig = {
  budget: {
    label: "Annual Budget",
    theme: {
      light: "#6366f1",
      dark: "#818cf8",
    },
  },
  actual: {
    label: "Accumulated Expenses",
    theme: {
      light: "#f59e0b",
      dark: "#fbbf24",
    },
  },
};

export function YearlyBudgetProgressChart() {
  return (
    <ChartContainer config={chartConfig} className="h-full w-full">
      <AreaChart
        data={data}
        margin={{ top: 10, right: 30, left: 30, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="name" tick={{ fontSize: 12 }} />
        <YAxis
          tickFormatter={(value) => `$${value / 1000}k`}
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
                      : String(name)
                  ]}
                />
              );
            }
            return null;
          }}
        />
        <Legend />
        <Area
          type="monotone"
          dataKey="budget"
          stroke="var(--color-budget)"
          fill="var(--color-budget)"
          fillOpacity={0.2}
        />
        <Area
          type="monotone"
          dataKey="actual"
          stroke="var(--color-actual)"
          fill="var(--color-actual)"
          fillOpacity={0.5}
        />
      </AreaChart>
    </ChartContainer>
  );
}
