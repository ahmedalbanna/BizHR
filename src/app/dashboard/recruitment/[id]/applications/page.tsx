'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { applications } from '@/lib/data';
import type { Application } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowLeft, Search, Check, MessageSquare, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';

type Status = Application['status'];

const statusFilters: {
  label: string;
  value: Status | 'All';
  count: number;
}[] = [
  { label: 'Pending', value: 'Pending', count: 23 },
  { label: 'Reviewed', value: 'Reviewed', count: 15 },
  { label: 'Interviewed', value: 'Interviewed', count: 9 },
];

function getStatusColor(status: Status) {
  switch (status) {
    case 'Received':
      return 'text-blue-400';
    case 'Reviewed':
      return 'text-yellow-400';
    case 'Interviewed':
      return 'text-green-400';
    case 'Pending':
      return 'text-gray-400';
  }
}

export default function ApplicationsPage() {
  const router = useRouter();
  const params = useParams();
  const { id: jobId } = params;

  const [activeFilter, setActiveFilter] = useState<Status | 'All'>('Pending');

  const jobApplicants = applications.filter((app) => app.jobId === 'OP01'); // using OP01 for now

  const filteredApplicants =
    activeFilter === 'All'
      ? jobApplicants
      : jobApplicants.filter((app) => app.status === activeFilter || (activeFilter === 'Pending' && app.status === 'Received'));


  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-10 flex items-center justify-between bg-primary p-4 text-primary-foreground">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft />
        </Button>
        <h1 className="text-xl font-semibold">Applications</h1>
        <Button variant="ghost" size="icon">
          <Search />
        </Button>
      </header>

      <main className="p-4 space-y-4">
        <div className="flex gap-2">
          {statusFilters.map((filter) => (
            <Button
              key={filter.value}
              variant={activeFilter === filter.value ? 'default' : 'secondary'}
              className={cn("flex-1", activeFilter === filter.value && "bg-primary-foreground text-primary hover:bg-primary-foreground/90")}
              onClick={() => setActiveFilter(filter.value as Status)}
            >
              {activeFilter === filter.value && <Check className="mr-2 h-4 w-4" />}
              {filter.label} ({filter.count})
            </Button>
          ))}
        </div>

        <div className="grid gap-3">
          {filteredApplicants.map((applicant) => (
            <Card key={applicant.id}>
              <CardContent className="flex items-center gap-4 p-3">
                <Avatar className="h-12 w-12 border">
                  <AvatarImage src={applicant.avatar} alt={applicant.name} />
                  <AvatarFallback>{applicant.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-semibold">{applicant.name}</p>
                  <p className="text-sm text-primary">{applicant.role}</p>
                  <p className="text-xs text-muted-foreground">
                    Applied: {applicant.appliedDate}
                  </p>
                  <p className={cn("text-xs font-semibold mt-1", getStatusColor(applicant.status))}>{applicant.status}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <Button variant="outline" size="icon" className="h-9 w-9 bg-primary/10 border-0 text-primary">
                    <MessageSquare className="h-5 w-5" />
                  </Button>
                  <Button variant="outline" size="icon" className="h-9 w-9 bg-green-500/20 border-0 text-green-400">
                    <Phone className="h-5 w-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}