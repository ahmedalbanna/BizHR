'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navItems } from './dashboard-nav';
import { cn } from '@/lib/utils';

export function DashboardBottomNav() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full border-t bg-background/95 backdrop-blur-sm md:hidden">
      <div className="grid h-16 grid-cols-5">
        {navItems.slice(0, 5).map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex flex-col items-center justify-center gap-1 text-xs font-medium text-muted-foreground',
              pathname === item.href && 'text-primary'
            )}
          >
            <item.icon className="h-6 w-6" />
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
