'use client';

import { useRouter } from 'next/navigation';
import { notifications } from '@/lib/data';
import type { Notification } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  ArrowLeft,
  Search,
  Triangle,
  CheckCircle,
  Clock,
  Info,
  UserX,
  ClipboardCheck
} from 'lucide-react';
import { cn } from '@/lib/utils';

function getNotificationIcon(type: Notification['type']) {
  switch (type) {
    case 'leave':
      return <Triangle className="h-5 w-5 fill-current" />;
    case 'payroll':
      return <CheckCircle className="h-5 w-5" />;
    case 'performance':
      return <Clock className="h-5 w-5" />;
    case 'onboarding':
      return <Info className="h-5 w-5" />;
    case 'exit':
      return <UserX className="h-5 w-5" />;
    case 'training':
      return <ClipboardCheck className="h-5 w-5" />;
  }
}

function getNotificationColors(type: Notification['type']) {
  switch (type) {
    case 'leave':
      return { dot: 'bg-yellow-400', iconBg: 'bg-yellow-400/20 text-yellow-400', iconContainer: 'bg-pink-200' };
    case 'payroll':
      return { dot: 'bg-green-400', iconBg: 'bg-green-400/20 text-green-400', iconContainer: 'bg-green-400' };
    case 'performance':
      return { dot: 'bg-yellow-400', iconBg: 'bg-yellow-400/20 text-yellow-400', iconContainer: 'bg-yellow-200' };
    case 'onboarding':
      return { dot: 'bg-gray-400', iconBg: 'bg-gray-400/20 text-gray-400', iconContainer: 'bg-red-800' };
    case 'exit':
      return { dot: 'bg-red-400', iconBg: 'bg-red-400/20 text-red-400', iconContainer: 'bg-pink-300' };
    case 'training':
        return { dot: 'bg-green-400', iconBg: 'bg-green-400/20 text-green-400', iconContainer: 'bg-green-200' };
  }
}

export default function NotificationsPage() {
  const router = useRouter();
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-10 flex items-center justify-between bg-primary p-4 text-primary-foreground">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft />
        </Button>
        <div className="flex-1">
            <h1 className="text-xl font-semibold">Notification</h1>
            <p className="text-sm text-primary-foreground/80">Review notifications and activities</p>
        </div>
        <Button variant="ghost" size="icon">
          <Search />
        </Button>
      </header>

      <main className="p-4 space-y-4">
        <div className="flex items-center gap-2">
            <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input placeholder="Search notifications..." className="pl-10 bg-card" />
            </div>
            <Button>Mark All Read</Button>
        </div>

        <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Recent</h2>
            <span className="text-sm text-primary">{unreadCount} unread</span>
        </div>

        <div className="grid gap-3">
          {notifications.map((notification) => {
            const colors = getNotificationColors(notification.type);
            const icon = getNotificationIcon(notification.type);
            return (
                <Card key={notification.id} className="bg-card/80">
                <CardContent className="flex items-center gap-4 p-3">
                    {!notification.read && <div className={cn("h-2 w-2 rounded-full", colors.dot)} />}
                    {notification.read && <div className="w-2 h-2" />}

                    <div className={cn("h-10 w-10 rounded-full flex items-center justify-center", colors.iconContainer, notification.type === 'payroll' ? 'text-white' : 'text-black' )}>
                        {icon}
                    </div>

                    <div className="flex-1">
                    <p className="font-semibold">{notification.title}</p>
                    <p className="text-sm text-muted-foreground">
                        {notification.description}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                        {notification.timestamp}
                    </p>
                    </div>
                </CardContent>
                </Card>
            );
        })}
        </div>
      </main>
    </div>
  );
}
