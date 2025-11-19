'use client';

import { useParams, useRouter } from 'next/navigation';
import { employeePayroll } from '@/lib/data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Download, Bell, Building2 } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const InfoRow = ({
  label,
  value,
  valueClass,
}: {
  label: string;
  value: string;
  valueClass?: string;
}) => (
  <div className="flex justify-between py-2 text-sm">
    <span className="text-muted-foreground">{label}</span>
    <span className={`font-medium ${valueClass}`}>{value}</span>
  </div>
);

const PaymentHistoryRow = ({
  date,
  period,
  amount,
}: {
  date: string;
  period: string;
  amount: string;
}) => (
  <div className="flex items-center justify-between py-3">
    <div>
      <p className="font-semibold">{date}</p>
      <p className="text-sm text-muted-foreground">{period}</p>
    </div>
    <p className="font-semibold text-green-400">{amount}</p>
  </div>
);

export default function PayrollDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const payroll = employeePayroll.find((p) => p.id === id);

  if (!payroll) {
    return (
      <div className="flex h-screen items-center justify-center">
        Payroll details not found
      </div>
    );
  }

  const {
    name,
    avatar,
    role,
    baseSalary,
    bonus,
    deductions,
    netSalary,
    details,
  } = payroll;

  const totalEarnings =
    (details?.earnings.base ?? 0) +
    (details?.earnings.bonus ?? 0) +
    (details?.earnings.overtime ?? 0);
  const totalDeductions =
    (details?.deductions.federal ?? 0) +
    (details?.deductions.state ?? 0) +
    (details?.deductions.socialSecurity ?? 0) +
    (details?.deductions.medicare ?? 0) +
    (details?.deductions.insurance ?? 0);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-10 flex items-center justify-between bg-primary p-4 text-primary-foreground">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft />
        </Button>
        <h1 className="text-xl font-semibold">Payroll Details</h1>
        <div className="w-9"></div>
      </header>

      <main className="space-y-6 p-4">
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <Avatar className="h-14 w-14 border">
              <AvatarImage src={avatar} alt={name} />
              <AvatarFallback>{name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="text-lg font-bold">{name}</p>
              <p className="text-sm text-primary">{role}</p>
              <p className="text-xs text-muted-foreground">
                EMP-2024-{id.replace('EP', '')}
              </p>
            </div>
          </CardContent>
          <Separator />
          <CardContent className="grid grid-cols-3 gap-2 p-4 text-center text-xs">
            <div>
              <p className="font-semibold">Marketing</p>
              <p className="text-muted-foreground">Department</p>
            </div>
            <div>
              <p className="font-semibold">Manager</p>
              <p className="text-muted-foreground">Position</p>
            </div>
            <div>
              <p className="font-semibold">Jan 15, 2022</p>
              <p className="text-muted-foreground">Since</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <p className="text-sm font-semibold">Current Pay Period</p>
            <p className="text-xs text-muted-foreground">December 1-15, 2024</p>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Gross Pay</p>
                <p className="text-2xl font-bold text-green-400">
                  ${totalEarnings.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Net Pay</p>
                <p className="text-2xl font-bold text-primary">
                  ${netSalary.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Earnings Breakdown</h3>
          <Card>
            <CardContent className="p-4">
              <InfoRow
                label="Base Salary"
                value={`$${details?.earnings.base.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
              />
              <InfoRow
                label="Performance Bonus"
                value={`$${details?.earnings.bonus.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
              />
              <InfoRow
                label="Overtime Pay"
                value={`$${details?.earnings.overtime.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
              />
              <Separator className="my-2" />
              <InfoRow
                label="Total Earnings"
                value={`$${totalEarnings.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                valueClass="text-green-400 font-bold"
              />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Payment History</h3>
          <Card>
            <CardContent className="divide-y p-4">
              {details?.paymentHistory.map((item, index) => (
                <PaymentHistoryRow
                  key={index}
                  date={item.date}
                  period={item.period}
                  amount={`$${item.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                />
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Deductions</h3>
          <Card>
            <CardContent className="p-4">
              <InfoRow
                label="Federal Tax"
                value={`$${details?.deductions.federal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
              />
              <InfoRow
                label="State Tax"
                value={`$${details?.deductions.state.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
              />
              <InfoRow
                label="Social Security"
                value={`$${details?.deductions.socialSecurity.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
              />
              <InfoRow
                label="Medicare"
                value={`$${details?.deductions.medicare.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
              />
              <InfoRow
                label="Health Insurance"
                value={`$${details?.deductions.insurance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
              />
              <Separator className="my-2" />
              <InfoRow
                label="Total Deductions"
                value={`$${totalDeductions.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                valueClass="text-destructive font-bold"
              />
            </CardContent>
          </Card>
        </div>

        <Button className="w-full">
          <Download className="mr-2 h-4 w-4" /> Download Pay Stub
        </Button>
      </main>
    </div>
  );
}
