'use server';

/**
 * @fileOverview Generates an emoji story sequence based on keywords.
 *
 * - generateEmojiStory - A function that generates an emoji story from keywords.
 * - GenerateEmojiStoryInput - The input type for the generateEmojiStory function.
 * - GenerateEmojiStoryOutput - The return type for the generateEmojiStory function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateEmojiStoryInputSchema = z.object({
  keywords: z
    .string()
    .describe('Keywords to base the emoji story on. Separate keywords with commas.'),
});
export type GenerateEmojiStoryInput = z.infer<typeof GenerateEmojiStoryInputSchema>;

const GenerateEmojiStoryOutputSchema = z.object({
  emojiStory: z
    .string()
    .describe('The generated emoji story sequence based on the input keywords.'),
});
export type GenerateEmojiStoryOutput = z.infer<typeof GenerateEmojiStoryOutputSchema>;

export async function generateEmojiStory(input: GenerateEmojiStoryInput): Promise<GenerateEmojiStoryOutput> {
  return generateEmojiStoryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateEmojiStoryPrompt',
  input: {schema: GenerateEmojiStoryInputSchema},
  output: {schema: GenerateEmojiStoryOutputSchema},
  prompt: `You are an emoji storyteller. Given a list of keywords, create a short story using only emojis.

Keywords: {{{keywords}}}

Emoji Story:`,
});

const generateEmojiStoryFlow = ai.defineFlow(
  {
    name: 'generateEmojiStoryFlow',
    inputSchema: GenerateEmojiStoryInputSchema,
    outputSchema: GenerateEmojiStoryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
