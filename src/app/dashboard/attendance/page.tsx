'use client';

import { useState, useEffect } from 'react';
import DashboardHeader from '@/components/dashboard-header';
import { attendanceRecords } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { Clock, LogIn, LogOut } from 'lucide-react';

export default function AttendancePage() {
  const [currentTime, setCurrentTime] = useState('');
  const [isClockedIn, setIsClockedIn] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    // Check if the latest record is an unclosed clock-in
    const latestRecord = attendanceRecords[attendanceRecords.length - 1];
    if (latestRecord && !latestRecord.clockOut) {
      setIsClockedIn(true);
    }

    return () => clearInterval(timer);
  }, []);

  const handleClockIn = () => {
    setIsClockedIn(true);
    toast({
      title: 'Clocked In',
      description: `You have successfully clocked in at ${new Date().toLocaleTimeString()}.`,
    });
  };

  const handleClockOut = () => {
    setIsClockedIn(false);
    toast({
      title: 'Clocked Out',
      description: `You have successfully clocked out at ${new Date().toLocaleTimeString()}.`,
    });
  };

  return (
    <div className="flex min-h-screen w-full flex-col">
      <DashboardHeader title="Attendance" />
      <main className="flex-1 space-y-4 p-4 md:p-6">
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="md:col-span-1">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Time Clock</CardTitle>
              <Clock className="h-6 w-6 text-muted-foreground" />
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center gap-4">
              <div className="text-4xl font-bold tracking-wider">{currentTime || '...'}</div>
              <div className="flex w-full gap-2">
                <Button className="flex-1" onClick={handleClockIn} disabled={isClockedIn}>
                  <LogIn /> Clock In
                </Button>
                <Button className="flex-1" onClick={handleClockOut} disabled={!isClockedIn} variant="outline">
                  <LogOut /> Clock Out
                </Button>
              </div>
            </CardContent>
          </Card>
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Recent Attendance Log</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Clock In</TableHead>
                    <TableHead>Clock Out</TableHead>
                    <TableHead className="text-right">Total Hours</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {attendanceRecords.slice().reverse().map((record) => (
                    <TableRow key={record.id}>
                      <TableCell>{record.employeeName}</TableCell>
                      <TableCell>{record.date}</TableCell>
                      <TableCell>{record.clockIn}</TableCell>
                      <TableCell>
                        {record.clockOut ? record.clockOut : <Badge variant="secondary">In Progress</Badge>}
                      </TableCell>
                      <TableCell className="text-right">
                        {record.totalHours ? `${record.totalHours.toFixed(2)}h` : '-'}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
