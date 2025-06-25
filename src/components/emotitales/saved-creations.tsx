"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Trash2, FileText, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';
import { formatDistanceToNow } from 'date-fns';
import type { SavedItem } from '@/lib/types';
import { getSavedCreations, deleteCreation } from '@/lib/storage';

export function SavedCreations() {
    const [items, setItems] = useState<SavedItem[]>([]);

    useEffect(() => {
        const loadCreations = () => {
            setItems(getSavedCreations());
        };

        loadCreations();

        window.addEventListener('creationsUpdated', loadCreations);
        return () => {
            window.removeEventListener('creationsUpdated', loadCreations);
        };
    }, []);
    
    const handleDelete = (id: string) => {
        deleteCreation(id);
    };

    return (
        <Card className="shadow-lg">
            <CardHeader>
                <CardTitle className="font-headline text-2xl">Saved Creations</CardTitle>
                <CardDescription>Your saved emoji tales and stickers.</CardDescription>
            </CardHeader>
            <CardContent>
                {items.length === 0 ? (
                    <div className="text-center py-10">
                        <p className="text-muted-foreground">You haven't saved anything yet.</p>
                        <p className="text-sm text-muted-foreground">Generate something and click the save button!</p>
                    </div>
                ) : (
                    <ScrollArea className="h-[24rem]">
                        <div className="space-y-4 pr-4">
                            {items.map((item) => (
                                <div key={item.id} className="flex items-center gap-4 p-2 rounded-lg border bg-card hover:bg-muted/50 transition-colors">
                                    <div className="flex-shrink-0">
                                        {item.type === 'sticker' ? (
                                            <div className="w-16 h-16 rounded-md bg-white/10 p-1 flex items-center justify-center">
                                                <Image src={item.content} alt="Saved Sticker" width={64} height={64} className="rounded-md object-contain" />
                                            </div>
                                        ) : (
                                            <div className="w-16 h-16 flex items-center justify-center bg-muted rounded-md" title={item.content}>
                                                <p className="text-3xl">{item.content.slice(0, 4)}</p>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-grow min-w-0">
                                        {item.type === 'sticker' ? (
                                            <p className="text-sm font-medium flex items-center gap-2"><ImageIcon className="h-4 w-4 text-primary" /> Sticker</p>
                                        ) : (
                                            <p className="text-lg truncate font-mono">{item.content}</p>
                                        )}
                                        <p className="text-xs text-muted-foreground">
                                            Saved {formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}
                                        </p>
                                    </div>
                                    <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id)} className="flex-shrink-0 text-muted-foreground hover:text-destructive">
                                        <Trash2 className="h-4 w-4" />
                                        <span className="sr-only">Delete</span>
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                )}
            </CardContent>
        </Card>
    )
}
