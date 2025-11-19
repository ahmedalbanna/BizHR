'use client';

import { useState } from 'react';
import Link from 'next/link';
import DashboardHeader from '@/components/dashboard-header';
import { openPositions } from '@/lib/data';
import type { OpenPosition } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Search,
  ChevronRight,
  Users,
  Clock,
  Plus,
  Bell,
} from 'lucide-react';
import { cn } from '@/lib/utils';

function getStatusBadgeVariant(status: OpenPosition['status']) {
  switch (status) {
    case 'Open':
      return 'default';
    case 'Closing Soon':
      return 'secondary';
    case 'Closed':
      return 'destructive';
  }
}

export default function RecruitmentPage() {
  const [department, setDepartment] = useState('all');
  const [status, setStatus] = useState('all');
  const [sortBy, setSortBy] = useState('posted-desc');

  const filteredAndSortedPositions = openPositions
    .filter((position) => {
      const matchesDept =
        department === 'all' || position.department === department;
      const matchesStatus = status === 'all' || position.status === status;
      return matchesDept && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'posted-desc':
          return (
            new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime()
          );
        case 'posted-asc':
          return (
            new Date(a.postedDate).getTime() - new Date(b.postedDate).getTime()
          );
        case 'title-asc':
          return a.title.localeCompare(b.title);
        case 'title-desc':
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });

  const departments = [...new Set(openPositions.map((p) => p.department))];
  const statuses = ['Open', 'Closing Soon', 'Closed'];

  return (
    <div className="flex min-h-screen w-full flex-col">
      <DashboardHeader title="Recruitment Management" subtitle="Manage your recruitment process" className="hidden md:flex">
         <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
        </Button>
      </DashboardHeader>
      <main className="flex-1 space-y-4 p-4 md:p-6">
        <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold tracking-tight">Recruitment Management</h1>
            <Button variant="ghost" size="icon">
                <Search className="h-6 w-6" />
            </Button>
        </div>
        <div className="flex flex-col gap-2 md:flex-row">
          <Select value={department} onValueChange={setDepartment}>
            <SelectTrigger>
              <SelectValue placeholder="Department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              {departments.map((dept) => (
                <SelectItem key={dept} value={dept}>
                  {dept}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              {statuses.map((stat) => (
                <SelectItem key={stat} value={stat}>
                  {stat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger>
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="posted-desc">Newest</SelectItem>
              <SelectItem value="posted-asc">Oldest</SelectItem>
              <SelectItem value="title-asc">Title (A-Z)</SelectItem>
              <SelectItem value="title-desc">Title (Z-A)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <h2 className="text-xl font-semibold">Open Positions</h2>

        <div className="grid gap-4">
          {filteredAndSortedPositions.map((position) => (
             <Link href={`/dashboard/recruitment/${position.id}`} key={position.id}>
              <Card
                className="transition-colors hover:bg-card/90"
              >
                <CardContent className="flex items-center gap-4 p-4">
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-lg font-semibold text-foreground">{position.title}</p>
                      <Badge
                          variant={getStatusBadgeVariant(position.status)}
                          className={cn(position.status === 'Open' ? 'bg-green-500/20 text-green-700 border-green-500/20' : position.status === 'Closing Soon' ? 'bg-yellow-500/20 text-yellow-700 border-yellow-500/20' : '')}
                      >
                          {position.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{position.department}</p>
                    <p className="text-sm text-muted-foreground">Posted: {new Date(position.postedDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric'})}</p>
                    <div className="flex items-center gap-4 pt-2 text-sm text-primary">
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{position.applications} Applications</span>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{position.daysLeft} days left</span>
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        
        <Card className="bg-card/50">
            <CardHeader>
                <CardTitle>Applications Summary</CardTitle>
            </CardHeader>
            <CardContent>
                <p>Total active applications: 73</p>
                <p className='text-sm text-muted-foreground'>New applications today: 5</p>
            </CardContent>
            <CardFooter>
                 <Link href="/dashboard/recruitment/new">
                    <Button className="w-full md:w-auto">
                        <Plus className="mr-2 h-4 w-4" />
                        Add New Job
                    </Button>
                </Link>
            </CardFooter>
        </Card>

      </main>
    </div>
  );
}
