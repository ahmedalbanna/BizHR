'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import {
  LayoutGrid,
  Users,
  Briefcase,
  Clock,
  Banknote,
  BarChart,
  Settings,
  Bell,
  Calendar,
} from 'lucide-react';

export const navItems = [
  { href: '/dashboard', icon: LayoutGrid, label: 'Dashboard' },
  { href: '/dashboard/employees', icon: Users, label: 'Employees' },
  { href: '/dashboard/recruitment', icon: Briefcase, label: 'Recruitment' },
  { href: '/dashboard/attendance', icon: Clock, label: 'Attendance' },
  { href: '/dashboard/payroll', icon: Banknote, label: 'Payroll' },
  { href: '/dashboard/calendar', icon: Calendar, label: 'Calendar' },
  { href: '/dashboard/reports', icon: BarChart, label: 'Reports' },
  { href: '/dashboard/notifications', icon: Bell, label: 'Notifications' },
];

export function DashboardNav() {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {navItems.map((item) => (
        <SidebarMenuItem key={item.href}>
          <SidebarMenuButton
            asChild
            isActive={pathname.startsWith(item.href) && item.href !== '/dashboard' || pathname === '/dashboard' && item.href === '/dashboard'}
            tooltip={item.label}
          >
            <Link href={item.href}>
              <item.icon />
              <span>{item.label}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}

export function DashboardNavBottom() {
    const pathname = usePathname();
    const settingsPath = '/dashboard/settings';
    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton
                    asChild
                    isActive={pathname === settingsPath}
                    tooltip="Settings"
                >
                    <Link href={settingsPath}>
                        <Settings />
                        <span>Settings</span>
                    </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}
