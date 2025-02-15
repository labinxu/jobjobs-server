"use client";
import { useEffect, useState } from "react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

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
import { IGoods } from "../columns";
export interface IChartsData {
  month: string;
  shop: string;
  price: number;
  jd_price: number;
}
const chartConfig = {
  shop: {
    label: "Shop",
    color: "hsl(var(--chart-1))",
  },
  price: {
    label: "price",
    color: "hsl(var(--chart-2))",
  },
  jd_price: {
    label: "jd_price",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;
interface ChartPageProps {
  title: string;
  data: IGoods[];
}
export interface IShopChartData {
  date: string;
  shop: string;
  price: number;
  jd_price: number;
}
export function ChartsPage({ title, data }: ChartPageProps) {
  const [chartsData, setChartsData] = useState<IShopChartData[]>([]);
  useEffect(() => {
    const dd = data.map((v: IGoods): IShopChartData => {
      const dt = new Date(v.update_time);
      const updateTime = `${dt.getFullYear()}/${dt.getMonth() + 1}/${dt.getDay() + 1}`;
      return {
        date: updateTime,
        shop: v.shop_name,
        price: Number(v.final_price),
        jd_price: Number(v.jd_price),
      };
    });
    console.log(dd);
    setChartsData(dd);
  }, [data]);
  return (
    <div className="w-90 h-2/3">
      <Card>
        <CardHeader>
          <CardTitle>Line Chart - Multiple</CardTitle>
          <CardDescription>{title}</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <LineChart
              accessibilityLayer
              data={chartsData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Line
                dataKey="shop"
                type="monotone"
                stroke="var(--color-shop)"
                strokeWidth={2}
                dot={false}
              />
              <Line
                dataKey="price"
                type="monotone"
                stroke="var(--color-price)"
                strokeWidth={2}
                dot={false}
              />
              <Line
                dataKey="jd_price"
                type="monotone"
                stroke="var(--color-jd_price)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
}
