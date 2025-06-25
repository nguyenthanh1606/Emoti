"use client";

import { Star } from 'lucide-react';
import { useEffect, useState } from 'react';

export function CelebrationAnimation() {
    const [stars, setStars] = useState<Array<{ id: number; style: React.CSSProperties }>>([]);

    useEffect(() => {
        setStars(
            Array.from({ length: 15 }).map((_, i) => ({
                id: i,
                style: {
                    '--tx': `${Math.random() * 400 - 200}px`,
                    '--ty': `${Math.random() * 300 - 150}px`,
                    top: `${Math.random() * 80 + 10}%`,
                    left: `${Math.random() * 80 + 10}%`,
                    animationDelay: `${Math.random() * 0.5}s`,
                    animationDuration: `${Math.random() * 1 + 0.8}s`
                } as React.CSSProperties,
            }))
        );
    }, []);

    if (stars.length === 0) {
        return null;
    }

    return (
        <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
            {stars.map((star) => (
                <Star
                    key={star.id}
                    className="absolute text-accent animate-shoot-star fill-accent"
                    style={star.style}
                    size={16 + Math.random() * 16}
                />
            ))}
        </div>
    );
}
