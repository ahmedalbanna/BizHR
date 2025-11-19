
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Building2 } from 'lucide-react';

export function Header() {
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center border-b">
      <Link href="/" className="flex items-center justify-center">
        <Building2 className="h-6 w-6 text-primary" />
        <span className="ml-2 font-bold">BizHR</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <Link href="/" className="text-sm font-medium hover:underline underline-offset-4">
          Home
        </Link>
        <Link href="/jobs" className="text-sm font-medium hover:underline underline-offset-4">
          Jobs
        </Link>
        <Link href="/login">
            <Button variant="outline" size="sm">
                Login
            </Button>
        </Link>
      </nav>
    </header>
  );
}
