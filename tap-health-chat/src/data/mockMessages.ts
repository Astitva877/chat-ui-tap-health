import { Message } from "../types/message";

export const mockMessages: Message[] = [
  {
    id: "1",
    sender: "assistant",
    type: "text",
    text: "Hi! How can I help you?",
  },
  {
    id: "2",
    sender: "user",
    type: "text",
    text: "Tell me something interesting.",
  },
  {
    id: "3",
    type: "ad",
    text: "🔥 Get 50% off premium access today!",
  },
];
