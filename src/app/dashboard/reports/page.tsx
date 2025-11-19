'use client';

import DashboardHeader from '@/components/dashboard-header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Line, LineChart, Pie, PieChart } from 'recharts';
import { turnoverData, hiringTrendsData, departmentHeadcountData } from '@/lib/data';
import type { ChartConfig } from '@/components/ui/chart';

const turnoverChartConfig = {
  rate: {
    label: 'Turnover Rate (%)',
    color: 'hsl(var(--primary))',
  },
} satisfies ChartConfig;

const hiringChartConfig = {
  hired: {
    label: 'Hired',
    color: 'hsl(var(--chart-2))',
  },
  departed: {
    label: 'Departed',
    color: 'hsl(var(--destructive))',
  },
} satisfies ChartConfig;

const departmentChartConfig = {
    headcount: {
        label: "Headcount"
    },
    ...departmentHeadcountData.reduce((acc, cur) => ({ ...acc, [cur.name]: { label: cur.name, color: cur.fill } }), {}),
} satisfies ChartConfig

export default function ReportsPage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <DashboardHeader title="Reports & Analytics" />
      <main className="flex-1 space-y-4 p-4 md:p-6">
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Employee Turnover Rate</CardTitle>
              <CardDescription>Monthly turnover rate for the last 6 months.</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={turnoverChartConfig} className="min-h-[250px] w-full">
                <LineChart data={turnoverData} margin={{ left: 12, right: 12 }}>
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                  <YAxis tickLine={false} axisLine={false} tickMargin={8} unit="%" />
                  <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                  <Line dataKey="rate" type="monotone" stroke="var(--color-rate)" strokeWidth={3} dot={true} />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Hiring Trends</CardTitle>
               <CardDescription>New hires vs. departures over the last 6 months.</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={hiringChartConfig} className="min-h-[250px] w-full">
                <BarChart data={hiringTrendsData} >
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                   <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Bar dataKey="hired" fill="var(--color-hired)" radius={4} />
                  <Bar dataKey="departed" fill="var(--color-departed)" radius={4} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
          <Card className="lg:col-span-2">
            <CardHeader>
                <CardTitle>Headcount by Department</CardTitle>
                <CardDescription>Distribution of employees across different departments.</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
                 <ChartContainer config={departmentChartConfig} className="min-h-[300px] w-full max-w-sm">
                    <PieChart>
                        <ChartTooltip content={<ChartTooltipContent nameKey="value" hideLabel />} />
                        <Pie data={departmentHeadcountData} dataKey="value" nameKey="name" innerRadius={60} />
                         <ChartLegend content={<ChartLegendContent />} />
                    </PieChart>
                </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
