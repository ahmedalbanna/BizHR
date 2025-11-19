'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import {
  ArrowLeft,
  ChevronRight,
  Globe,
  Bell,
  Palette,
  Lock,
  Shield,
  Fingerprint,
  Users,
  LogOut,
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const SettingsItem = ({
  icon,
  title,
  subtitle,
  action,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  action: 'switch' | 'arrow' | React.ReactNode;
}) => (
  <div className="flex items-center py-3">
    <div className="mr-4 h-10 w-10 flex items-center justify-center rounded-lg bg-secondary text-secondary-foreground">
      {icon}
    </div>
    <div className="flex-1">
      <p className="font-semibold">{title}</p>
      {subtitle && (
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      )}
    </div>
    {action === 'switch' && <Switch />}
    {action === 'arrow' && <ChevronRight className="h-5 w-5 text-muted-foreground" />}
  </div>
);

export default function SettingsPage() {
  const router = useRouter();

  const settingsSections = [
    {
      title: 'App Preferences',
      items: [
        {
          icon: <Globe className="h-5 w-5" />,
          title: 'Language',
          subtitle: 'English (US)',
          action: 'arrow',
        },
        {
          icon: <Bell className="h-5 w-5" />,
          title: 'Notifications',
          subtitle: 'Push notifications enabled',
          action: 'switch',
        },
        {
          icon: <Palette className="h-5 w-5" />,
          title: 'Theme',
          subtitle: 'Light Mode',
          action: 'switch',
        },
      ],
    },
    {
      title: 'Security Settings',
      items: [
        {
          icon: <Lock className="h-5 w-5" />,
          title: 'Change Password',
          subtitle: 'Update your account password',
          action: 'arrow',
        },
        {
          icon: <Shield className="h-5 w-5" />,
          title: 'Two-Factor Authentication',
          subtitle: 'Add extra security to your account',
          action: 'switch',
        },
      ],
    },
    {
      title: 'Privacy Settings',
      items: [
        {
          icon: <Fingerprint className="h-5 w-5" />,
          title: 'Data Privacy',
          subtitle: 'Manage your data sharing preferences',
          action: 'arrow',
        },
        {
          icon: <Users className="h-5 w-5" />,
          title: 'Access Controls',
          subtitle: 'Manage app permissions',
          action: 'arrow',
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-10 flex items-center justify-between bg-card p-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft />
        </Button>
        <h1 className="text-xl font-bold">Settings</h1>
        <div className="w-9"></div>
      </header>

      <main className="space-y-6 p-4">
        {settingsSections.map((section, index) => (
          <div key={index}>
            <h2 className="mb-2 text-sm font-semibold uppercase text-primary">
              {section.title}
            </h2>
            <Card>
              <CardContent className="divide-y p-2">
                {section.items.map((item, itemIndex) => (
                  <SettingsItem key={itemIndex} {...item} />
                ))}
              </CardContent>
            </Card>
          </div>
        ))}
        
        <Button variant="destructive" className="w-full">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
        </Button>
      </main>
    </div>
  );
}
