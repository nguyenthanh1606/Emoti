"use client";

import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { emojiCategories, allEmojis } from '@/lib/emoji-data';
import { useToast } from "@/hooks/use-toast";

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
    if (!searchQuery) return [];
    return allEmojis.filter(emoji => emoji.includes(searchQuery));
  }, [searchQuery]);

  return (
    <Card className="h-full shadow-lg">
      <CardHeader>
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
      <CardContent>
        <Tabs defaultValue="joy" className="w-full">
          <TabsList className="grid w-full grid-cols-3 md:grid-cols-5 h-auto flex-wrap">
            {Object.entries(emojiCategories).map(([key, { name, icon: Icon }]) => (
              <TabsTrigger key={key} value={key} className="flex flex-col md:flex-row gap-2 h-auto py-2">
                <Icon className="h-5 w-5" />
                <span>{name}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {searchQuery ? (
            <div className="mt-4">
                <h3 className="font-headline text-lg mb-2">Search Results</h3>
                <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-2">
                    {filteredEmojis.map((emoji) => (
                        <button
                            key={emoji}
                            onClick={() => handleEmojiClick(emoji)}
                            className="text-4xl p-2 rounded-lg hover:bg-accent/20 transition-all duration-200 ease-in-out hover:scale-125 focus:outline-none focus:ring-2 focus:ring-accent"
                            aria-label={`Copy emoji ${emoji}`}
                        >
                            {emoji}
                        </button>
                    ))}
                </div>
                {filteredEmojis.length === 0 && <p className="text-muted-foreground">No emojis found.</p>}
            </div>
          ) : (
            <>
              {Object.entries(emojiCategories).map(([key, { emojis }]) => (
                <TabsContent key={key} value={key} className="mt-4">
                  <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-2">
                    {emojis.map((emoji) => (
                      <button
                        key={emoji}
                        onClick={() => handleEmojiClick(emoji)}
                        className="text-4xl p-2 rounded-lg hover:bg-accent/20 transition-all duration-200 ease-in-out hover:scale-125 focus:outline-none focus:ring-2 focus:ring-accent"
                        aria-label={`Copy emoji ${emoji}`}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </>
          )}
        </Tabs>
      </CardContent>
    </Card>
  );
}
