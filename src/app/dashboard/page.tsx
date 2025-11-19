import Link from 'next/link';
import DashboardHeader from '@/components/dashboard-header';
import { Card, CardContent } from '@/components/ui/card';
import {
  Users,
  Briefcase,
  Clock,
  Banknote,
  LayoutGrid,
} from 'lucide-react';

const navLinks = [
  { href: '/dashboard/employees', icon: Users, title: 'Employee', subtitle: 'Management' },
  { href: '/dashboard/recruitment', icon: Briefcase, title: 'Recruitment', subtitle: '& Hiring' },
  { href: '/dashboard/attendance', icon: Clock, title: 'Attendance', subtitle: 'Tracking' },
  { href: '/dashboard/payroll', icon: Banknote, title: 'Payroll', subtitle: 'Management' },
]

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <DashboardHeader title="HR Dashboard" />
      <main className="flex-1 space-y-6 p-4 md:p-6">
        <div className="rounded-lg bg-primary p-6 text-primary-foreground">
          <div className="flex items-center gap-4">
            <div className="grid h-16 w-16 place-items-center rounded-full bg-primary-foreground/20">
              <LayoutGrid className="h-8 w-8 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">HR Dashboard</h1>
              <p className="text-primary-foreground/80">Welcome back, Sarah</p>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-4">
            <div>
              <p className="text-4xl font-bold">1,247</p>
              <p className="text-sm text-primary-foreground/80">Total Employees</p>
            </div>
            <div>
              <p className="text-4xl font-bold">23</p>
              <p className="text-sm text-primary-foreground/80">Open Positions</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {navLinks.map((link) => (
            <Link href={link.href} key={link.href}>
              <Card className="flex h-40 flex-col items-center justify-center gap-2 text-center transition-colors hover:bg-card/80">
                <div className="grid h-12 w-12 place-items-center rounded-full bg-secondary">
                  <link.icon className="h-6 w-6 text-secondary-foreground" />
                </div>
                <div className="space-y-1">
                  <p className="font-semibold">{link.title}</p>
                  <p className="text-sm text-muted-foreground">{link.subtitle}</p>
                </div>
              </Card>
            </Link>
          ))}
        </div>

      </main>
    </div>
  );
}
