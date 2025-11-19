'use client';

import { useFormState } from 'react-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import DashboardHeader from '@/components/dashboard-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { suggestJobPostingPlatforms, JobPostingOptimizationOutput } from '@/ai/flows/job-posting-optimization';
import { Lightbulb, Loader2, Share2 } from 'lucide-react';

const formSchema = z.object({
  jobDescription: z.string().min(50, 'Job description must be at least 50 characters.'),
  location: z.string().min(2, 'Location is required.'),
});

type FormValues = z.infer<typeof formSchema>;

type SuggestionState = {
  result: JobPostingOptimizationOutput | null;
  error: string | null;
};

async function suggestPlatformsAction(prevState: SuggestionState, data: FormData): Promise<SuggestionState> {
  const jobDescription = data.get('jobDescription') as string;
  const location = data.get('location') as string;

  try {
    const result = await suggestJobPostingPlatforms({ jobDescription, location });
    return { result, error: null };
  } catch (error) {
    return { result: null, error: 'Failed to get suggestions. Please try again.' };
  }
}

const initialState: SuggestionState = {
  result: null,
  error: null,
};

export default function RecruitmentPage() {
  const [state, formAction] = useFormState(suggestPlatformsAction, initialState);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      jobDescription: '',
      location: '',
    },
  });

  const { isSubmitting } = form.formState;

  return (
    <div className="flex min-h-screen w-full flex-col">
      <DashboardHeader title="Recruitment" />
      <main className="flex-1 space-y-4 p-4 md:p-6">
        <div className="grid gap-6 lg:grid-cols-5">
          <Card className="lg:col-span-3">
            <Form {...form}>
              <form action={formAction}>
                <CardHeader>
                  <CardTitle>Job Posting Optimizer</CardTitle>
                  <CardDescription>
                    Enter job details to get AI-powered recommendations for the best posting platforms.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="jobDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Job Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="e.g., Seeking a proactive Senior React Developer with 5+ years of experience..."
                            className="min-h-[200px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., San Francisco, CA or Remote" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
                <CardFooter>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Lightbulb />
                        Get Suggestions
                      </>
                    )}
                  </Button>
                </CardFooter>
              </form>
            </Form>
          </Card>
          <div className="lg:col-span-2">
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle>Suggested Platforms</CardTitle>
                <CardDescription>
                  Here are the top platforms to reach your ideal candidates.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isSubmitting && (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                  </div>
                )}
                {state.error && <p className="text-destructive">{state.error}</p>}
                {state.result && state.result.suggestedPlatforms.length > 0 && (
                  <ul className="space-y-3">
                    {state.result.suggestedPlatforms.map((platform, index) => (
                      <li key={index} className="flex items-center justify-between rounded-md border p-3">
                        <div className="flex items-center gap-3">
                            <Share2 className="h-5 w-5 text-primary" />
                            <span className="font-medium">{platform}</span>
                        </div>
                        <Button variant="outline" size="sm">
                          Visit
                        </Button>
                      </li>
                    ))}
                  </ul>
                )}
                {!isSubmitting && !state.result && (
                     <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 p-8 text-center">
                        <Lightbulb className="mx-auto h-12 w-12 text-muted-foreground/50" />
                        <p className="mt-4 text-sm text-muted-foreground">Your platform suggestions will appear here.</p>
                    </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
