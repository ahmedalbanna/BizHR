'use client';

import { useParams, useRouter } from 'next/navigation';
import { openPositions } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  ArrowLeft,
  Pencil,
  Briefcase,
  MapPin,
  DollarSign,
  X,
  ArrowRight,
} from 'lucide-react';

const InfoRow = ({
  label,
  value,
  valueClass,
}: {
  label: string;
  value: string;
  valueClass?: string;
}) => (
  <div className="flex justify-between py-2 text-sm">
    <span className="text-muted-foreground">{label}</span>
    <span className={`font-medium text-right ${valueClass}`}>{value}</span>
  </div>
);

export default function JobDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const job = openPositions.find((p) => p.id === id);

  if (!job) {
    return (
      <div className="flex h-screen items-center justify-center">
        Job not found
      </div>
    );
  }

  const { title, department, postedDate, applications } = job;
  const applicationDeadline = new Date(postedDate);
  applicationDeadline.setDate(applicationDeadline.getDate() + 30);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-10 flex items-center justify-between bg-primary p-4 text-primary-foreground">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft />
        </Button>
        <h1 className="text-xl font-semibold">Job Details</h1>
        <Button variant="ghost" size="icon">
          <Pencil />
        </Button>
      </header>

      <main className="space-y-6 p-4">
        <Card>
          <CardContent className="p-4 space-y-4">
            <div className="flex justify-between items-start">
                <div>
                    <h2 className="text-2xl font-bold">{title}</h2>
                    <p className="text-primary">{department}</p>
                </div>
                <Button variant="outline" size="icon" className="bg-primary/10 border-0">
                    <Briefcase className="h-6 w-6 text-primary" />
                </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="bg-blue-500/20 text-blue-400 border-blue-500/20">Full-Time</Badge>
              <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/20">Remote</Badge>
            </div>
            <div className="flex items-center gap-4 text-muted-foreground text-sm">
                <div className="flex items-center gap-1.5">
                    <MapPin className="h-4 w-4" />
                    <span>San Francisco, CA</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <DollarSign className="h-4 w-4" />
                    <span>$120K - $150K</span>
                </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-2">
            <h3 className="text-lg font-semibold">Job Information</h3>
            <Card>
                <CardContent className="p-4">
                    <InfoRow label="Posted Date" value={new Date(postedDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} />
                    <InfoRow label="Application Deadline" value={applicationDeadline.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} valueClass="text-red-400" />
                    <InfoRow label="Job ID" value={`ENG-${new Date(postedDate).getFullYear()}-${id.replace('OP','')}`} />
                    <InfoRow label="Experience Level" value="Senior (5+ years)" />
                </CardContent>
            </Card>
        </div>

        <div className="space-y-2">
            <h3 className="text-lg font-semibold">Job Description</h3>
            <Card>
                <CardContent className="p-4 text-sm space-y-4 text-muted-foreground">
                    <p>We are seeking a talented Senior Software Engineer to join our dynamic engineering team. The ideal candidate will have extensive experience in full-stack development and a passion for building scalable, high-performance applications.</p>
                    <div>
                        <h4 className="font-semibold text-foreground mb-2">Key Responsibilities:</h4>
                        <ul className="list-disc list-inside space-y-1">
                            <li>Design and develop robust, scalable web applications</li>
                            <li>Collaborate with cross-functional teams to define and design new features</li>
                            <li>Write clean, maintainable, and efficient code</li>
                            <li>Troubleshoot and debug applications</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-foreground mb-2">Required Qualifications:</h4>
                        <ul className="list-disc list-inside space-y-1">
                            <li>Bachelor's degree in Computer Science or related field</li>
                            <li>5+ years of professional software development experience</li>
                            <li>Proficiency in JavaScript/TypeScript, React, and Node.js</li>
                            <li>Experience with cloud platforms (AWS, GCP, or Azure)</li>
                        </ul>
                    </div>
                </CardContent>
            </Card>
        </div>

        <div className="space-y-2">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Applications</h3>
                <Badge variant="default">{applications} Applications</Badge>
            </div>
            <Card>
                <CardContent className="p-4">
                    <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                            <p className="text-3xl font-bold text-primary">23</p>
                            <p className="text-xs text-muted-foreground">New</p>
                        </div>
                        <div>
                            <p className="text-3xl font-bold">15</p>
                            <p className="text-xs text-muted-foreground">In Review</p>
                        </div>
                        <div>
                            <p className="text-3xl font-bold">9</p>
                            <p className="text-xs text-muted-foreground">Shortlisted</p>
                        </div>
                    </div>
                    <Button className="w-full mt-4">
                        View All Applications <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </CardContent>
            </Card>
        </div>

        <div className="grid grid-cols-2 gap-4">
            <Button>
                <Pencil className="mr-2 h-4 w-4" /> Edit Job
            </Button>
            <Button variant="destructive">
                <X className="mr-2 h-4 w-4" /> Close Job
            </Button>
        </div>

      </main>
    </div>
  );
}
