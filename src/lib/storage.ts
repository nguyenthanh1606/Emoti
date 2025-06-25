'use client';

import type { SavedItem } from './types';

const STORAGE_KEY = 'emotitales-creations';

export function getSavedCreations(): SavedItem[] {
  if (typeof window === 'undefined') {
    return [];
  }
  const storedItems = localStorage.getItem(STORAGE_KEY);
  try {
    return storedItems ? JSON.parse(storedItems) : [];
  } catch (error) {
    console.error("Failed to parse saved creations from localStorage", error);
    return [];
  }
}

export function saveCreation(type: 'emoji' | 'sticker', content: string): void {
  const newItem: SavedItem = {
    id: new Date().toISOString() + Math.random(),
    type,
    content,
    createdAt: new Date().toISOString(),
  };

  const items = getSavedCreations();
  const updatedItems = [newItem, ...items];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedItems));
  window.dispatchEvent(new CustomEvent('creationsUpdated'));
}

export function deleteCreation(id: string): void {
  const items = getSavedCreations();
  const updatedItems = items.filter((item) => item.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedItems));
  window.dispatchEvent(new CustomEvent('creationsUpdated'));
}
