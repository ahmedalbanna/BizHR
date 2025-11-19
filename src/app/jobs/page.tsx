
'use client';
import { Header } from '@/components/landing/header';
import { openPositions } from '@/lib/data';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Briefcase } from 'lucide-react';

export default function JobsPage() {
  const openJobs = openPositions.filter(p => p.status === 'Open' || p.status === 'Closing Soon');
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="space-y-4 text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Join Our Team</h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                We're looking for talented individuals to help us build the future of HR technology. Explore our open positions below.
              </p>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-1">
              {openJobs.map((job) => (
                <Card key={job.id}>
                  <CardContent className="p-6">
                    <div className="grid gap-4 md:grid-cols-[1fr_200px]">
                      <div className="grid gap-2">
                        <h3 className="text-xl font-bold">{job.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Briefcase className="h-4 w-4" />
                            <span>{job.department}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            <span>Remote</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary">Full-Time</Badge>
                          <Badge variant={job.status === 'Open' ? 'default' : 'secondary'}>{job.status}</Badge>
                        </div>
                      </div>
                      <div className="flex flex-col items-start gap-4 md:items-end">
                        <Link href={`/jobs/${job.id}/apply`} className="w-full md:w-auto">
                          <Button className="w-full">Apply Now</Button>
                        </Link>
                        <div className="text-sm text-muted-foreground">
                          Posted on {new Date(job.postedDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="flex items-center justify-center p-6 md:p-8 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2024 BizHR. All rights reserved.</p>
      </footer>
    </div>
  );
}
