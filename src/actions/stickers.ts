'use server';

import {
  generateSticker,
  type GenerateStickerInput,
  type GenerateStickerOutput,
} from '@/ai/flows/generate-sticker-flow';

type ServerActionResult = {success: true; data: GenerateStickerOutput} | {success: false; error: string};

export async function generateStickerAction(input: GenerateStickerInput): Promise<ServerActionResult> {
  try {
    const result = await generateSticker(input);
    return {success: true, data: result};
  } catch (e) {
    console.error(e);
    const error = e instanceof Error ? e.message : 'An unknown error occurred.';
    return {success: false, error: `Failed to generate sticker: ${error}`};
  }
}
