'use server';

/**
 * @fileOverview This file defines a Genkit flow for optimizing job postings by suggesting optimal platforms based on job description and location.
 *
 * - suggestJobPostingPlatforms - A function that suggests job posting platforms.
 * - JobPostingOptimizationInput - The input type for the suggestJobPostingPlatforms function.
 * - JobPostingOptimizationOutput - The return type for the suggestJobPostingPlatforms function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const JobPostingOptimizationInputSchema = z.object({
  jobDescription: z
    .string()
    .describe('Detailed description of the job, including responsibilities, required skills, and qualifications.'),
  location: z.string().describe('The location where the job is based.'),
});
export type JobPostingOptimizationInput = z.infer<typeof JobPostingOptimizationInputSchema>;

const JobPostingOptimizationOutputSchema = z.object({
  suggestedPlatforms: z
    .array(z.string())
    .describe('List of suggested job posting platforms optimized for the job description and location.'),
});
export type JobPostingOptimizationOutput = z.infer<typeof JobPostingOptimizationOutputSchema>;

export async function suggestJobPostingPlatforms(
  input: JobPostingOptimizationInput
): Promise<JobPostingOptimizationOutput> {
  return jobPostingOptimizationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'jobPostingOptimizationPrompt',
  input: {schema: JobPostingOptimizationInputSchema},
  output: {schema: JobPostingOptimizationOutputSchema},
  prompt: `You are an expert HR consultant specializing in job posting optimization.
  Given the job description and location, suggest the top job posting platforms to attract relevant applicants.
  Consider factors such as industry, job level, and geographical reach.

  Job Description: {{{jobDescription}}}
  Location: {{{location}}}

  Format your output as a list of suggested platforms.`,
});

const jobPostingOptimizationFlow = ai.defineFlow(
  {
    name: 'jobPostingOptimizationFlow',
    inputSchema: JobPostingOptimizationInputSchema,
    outputSchema: JobPostingOptimizationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
