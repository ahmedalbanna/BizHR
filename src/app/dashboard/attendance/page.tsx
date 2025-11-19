'use client';

import { useState } from 'react';
import DashboardHeader from '@/components/dashboard-header';
import { dailyAttendanceLog } from '@/lib/data';
import type { DailyAttendance } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Calendar,
  Filter,
  Search,
  Download,
  MoreVertical,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

function getStatusIndicatorClass(status: DailyAttendance['status']) {
  switch (status) {
    case 'Present':
      return 'bg-green-500';
    case 'Late':
      return 'bg-yellow-500';
    case 'Absent':
      return 'bg-red-500';
  }
}

export default function AttendancePage() {
  const [date, setDate] = useState(new Date());

  const presentCount = dailyAttendanceLog.filter(
    (log) => log.status === 'Present' || log.status === 'Late'
  ).length;
  const absentCount = dailyAttendanceLog.filter(
    (log) => log.status === 'Absent'
  ).length;
  const lateCount = dailyAttendanceLog.filter(
    (log) => log.status === 'Late'
  ).length;

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <DashboardHeader
        title="Attendance Tracking"
        subtitle="Monitor and manage employee attendance"
        className="hidden md:flex"
      >
        <Button variant="ghost" size="icon">
          <MoreVertical />
        </Button>
      </DashboardHeader>
      <main className="flex-1 space-y-4 p-4 md:p-6">
        <Card className="bg-gradient-to-br from-primary to-primary/70 text-primary-foreground">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold">Today's Overview</h2>
                <p className="text-sm text-primary-foreground/80">
                  {format(date, 'MMMM dd, yyyy')}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 bg-primary-foreground/20 hover:bg-primary-foreground/30"
              >
                <Calendar className="h-5 w-5" />
              </Button>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-4xl font-bold">{presentCount}</p>
                <p className="text-xs text-primary-foreground/80">Present</p>
              </div>
              <div>
                <p className="text-4xl font-bold">{absentCount}</p>
                <p className="text-xs text-primary-foreground/80">Absent</p>
              </div>
              <div>
                <p className="text-4xl font-bold">{lateCount}</p>
                <p className="text-xs text-primary-foreground/80">Late</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div>
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Daily Attendance Log</h2>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon">
                <Filter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Search className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        <div className="grid gap-3">
          {dailyAttendanceLog.map((log) => (
            <Card key={log.id}>
              <CardContent className="flex items-center gap-4 p-3">
                <Avatar className="h-10 w-10 border">
                  <AvatarImage src={log.avatar} alt={log.name} />
                  <AvatarFallback>{log.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-semibold">{log.name}</p>
                  <p className="text-sm text-muted-foreground">{log.role}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <div
                      className={cn(
                        'h-2 w-2 rounded-full',
                        getStatusIndicatorClass(log.status)
                      )}
                    />
                    <p className="text-sm font-medium">{log.status}</p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {log.status === 'Absent'
                      ? log.reason
                      : `${log.clockIn} - ${log.clockOut}`}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="flex gap-2">
            <Button className="flex-1">
                <Download className="mr-2 h-4 w-4" />
                Generate Report
            </Button>
            <Button variant="outline" size="icon">
                <Calendar className="h-5 w-5" />
            </Button>
        </div>
      </main>
    </div>
  );
}
