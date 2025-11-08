import { Message } from "../types/message";

export const mockMessages: Message[] = [
  {
    id: "1",
    sender: "user",
    type: "text",
    text: "Tell me something interesting.",
  },
  {
    id: "2",
    sender: "assistant",
    type: "text",
    text: "Hi! How can I help you?",
  },
  {
    id: "3",
    sender: "user",
    type: "text",
    text: "Hello",
  },
  {
    id: "4",
    type: "ad",
    text: "🔥 Get 50% off premium access today!",
  },
];
