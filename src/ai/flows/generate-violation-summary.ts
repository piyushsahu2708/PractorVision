'use server';

/**
 * @fileOverview Summarizes violations detected during an interview.
 *
 * - generateViolationSummary - A function that summarizes interview violations.
 * - GenerateViolationSummaryInput - The input type for the generateViolationSummary function.
 * - GenerateViolationSummaryOutput - The return type for the generateViolationSummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateViolationSummaryInputSchema = z.object({
  candidateName: z.string().describe('The name of the candidate being interviewed.'),
  jobTitle: z.string().describe('The job title for which the candidate is being interviewed.'),
  violations: z.array(z.string()).describe('A list of violations detected during the interview.'),
});
export type GenerateViolationSummaryInput = z.infer<typeof GenerateViolationSummaryInputSchema>;

const GenerateViolationSummaryOutputSchema = z.object({
  summary: z.string().describe('A summarized report of violations detected during the interview.'),
});
export type GenerateViolationSummaryOutput = z.infer<typeof GenerateViolationSummaryOutputSchema>;

export async function generateViolationSummary(input: GenerateViolationSummaryInput): Promise<GenerateViolationSummaryOutput> {
  return generateViolationSummaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateViolationSummaryPrompt',
  input: {schema: GenerateViolationSummaryInputSchema},
  output: {schema: GenerateViolationSummaryOutputSchema},
  prompt: `You are an AI assistant that generates a summary of violations detected during an interview.

  You will receive the candidate name, job title, and a list of violations.
  Your task is to create a concise summary of these violations, highlighting the key concerns for the recruiter.

  Candidate Name: {{{candidateName}}}
  Job Title: {{{jobTitle}}}
  Violations: {{#each violations}}{{{this}}}\n{{/each}}

  Summary:`,
});

const generateViolationSummaryFlow = ai.defineFlow(
  {
    name: 'generateViolationSummaryFlow',
    inputSchema: GenerateViolationSummaryInputSchema,
    outputSchema: GenerateViolationSummaryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
