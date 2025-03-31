
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', value: 120 },
  { name: 'Feb', value: 132 },
  { name: 'Mar', value: 145 },
  { name: 'Apr', value: 160 },
  { name: 'May', value: 175 },
  { name: 'Jun', value: 190 },
  { name: 'Jul', value: 210 },
  { name: 'Aug', value: 220 },
  { name: 'Sep', value: 235 },
  { name: 'Oct', value: 245 },
  { name: 'Nov', value: 255 },
  { name: 'Dec', value: 270 },
];

export function AttendanceChart() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4F86C6" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#4F86C6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" axisLine={false} tickLine={false} />
          <YAxis axisLine={false} tickLine={false} />
          <Tooltip />
          <Area 
            type="monotone" 
            dataKey="value" 
            stroke="#4F86C6" 
            fillOpacity={1} 
            fill="url(#colorValue)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
