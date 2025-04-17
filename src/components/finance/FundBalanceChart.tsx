
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "General Fund", balance: 22800 },
  { name: "Building Fund", balance: 45600 },
  { name: "Missions Fund", balance: 18400 },
  { name: "Benevolence", balance: 12200 },
  { name: "Youth Ministry", balance: 8600 },
];

const chartConfig = {
  balance: {
    label: "Fund Balance",
    theme: {
      light: "#16a34a",
      dark: "#4ade80",
    },
  },
};

export function FundBalanceChart() {
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
          tick={{ fontSize: 12 }} 
          tickFormatter={(value) => `$${value / 1000}k`}
        />
        <YAxis 
          dataKey="name" 
          type="category" 
          tick={{ fontSize: 12 }}
          width={90}
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
                    name === "balance" ? "Current Balance" : name
                  ]}
                />
              );
            }
            return null;
          }}
        />
        <Legend />
        <Bar dataKey="balance" fill="var(--color-balance)" radius={[0, 4, 4, 0]} barSize={20} />
      </BarChart>
    </ChartContainer>
  );
}
