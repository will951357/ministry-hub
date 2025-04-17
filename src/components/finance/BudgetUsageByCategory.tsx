
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, Tooltip, Cell, ResponsiveContainer } from "recharts";

const data = [
  { name: "Worship", percent: 94 },
  { name: "Missions", percent: 126 },
  { name: "Building", percent: 82 },
  { name: "Admin", percent: 86 },
  { name: "Youth", percent: 93 },
  { name: "Kids", percent: 88 },
];

const chartConfig = {
  percent: {
    label: "Budget Usage",
    theme: {
      light: "#6366f1",
      dark: "#818cf8",
    },
  },
};

// Function to determine the color based on the budget usage percentage
const getBarColor = (percent: number) => {
  if (percent > 110) return "#ef4444"; // Over budget (red)
  if (percent > 95) return "#f59e0b";  // Near budget (orange)
  if (percent > 75) return "#10b981";  // Good usage (green)
  return "#6b7280";                     // Under usage (gray)
};

export function BudgetUsageByCategory() {
  return (
    <ChartContainer config={chartConfig} className="h-full w-full">
      <BarChart
        data={data}
        layout="vertical"
        margin={{ top: 10, right: 30, left: 100, bottom: 10 }}
      >
        <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
        <XAxis 
          type="number" 
          domain={[0, 150]} 
          tick={{ fontSize: 12 }}
          tickFormatter={(value) => `${value}%`}
        />
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
                    `${value}%`,
                    name === "percent" ? "Budget Used" : name
                  ]}
                />
              );
            }
            return null;
          }}
        />
        <Legend />
        <Bar dataKey="percent" radius={[0, 4, 4, 0]} barSize={20}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={getBarColor(entry.percent)} />
          ))}
        </Bar>
        {/* Reference line at 100% */}
        <line x1="100" y1="0" x2="100" y2="100%" stroke="#64748b" strokeWidth="1" strokeDasharray="3 3" />
      </BarChart>
    </ChartContainer>
  );
}
