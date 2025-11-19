"use client";

import type { FC, HTMLAttributes } from "react";
import { Button } from "@/components/ui/button";
import { Settings, Bell } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

interface DashboardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
}

const DashboardHeader: FC<DashboardHeaderProps> = ({
  title,
  className,
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
      <h1 className="flex-1 text-xl font-semibold tracking-tight">{title}</h1>
      <Button variant="ghost" size="icon" className="relative h-9 w-9 rounded-full">
        <Bell className="h-5 w-5" />
        <span className="sr-only">Notifications</span>
      </Button>
      <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
        <Settings className="h-5 w-5" />
        <span className="sr-only">Settings</span>
      </Button>
    </header>
  );
};

export default DashboardHeader;
