import { ChatMessage } from "../types/chat";

export const mockMessages: ChatMessage[] = [
  {
    id: "1",
    type: "text",
    role: "assistant",
    content: "Hi there 👋 How can I help you today?",
    createdAt: Date.now() - 1000 * 60 * 3,
  },
  {
    id: "2",
    type: "text",
    role: "user",
    content: "Hey! I just wanted to test this chat UI 😄",
    createdAt: Date.now() - 1000 * 60 * 2,
  },
  {
    id: "3",
    type: "ad",
    role: "system",
    content: "🔥 Tip: Upgrade to Premium for faster responses!",
    createdAt: Date.now() - 1000 * 60,
  },
];
