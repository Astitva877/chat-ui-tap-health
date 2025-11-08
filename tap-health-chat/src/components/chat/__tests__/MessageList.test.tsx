import React from "react";
import { render } from "@testing-library/react-native";
import MessageList from "../MessageList";
import { Message } from "../../../types/message";

describe("MessageList", () => {
  const mockMessages: Message[] = [
    {
      id: "1",
      sender: "user",
      type: "text",
      text: "Hello",
    },
    {
      id: "2",
      sender: "assistant",
      type: "text",
      text: "Hi there!",
    },
    {
      id: "3",
      type: "ad",
      text: "🔥 Special offer!",
    },
  ];

  it("renders without crashing", () => {
    const { getByText } = render(<MessageList messages={mockMessages} />);
    expect(getByText("Hello")).toBeTruthy();
    expect(getByText("Hi there!")).toBeTruthy();
  });

  it("renders text messages correctly", () => {
    const { getByText } = render(<MessageList messages={mockMessages} />);
    expect(getByText("Hello")).toBeTruthy();
  });

  it("renders ad messages correctly", () => {
    const { getByText } = render(<MessageList messages={mockMessages} />);
    expect(getByText("🔥 Special offer!")).toBeTruthy();
  });

  it("renders image messages with content", () => {
    const imageMessages: Message[] = [
      {
        id: "1",
        sender: "user",
        type: "image",
        content: {
          uri: "https://example.com/image.jpg",
          name: "test-image.jpg",
          size: "250 KB",
          mime: "image/jpeg",
        },
      },
    ];

    const { getByText } = render(<MessageList messages={imageMessages} />);
    expect(getByText("test-image.jpg")).toBeTruthy();
    expect(getByText("250 KB")).toBeTruthy();
  });

  it("renders file messages with content", () => {
    const fileMessages: Message[] = [
      {
        id: "1",
        sender: "user",
        type: "file",
        content: {
          uri: "file://document.pdf",
          name: "document.pdf",
          size: "512 KB",
          mime: "application/pdf",
        },
      },
    ];

    const { getByText } = render(<MessageList messages={fileMessages} />);
    expect(getByText("document.pdf")).toBeTruthy();
    expect(getByText("512 KB")).toBeTruthy();
  });

  it("renders audio messages with content", () => {
    const audioMessages: Message[] = [
      {
        id: "1",
        sender: "user",
        type: "audio",
        content: {
          uri: "file://voice-note.m4a",
          name: "voice-note.m4a",
          size: "48 KB",
          mime: "audio/m4a",
          duration: "4s",
        },
      },
    ];

    const { getByText } = render(<MessageList messages={audioMessages} />);
    expect(getByText(/voice-note.m4a/)).toBeTruthy();
    expect(getByText("4s")).toBeTruthy();
  });

  it("renders empty list without crashing", () => {
    const { toJSON } = render(<MessageList messages={[]} />);
    expect(toJSON()).toBeTruthy();
  });
});
