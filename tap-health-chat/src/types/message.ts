export type Message = {
  id: string;
  sender?: string;
  type: "text" | "ad" | "image" | "file" | "audio";
  text?: string;
  createdAt?: string;
  uri?: string;
  name?: string;
  size?: string;
  content?: {
    uri: string;
    name: string;
    size: string;
    mime: string;
    thumbnail?: string;
  };
};
