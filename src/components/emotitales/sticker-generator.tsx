"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Image as ImageIcon, Loader2, Sparkles } from 'lucide-react';
import { CelebrationAnimation } from './celebration-animation';
import { generateStickerAction } from '@/actions/stickers';
import Image from 'next/image';

const formSchema = z.object({
  prompt: z.string().min(3, { message: 'Please enter at least 3 characters.' }).max(200, { message: 'Prompt cannot exceed 200 characters.' }),
});

export function StickerGenerator() {
  const [generatedSticker, setGeneratedSticker] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: '',
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setError(null);
    setGeneratedSticker(null);
    setShowCelebration(false);

    const result = await generateStickerAction(values);

    if (result.success) {
      setGeneratedSticker(result.data.stickerDataUri);
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 2000);
    } else {
      setError(result.error);
    }
  };

  return (
    <Card className="shadow-lg">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle className="font-headline text-2xl flex items-center gap-2">
              <Sparkles className="text-primary" />
              Sticker Studio
            </CardTitle>
            <CardDescription>Describe a sticker you want to create with AI. (e.g., "a happy avocado")</CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="prompt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sticker Prompt</FormLabel>
                  <FormControl>
                    <Textarea placeholder="A cute kitten playing with yarn 🧶" {...field} />
                  </FormControl>
                  <FormDescription>
                    Try copying an emoji from the explorer to use in your prompt!
                  </FormDescription>
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
                  Creating...
                </>
              ) : (
                <>
                  <ImageIcon className="mr-2 h-4 w-4" />
                  Generate Sticker
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Form>
      
      {(isSubmitting || generatedSticker || error) && (
        <div className="p-6 pt-0">
          <Card className="bg-background/80 relative aspect-square">
            {showCelebration && <CelebrationAnimation />}
            <CardContent className="h-full flex items-center justify-center p-2">
              {isSubmitting && <Loader2 className="h-8 w-8 animate-spin text-primary" />}
              {error && <p className="text-destructive text-center">{error}</p>}
              {generatedSticker && (
                <Image 
                  src={generatedSticker} 
                  alt="Generated Sticker" 
                  width={400} 
                  height={400} 
                  className="rounded-lg object-contain"
                />
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </Card>
  );
}
