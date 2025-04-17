
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Worship", budget: 9000, actual: 8430 },
  { name: "Missions", budget: 10000, actual: 12650 },
  { name: "Building", budget: 12000, actual: 9830 },
  { name: "Admin", budget: 5000, actual: 4300 },
  { name: "Youth", budget: 3000, actual: 2800 },
  { name: "Kids", budget: 2500, actual: 2200 },
];

const chartConfig = {
  budget: {
    label: "Budget",
    theme: {
      light: "#6366f1",
      dark: "#818cf8",
    },
  },
  actual: {
    label: "Actual",
    theme: {
      light: "#f59e0b",
      dark: "#fbbf24",
    },
  },
};

export function BudgetVsActualChart() {
  return (
    <ChartContainer config={chartConfig} className="h-full w-full">
      <BarChart
        data={data}
        layout="vertical"
        margin={{ top: 10, right: 30, left: 100, bottom: 10 }}
      >
        <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
        <XAxis type="number" tick={{ fontSize: 12 }} />
        <YAxis 
          dataKey="name" 
          type="category" 
          tick={{ fontSize: 12 }}
          width={80}
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
        <Bar dataKey="budget" fill="var(--color-budget)" radius={[0, 4, 4, 0]} barSize={20} />
        <Bar dataKey="actual" fill="var(--color-actual)" radius={[0, 4, 4, 0]} barSize={20} />
      </BarChart>
    </ChartContainer>
  );
}
