export type ChatMessageType = "text" | "image" | "file" | "audio" | "ad";

export interface ChatMessage {
  id: string;
  type: ChatMessageType;
  role: "user" | "assistant" | "system";
  content: string;
  createdAt: number;
  attachmentUri?: string;
  fileName?: string;
  fileSize?: number;
}
