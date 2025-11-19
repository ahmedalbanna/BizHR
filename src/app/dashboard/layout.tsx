
'use client'
import { useEffect, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarInset,
} from '@/components/ui/sidebar';
import { DashboardNav } from '@/components/dashboard-nav';
import { DashboardBottomNav } from '@/components/dashboard-bottom-nav';
import { Building2 } from 'lucide-react';

// This is a mock authentication check. 
// In a real app, you would use a proper auth provider.
const useMockAuth = () => {
  const router = useRouter();
  useEffect(() => {
    // This is a placeholder. In a real app, you would check for a valid session.
    // For now, we'll assume the user is not logged in if there's no specific cookie/token.
    // The login page sets a mock "isLoggedIn" to true in a real scenario.
    // To simulate being logged out, you can clear site data in your browser dev tools.
    const isLoggedIn = true; // For demo purposes, we are always logged in inside the dashboard.
    
    if (!isLoggedIn) {
      router.replace('/login');
    }
  }, [router]);
};


export default function DashboardLayout({ children }: { children: ReactNode }) {
  useMockAuth();
  
  return (
    <SidebarProvider>
      <Sidebar className="hidden md:flex">
        <SidebarHeader>
          <div className="flex h-16 items-center gap-2 px-2">
            <Building2 className="h-8 w-8 text-primary" />
            <span className="text-lg font-semibold">HRConnect</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <DashboardNav />
        </SidebarContent>
        <SidebarFooter>
            {/* <DashboardNavBottom /> */}
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>{children}</SidebarInset>
      <DashboardBottomNav />
    </SidebarProvider>
  );
}
