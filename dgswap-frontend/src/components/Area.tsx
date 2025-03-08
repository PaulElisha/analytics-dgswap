


import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import { formatNumber } from "../utils/format"
import {
  Card,
  CardContent,
  
  CardHeader,
 
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
const chartData = [
  { month: "2018", desktop: 186, mobile: 80 },
  { month: "2019", desktop: 305, mobile: 200 },
  { month: "2020", desktop: 237, mobile: 120 },
  { month: "2021", desktop: 73, mobile: 190 },
  { month: "2022", desktop: 209, mobile: 130 },
  { month: "2023", desktop: 214, mobile: 140 },
]


const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "blue",
  },
  mobile: {
    label: "Mobile",
    color: "blue",
  },
} 

export function Tvl({ value }: { value: number }) {
  return (
    <Card>
      <CardHeader>
       <h1 className="text-xl text-pink-500">DragonSwap TVL</h1>
       <h1 className="text-xl text-white font-bold">${formatNumber(Number(value))} </h1>
       
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 4)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Area
              dataKey="mobile"
              type="natural"
              fill="var(--color-mobile)"
              fillOpacity={0.4}
              stroke="var(--color-mobile)"
              stackId="a"
            />
            <Area
              dataKey="desktop"
              type="natural"
              fill="var(--color-desktop)"
              fillOpacity={0.4}
              stroke="var(--color-desktop)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
