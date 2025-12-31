// ContactFormTierSuggestion.ts
'use server';

/**
 * @fileOverview A contact form tier suggestion AI agent.
 *
 * - suggestTier - A function that handles the tier suggestion process.
 * - SuggestTierInput - The input type for the suggestTier function.
 * - SuggestTierOutput - The return type for the suggestTier function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestTierInputSchema = z.object({
  message: z.string().describe('The message from the contact form containing project details.'),
});
export type SuggestTierInput = z.infer<typeof SuggestTierInputSchema>;

const SuggestTierOutputSchema = z.object({
  suggestedTier: z.string().describe('The suggested service tier based on the project details.'),
  reason: z.string().describe('The reasoning behind the suggested service tier.'),
});
export type SuggestTierOutput = z.infer<typeof SuggestTierOutputSchema>;

export async function suggestTier(input: SuggestTierInput): Promise<SuggestTierOutput> {
  return suggestTierFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestTierPrompt',
  input: {schema: SuggestTierInputSchema},
  output: {schema: SuggestTierOutputSchema},
  prompt: `You are an AI assistant that suggests the most appropriate service tier based on the user's project details provided in their message.\n\nAnalyze the following message and suggest a service tier (e.g., "Basic", "Standard", "Premium") that best fits their needs. Also, provide a brief reason for your suggestion.\n\nMessage: {{{message}}}`,
});

const suggestTierFlow = ai.defineFlow(
  {
    name: 'suggestTierFlow',
    inputSchema: SuggestTierInputSchema,
    outputSchema: SuggestTierOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
