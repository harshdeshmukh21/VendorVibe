"use client";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#404040", // Darker gray for desktop data
  },
  mobile: {
    label: "Mobile",
    color: "#808080", // Lighter gray for mobile data
  },
};

export function BarComponent() {
  return (
    <div className="min-h-[300px] mt-20 w-full">
      <BarChart data={chartData} width={300} height={200}>
        <CartesianGrid vertical={false} stroke="#e5e5e5" />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
          stroke="#666666"
        />
        <Bar dataKey="desktop" fill={chartConfig.desktop.color} radius={4} />
        <Bar dataKey="mobile" fill={chartConfig.mobile.color} radius={4} />
      </BarChart>
    </div>
  );
}

export default BarComponent;
