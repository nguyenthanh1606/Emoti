"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Wand2, Loader2, Save } from 'lucide-react';
import { CelebrationAnimation } from './celebration-animation';
import { generateEmojiStoryAction } from '@/actions/emotitales';
import { saveCreation } from '@/lib/storage';

const formSchema = z.object({
  keywords: z.string().min(3, { message: 'Please enter at least 3 characters of keywords.' }).max(100, { message: 'Keywords cannot exceed 100 characters.' }),
});

export function EmojiGenerator() {
  const [generatedStory, setGeneratedStory] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      keywords: '',
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setError(null);
    setGeneratedStory(null);
    setShowCelebration(false);
    setIsSaved(false);

    const result = await generateEmojiStoryAction(values);

    if (result.success) {
      setGeneratedStory(result.data.emojiStory);
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 2000);
    } else {
      setError(result.error);
    }
  };

  const handleSave = () => {
    if (generatedStory) {
      saveCreation('emoji', generatedStory);
      setIsSaved(true);
    }
  };

  return (
    <Card className="shadow-lg">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle className="font-headline text-2xl flex items-center gap-2">
              <Wand2 className="text-primary" />
              Story Generator
            </CardTitle>
            <CardDescription>Enter some keywords (e.g., "cat, moon, sleep") to create an emoji story.</CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="keywords"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Keywords</FormLabel>
                  <FormControl>
                    <Textarea placeholder="A funny dog, a sunny day, a park..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isSubmitting} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Wand2 className="mr-2 h-4 w-4" />
                  Create My Emoji Tale
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Form>
      
      {(isSubmitting || generatedStory || error) && (
        <div className="p-6 pt-0">
          <Card className="bg-background/80 relative">
            {showCelebration && <CelebrationAnimation />}
            <CardHeader>
              <CardTitle className="font-headline text-xl">Your Emoji Tale</CardTitle>
            </CardHeader>
            <CardContent className="min-h-[6rem] flex items-center justify-center">
              {isSubmitting && <Loader2 className="h-8 w-8 animate-spin text-primary" />}
              {error && <p className="text-destructive text-center">{error}</p>}
              {generatedStory && <p className="text-4xl md:text-5xl text-center break-words">{generatedStory}</p>}
            </CardContent>
            {generatedStory && (
              <CardFooter className="justify-end">
                <Button
                  size="sm"
                  variant="ghost"
                  disabled={isSaved}
                  onClick={handleSave}
                >
                  <Save className="mr-2 h-4 w-4" />
                  {isSaved ? 'Saved!' : 'Save Tale'}
                </Button>
              </CardFooter>
            )}
          </Card>
        </div>
      )}
    </Card>
  );
}
