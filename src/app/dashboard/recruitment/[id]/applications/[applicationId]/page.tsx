'use client';

import { useParams, useRouter } from 'next/navigation';
import { applications } from '@/lib/data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  ArrowLeft,
  Mail,
  Phone,
  MessageSquare,
  FileText,
  UserCheck,
  UserX,
  Download,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import type { Application } from '@/lib/types';


function getStatusColor(status: Application['status']) {
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

export default function ApplicationDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const { applicationId } = params;

  const applicant = applications.find((app) => app.id === applicationId);

  if (!applicant) {
    return (
      <div className="flex h-screen items-center justify-center">
        Application not found
      </div>
    );
  }

  const { name, avatar, role, appliedDate, status } = applicant;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-10 flex items-center justify-between bg-primary p-4 text-primary-foreground">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft />
        </Button>
        <h1 className="text-xl font-semibold">Application Details</h1>
        <div className="w-9"></div>
      </header>

      <main className="p-4 space-y-6">
        <div className="flex flex-col items-center text-center">
          <Avatar className="h-32 w-32 border-4 border-background -mt-20 shadow-lg">
            <AvatarImage src={avatar} alt={name} />
            <AvatarFallback>{name.charAt(0)}</AvatarFallback>
          </Avatar>
          <h2 className="mt-4 text-2xl font-bold">{name}</h2>
          <p className="text-primary">{role}</p>
          <p className="text-sm text-muted-foreground">Applied on {appliedDate}</p>
          <Badge className={cn("mt-2", getStatusColor(status))}>{status}</Badge>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline">
            <Mail className="mr-2 h-4 w-4" /> Email
          </Button>
          <Button variant="outline">
            <Phone className="mr-2 h-4 w-4" /> Call
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Documents</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
             <div className="flex items-center justify-between rounded-md border p-3">
              <div className="flex items-center gap-3">
                <FileText className="h-6 w-6 text-primary" />
                <div>
                  <p className="font-semibold">Resume.pdf</p>
                  <p className="text-xs text-muted-foreground">1.2 MB</p>
                </div>
              </div>
              <Button variant="ghost" size="icon">
                <Download className="h-5 w-5" />
              </Button>
            </div>
             <div className="flex items-center justify-between rounded-md border p-3">
              <div className="flex items-center gap-3">
                <FileText className="h-6 w-6 text-primary" />
                <div>
                  <p className="font-semibold">Cover_Letter.pdf</p>
                  <p className="text-xs text-muted-foreground">0.8 MB</p>
                </div>
              </div>
              <Button variant="ghost" size="icon">
                <Download className="h-5 w-5" />
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
            <CardHeader>
                <CardTitle>Application Notes</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground">No notes added yet.</p>
                <Button variant="link" className="p-0 h-auto mt-2">Add Note</Button>
            </CardContent>
        </Card>

        <div className="space-y-2">
            <h3 className="text-lg font-semibold">Actions</h3>
            <div className="grid grid-cols-2 gap-4">
                 <Button variant="default" className="bg-green-600 hover:bg-green-700">
                    <UserCheck className="mr-2 h-4 w-4" />
                    Shortlist
                </Button>
                <Button variant="destructive">
                    <UserX className="mr-2 h-4 w-4" />
                    Reject
                </Button>
            </div>
        </div>

      </main>
    </div>
  );
}
