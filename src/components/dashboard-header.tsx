"use client";

import type { FC, HTMLAttributes, ReactNode } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Settings, Search, Bell } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

interface DashboardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
  children?: ReactNode;
}

const DashboardHeader: FC<DashboardHeaderProps> = ({
  title,
  subtitle,
  className,
  children,
  ...props
}) => {
  return (
    <header
      className={cn(
        "sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm md:px-6",
        className
      )}
      {...props}
    >
      <SidebarTrigger className="md:hidden" />
      <div className="flex-1">
        <h1 className="text-lg font-semibold tracking-tight">{title}</h1>
        {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      <Button variant="ghost" size="icon" className="relative h-9 w-9 rounded-full">
        <Search className="h-5 w-5" />
        <span className="sr-only">Search</span>
      </Button>
      {children}
      <Link href="/dashboard/notifications">
        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
        </Button>
      </Link>
      <Link href="/dashboard/settings">
        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
          <Settings className="h-5 w-5" />
          <span className="sr-only">Settings</span>
        </Button>
      </Link>
    </header>
  );
};

export default DashboardHeader;
