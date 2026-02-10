'use server';

import {
  generateViolationSummary,
  type GenerateViolationSummaryInput,
  type GenerateViolationSummaryOutput,
} from '@/ai/flows/generate-violation-summary';

export async function handleGenerateSummary(
  input: GenerateViolationSummaryInput
): Promise<GenerateViolationSummaryOutput> {
  if (input.violations.length === 0) {
    return { summary: "No violations were provided to summarize." };
  }
  
  try {
    const output = await generateViolationSummary(input);
    return output;
  } catch (error) {
    console.error("Error generating violation summary:", error);
    return { summary: "Failed to generate summary due to an internal error." };
  }
}
