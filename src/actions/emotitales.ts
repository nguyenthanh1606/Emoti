'use server';

import {
  generateEmojiStory,
  type GenerateEmojiStoryInput,
  type GenerateEmojiStoryOutput,
} from '@/ai/flows/generate-emoji-story';

type ServerActionResult = {success: true; data: GenerateEmojiStoryOutput} | {success: false; error: string};

export async function generateEmojiStoryAction(input: GenerateEmojiStoryInput): Promise<ServerActionResult> {
  try {
    const result = await generateEmojiStory(input);
    return {success: true, data: result};
  } catch (e) {
    console.error(e);
    const error = e instanceof Error ? e.message : 'An unknown error occurred.';
    return {success: false, error: `Failed to generate story: ${error}`};
  }
}
