import { EmojiGenerator } from '@/components/emotitales/emoji-generator';
import { EmojiBrowser } from '@/components/emotitales/emoji-browser';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="py-6 px-4 md:px-8">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-headline text-primary">EmotiTales</h1>
          <p className="mt-2 text-lg text-muted-foreground">Craft stories with the universal language of emojis.</p>
        </div>
      </header>

      <main className="flex-grow container mx-auto p-4 md:px-8 md:pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          <div className="lg:col-span-2 lg:sticky lg:top-8">
            <EmojiGenerator />
          </div>
          <div className="lg:col-span-3">
            <EmojiBrowser />
          </div>
        </div>
      </main>

      <footer className="text-center p-4 text-sm text-muted-foreground">
        <p>Created with 💖 for telling tiny tales.</p>
      </footer>
    </div>
  );
}
