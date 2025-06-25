'use server';
/**
 * @fileOverview Generates a sticker image based on a text prompt.
 *
 * - generateSticker - A function that generates a sticker from a prompt.
 * - GenerateStickerInput - The input type for the generateSticker function.
 * - GenerateStickerOutput - The return type for the generateSticker function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateStickerInputSchema = z.object({
  prompt: z
    .string()
    .describe('A text description of the sticker to generate.'),
});
export type GenerateStickerInput = z.infer<typeof GenerateStickerInputSchema>;

const GenerateStickerOutputSchema = z.object({
  stickerDataUri: z
    .string()
    .describe('The generated sticker image as a data URI.'),
});
export type GenerateStickerOutput = z.infer<typeof GenerateStickerOutputSchema>;

const generateStickerFlow = ai.defineFlow(
  {
    name: 'generateStickerFlow',
    inputSchema: GenerateStickerInputSchema,
    outputSchema: GenerateStickerOutputSchema,
  },
  async (input) => {
    const {media} = await ai.generate({
      model: 'googleai/gemini-2.0-flash-preview-image-generation',
      prompt: `A cute, cartoon-style sticker with a thick die-cut border. The sticker should be of: ${input.prompt}`,
      config: {
        responseModalities: ['TEXT', 'IMAGE'],
      },
    });

    const stickerDataUri = media?.url;

    if (!stickerDataUri) {
      throw new Error('Image generation failed to produce an image.');
    }

    return { stickerDataUri };
  }
);


export async function generateSticker(input: GenerateStickerInput): Promise<GenerateStickerOutput> {
  return generateStickerFlow(input);
}
