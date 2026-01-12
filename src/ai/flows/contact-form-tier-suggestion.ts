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
  suggestedTier: z.string().describe('The suggested service tier based on the project details. Must be one of: "Básico", "Estándar", "Premium".'),
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
  prompt: `You are an expert AI assistant that suggests the most appropriate service tier for a new client based on their project description.

The available tiers are: "Básico", "Estándar", and "Premium".

Analyze the user's message below. Based on the complexity, scope, and features requested, determine the best-fitting tier.

Your response MUST be a valid JSON object matching this structure: { "suggestedTier": "string", "reason": "string" }.

- The 'suggestedTier' field must be one of "Básico", "Estándar", or "Premium".
- The 'reason' field must explain why you chose that tier.
- If the message is unclear or doesn't provide enough information, default to the "Básico" tier and explain that more details are needed for a more accurate suggestion.

User Message:
{{{message}}}
`,
});

const suggestTierFlow = ai.defineFlow(
  {
    name: 'suggestTierFlow',
    inputSchema: SuggestTierInputSchema,
    outputSchema: SuggestTierOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    if (!output) {
      throw new Error('Failed to get a suggestion from the AI.');
    }
    return output;
  }
);
