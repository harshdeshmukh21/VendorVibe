"use client";
import { TrendingUp } from "lucide-react";
import { LabelList, Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A monochrome pie chart with a label list";

const chartData = [
  { browser: "chrome", visitors: 275, fill: "#1a1a1a" },
  { browser: "safari", visitors: 200, fill: "#404040" },
  { browser: "firefox", visitors: 187, fill: "#666666" },
  { browser: "edge", visitors: 173, fill: "#808080" },
  { browser: "other", visitors: 90, fill: "#999999" },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "#1a1a1a",
  },
  safari: {
    label: "Safari",
    color: "#404040",
  },
  firefox: {
    label: "Firefox",
    color: "#666666",
  },
  edge: {
    label: "Edge",
    color: "#808080",
  },
  other: {
    label: "Other",
    color: "#999999",
  },
} satisfies ChartConfig;

export function PieComponent() {
  return (
    <Card className="flex border-none bg-gray-50 flex-wrap">
      <CardContent className="pb-0 border-none">
        <ChartContainer
          config={chartConfig}
          className="border-none aspect-square max-h-[250px] bg-gray-50 [&_.recharts-text]:fill-background"
        >
          <PieChart width={250} height={250} className="ml-[-10px]">
            <ChartTooltip
              content={<ChartTooltipContent nameKey="visitors" hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="visitors"
              innerRadius={40}
              outerRadius={80}
            >
              <LabelList
                dataKey="browser"
                className="fill-background"
                stroke="none"
                fontSize={12}
                formatter={(value: keyof typeof chartConfig) =>
                  chartConfig[value]?.label
                }
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export default PieComponent;
