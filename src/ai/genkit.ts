import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';

export const ai = genkit({
  plugins: [
    googleAI({
      // Supported models: https://ai.google.dev/gemini-api/docs/models/gemini
      // We recommend using a `latest` model as that will automatically be
      // updated to point to the latest stable version.
      model: 'gemini-1.5-flash-latest',
      output: {
        format: 'json',
      },
    }),
  ],
});
