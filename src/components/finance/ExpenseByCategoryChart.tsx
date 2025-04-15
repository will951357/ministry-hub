
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { PieChart, Pie, Cell, Legend, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  { name: "Worship", value: 8430, color: "#3b82f6" },
  { name: "Missions", value: 12650, color: "#22c55e" },
  { name: "Building", value: 9830, color: "#f97316" },
  { name: "Admin", value: 4300, color: "#a855f7" },
];

// Create config for the chart
const chartConfig = data.reduce((config, item) => {
  config[item.name.toLowerCase()] = {
    label: item.name,
    color: item.color,
  };
  return config;
}, {} as Record<string, { label: string; color: string }>);

export function ExpenseByCategoryChart() {
  return (
    <ChartContainer config={chartConfig} className="h-full w-full">
      <PieChart margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={90}
          paddingAngle={2}
          dataKey="value"
          nameKey="name"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          labelLine={false}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <ChartTooltipContent
                  active={active}
                  payload={payload}
                  formatter={(value, name) => [
                    `$${value.toLocaleString()}`,
                    name,
                  ]}
                />
              );
            }
            return null;
          }}
        />
        <Legend formatter={(value) => <span className="text-xs">{value}</span>} />
      </PieChart>
    </ChartContainer>
  );
}
