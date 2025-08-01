"use client";

import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { emojiCategories, allEmojis, type Emoji } from '@/lib/emoji-data';
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from '@/components/ui/scroll-area';

function EmojiButton({ emoji, onEmojiClick }: { emoji: Emoji, onEmojiClick: (emoji: string) => void }) {
    return (
        <button
            onClick={() => onEmojiClick(emoji.emoji)}
            className="text-4xl p-2 rounded-lg hover:bg-accent/20 transition-all duration-200 ease-in-out hover:scale-125 focus:outline-none focus:ring-2 focus:ring-accent"
            aria-label={`Copy emoji ${emoji.description}`}
            title={emoji.description}
        >
            {emoji.emoji}
        </button>
    )
}

function EmojiGrid({ emojis, onEmojiClick }: { emojis: Emoji[], onEmojiClick: (emoji: string) => void }) {
    return (
        <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-2 p-1">
            {emojis.map((emoji) => (
                <EmojiButton key={emoji.emoji} emoji={emoji} onEmojiClick={onEmojiClick} />
            ))}
        </div>
    )
}

export function EmojiBrowser() {
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();

  const handleEmojiClick = (emoji: string) => {
    navigator.clipboard.writeText(emoji);
    toast({
      title: "Copied to clipboard!",
      description: (
        <span className="text-3xl" aria-label="emoji">{emoji}</span>
      ),
    });
  };

  const filteredEmojis = useMemo(() => {
    if (!searchQuery) return null;
    const lowerCaseQuery = searchQuery.toLowerCase().trim();
    if (!lowerCaseQuery) return null;
    return allEmojis.filter(emoji => 
      emoji.description.toLowerCase().includes(lowerCaseQuery) ||
      emoji.emoji.includes(lowerCaseQuery)
    );
  }, [searchQuery]);

  return (
    <Card className="shadow-lg flex flex-col h-[calc(100vh-12rem)]">
      <CardHeader className="flex-shrink-0">
        <CardTitle className="font-headline text-2xl">Emoji Explorer</CardTitle>
        <div className="relative mt-2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search for an emoji..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </CardHeader>
      
      <CardContent className="flex-grow flex flex-col overflow-y-hidden pt-0">
        {filteredEmojis ? (
            <div className="mt-4 flex-grow flex flex-col overflow-y-hidden">
                <h3 className="font-headline text-lg mb-2 flex-shrink-0">Search Results for "{searchQuery}"</h3>
                 {filteredEmojis.length > 0 ? (
                    <ScrollArea className="flex-grow">
                        <EmojiGrid emojis={filteredEmojis} onEmojiClick={handleEmojiClick} />
                    </ScrollArea>
                ) : (
                    <p className="text-muted-foreground">No emojis found.</p>
                )}
            </div>
        ) : (
            <Tabs defaultValue="joy" className="w-full flex flex-col flex-grow overflow-y-hidden">
                <TabsList className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 h-auto flex-shrink-0">
                    {Object.entries(emojiCategories).map(([key, { name, icon: Icon }]) => (
                    <TabsTrigger key={key} value={key} className="flex flex-col md:flex-row gap-2 h-auto py-2">
                        <Icon className="h-5 w-5" />
                        <span>{name}</span>
                    </TabsTrigger>
                    ))}
                </TabsList>

                <div className="flex-grow mt-4 overflow-y-hidden">
                  {Object.entries(emojiCategories).map(([key, { emojis }]) => (
                      <TabsContent key={key} value={key} className="m-0 h-full">
                          <ScrollArea className="h-full">
                              <EmojiGrid emojis={emojis} onEmojiClick={handleEmojiClick} />
                          </ScrollArea>
                      </TabsContent>
                  ))}
                </div>
            </Tabs>
        )}
      </CardContent>
    </Card>
  );
}
