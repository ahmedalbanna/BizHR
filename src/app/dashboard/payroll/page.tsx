'use client';

import DashboardHeader from '@/components/dashboard-header';
import { employeePayroll } from '@/lib/data';
import type { EmployeePayroll } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Filter, ListFilter } from 'lucide-react';
import { cn } from '@/lib/utils';

function getStatusBadgeVariant(status: EmployeePayroll['status']) {
  switch (status) {
    case 'Processed':
      return 'default';
    case 'Pending':
      return 'secondary';
  }
}

export default function PayrollPage() {
  const totalEmployees = employeePayroll.length;
  const totalPayroll = employeePayroll.reduce(
    (sum, item) => sum + item.netSalary,
    0
  );
  const pendingCount = employeePayroll.filter(
    (item) => item.status === 'Pending'
  ).length;
  const progress =
    totalEmployees > 0
      ? ((totalEmployees - pendingCount) / totalEmployees) * 100
      : 0;

  return (
    <div className="flex min-h-screen w-full flex-col">
      <DashboardHeader
        title="Payroll Management"
        subtitle="Manage your payroll process"
        className="hidden md:flex"
      />
      <main className="flex-1 space-y-4 p-4 md:p-6">
        <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-lg font-semibold">Current Payroll Cycle</p>
                <p className="text-sm text-primary-foreground/80">
                  March 1 - March 31, 2024
                </p>
              </div>
              <div className="relative h-16 w-16">
                <Progress
                  value={progress}
                  className="absolute h-full w-full rotate-[-90deg] [&>div]:bg-primary-foreground"
                  style={{
                    clipPath: 'circle(50% at 50% 50%)',
                    backgroundColor: 'hsla(var(--primary-foreground), 0.2)',
                  }}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <p className="text-xl font-bold">{Math.round(progress)}%</p>
                  <p className="text-xs">Complete</p>
                </div>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-3xl font-bold">{totalEmployees}</p>
                <p className="text-xs text-primary-foreground/80">
                  Total Employees
                </p>
              </div>
              <div>
                <p className="text-3xl font-bold">
                  ${(totalPayroll / 1000).toFixed(1)}k
                </p>
                <p className="text-xs text-primary-foreground/80">Total Payroll</p>
              </div>
              <div>
                <p className="text-3xl font-bold">{pendingCount}</p>
                <p className="text-xs text-primary-foreground/80">Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Employee Payroll</h2>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
             <Button variant="outline" size="sm">
                <ListFilter className="mr-2 h-4 w-4" />
                Sort
            </Button>
          </div>
        </div>

        <div className="grid gap-4">
          {employeePayroll.map((item) => (
            <Card key={item.id}>
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12 border">
                    <AvatarImage src={item.avatar} alt={item.name} />
                    <AvatarFallback>{item.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.role}
                    </p>
                  </div>
                  <Badge
                    variant={getStatusBadgeVariant(item.status)}
                    className={cn(
                      item.status === 'Processed'
                        ? 'bg-green-500/20 text-green-700 hover:bg-green-500/30'
                        : 'bg-yellow-500/20 text-yellow-700 hover:bg-yellow-500/30'
                    )}
                  >
                    {item.status}
                  </Badge>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4 text-sm md:grid-cols-4">
                  <div>
                    <p className="text-muted-foreground">Base Salary</p>
                    <p className="font-semibold">
                      ${item.baseSalary.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Bonus</p>
                    <p className="font-semibold text-green-500">
                      +${item.bonus.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Deductions</p>
                    <p className="font-semibold text-destructive">
                      -${item.deductions.toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right md:text-left">
                    <p className="text-muted-foreground">Net Salary</p>
                    <p className="font-bold text-primary">
                      ${item.netSalary.toLocaleString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
