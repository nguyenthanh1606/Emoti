import { EmojiGenerator } from '@/components/emotitales/emoji-generator';
import { EmojiBrowser } from '@/components/emotitales/emoji-browser';
import { StickerGenerator } from '@/components/emotitales/sticker-generator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Wand2, Sparkles } from 'lucide-react';
import { SavedCreations } from '@/components/emotitales/saved-creations';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="py-6 px-4 md:px-8">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-headline text-primary">EmotiTales</h1>
          <p className="mt-2 text-lg text-muted-foreground">Craft stories and stickers with the universal language of emojis and AI.</p>
        </div>
      </header>

      <main className="flex-grow container mx-auto p-4 md:px-8 md:pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          <div className="lg:col-span-2 lg:sticky lg:top-8">
            <Tabs defaultValue="stickers" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="stickers">
                  <Sparkles className="mr-2 h-4 w-4"/>
                  Sticker Studio
                </TabsTrigger>
                <TabsTrigger value="emojis">
                  <Wand2 className="mr-2 h-4 w-4" />
                  Emoji Tale
                </TabsTrigger>
              </TabsList>
              <TabsContent value="stickers" className="mt-4">
                <StickerGenerator />
              </TabsContent>
              <TabsContent value="emojis" className="mt-4">
                <EmojiGenerator />
              </TabsContent>
            </Tabs>
          </div>
          <div className="lg:col-span-3 space-y-8">
            <EmojiBrowser />
            <SavedCreations />
          </div>
        </div>
      </main>

      <footer className="text-center p-4 text-sm text-muted-foreground">
        <p>Created with 💖 for telling tiny tales.</p>
      </footer>
    </div>
  );
}
