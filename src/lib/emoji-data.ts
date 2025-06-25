import type { LucideIcon } from 'lucide-react';
import { Angry, Frown, Heart, Smile, Sparkles } from 'lucide-react';

export interface EmojiCategory {
  name: string;
  icon: LucideIcon;
  emojis: string[];
}

export const emojiCategories: Record<string, EmojiCategory> = {
  joy: {
    name: "Joy",
    icon: Smile,
    emojis: ["😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "😊", "😇", "🙂", "🙃", "😉", "😌", "😍", "🥰", "😘", "😗", "😙", "😚", "😋", "😛", "😜", "🤪", "😝", "🤗", "🥳", "🤩", "😎", "🤓"],
  },
  sadness: {
    name: "Sadness",
    icon: Frown,
    emojis: ["😟", "🙁", "☹️", "😮", "😯", "😲", "😳", "🥺", "😦", "😧", "😨", "😰", "😥", "😢", "😭", "😱", "😖", "😣", "😞", "😓", "😩", "😫", "🥱"],
  },
  anger: {
    name: "Anger",
    icon: Angry,
    emojis: ["😠", "😡", "🤬", "😤", "💢", "👿"],
  },
  love: {
    name: "Love",
    icon: Heart,
    emojis: ["❤️", "🧡", "💛", "💚", "💙", "💜", "🖤", "🤍", "🤎", "💔", "❤️‍🔥", "❤️‍🩹", "❣️", "💕", "💞", "💓", "💗", "💖", "💘", "💝", "💟"],
  },
  excitement: {
    name: "Excitement",
    icon: Sparkles,
    emojis: ["✨", "🌟", "💫", "🎉", "🎊", "🎈", "💯", "🙌", "🔥", "🚀", "🤯", "💥"],
  },
};

export const allEmojis: string[] = Object.values(emojiCategories).flatMap(category => category.emojis);
