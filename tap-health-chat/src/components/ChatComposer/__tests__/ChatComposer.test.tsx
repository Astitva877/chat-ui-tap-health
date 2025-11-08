import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import ChatComposer from "../ChatComposer";

describe("ChatComposer", () => {
  const mockOnSend = jest.fn();
  const mockOnAttachment = jest.fn();
  const mockOnImage = jest.fn();
  const mockOnAudio = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly", () => {
    const { getByPlaceholderText } = render(
      <ChatComposer onSend={mockOnSend} />
    );
    expect(getByPlaceholderText("Type a message")).toBeTruthy();
  });

  it("sends text message when send button is pressed", () => {
    const { getByPlaceholderText, getByTestId } = render(
      <ChatComposer onSend={mockOnSend} />
    );

    const input = getByPlaceholderText("Type a message");
    fireEvent.changeText(input, "Hello World");

    const sendButton = getByTestId("send-button");
    fireEvent.press(sendButton);

    expect(mockOnSend).toHaveBeenCalledWith("Hello World");
  });

  it("shows send button only when text is present", () => {
    const { getByPlaceholderText, queryByTestId } = render(
      <ChatComposer onSend={mockOnSend} />
    );

    // Initially, send button should not be visible
    expect(queryByTestId("send-button")).toBeNull();

    // After typing, send button should appear
    const input = getByPlaceholderText("Type a message");
    fireEvent.changeText(input, "Test");

    expect(queryByTestId("send-button")).toBeTruthy();
  });

  it("shows mic button when no text is present", () => {
    const { queryByTestId } = render(
      <ChatComposer onSend={mockOnSend} onAudio={mockOnAudio} />
    );

    expect(queryByTestId("mic-button")).toBeTruthy();
  });

  it("clears input after sending message", () => {
    const { getByPlaceholderText, getByTestId } = render(
      <ChatComposer onSend={mockOnSend} />
    );

    const input = getByPlaceholderText("Type a message");
    fireEvent.changeText(input, "Test message");

    const sendButton = getByTestId("send-button");
    fireEvent.press(sendButton);

    expect(input.props.value).toBe("");
  });

  it("does not send empty messages", () => {
    const { getByPlaceholderText, queryByTestId } = render(
      <ChatComposer onSend={mockOnSend} />
    );

    const input = getByPlaceholderText("Type a message");
    fireEvent.changeText(input, "   "); // Only whitespace

    // Send button shouldn't appear for whitespace-only text
    const sendButton = queryByTestId("send-button");
    expect(sendButton).toBeNull();
    expect(mockOnSend).not.toHaveBeenCalled();
  });

  it("calls onImage when image button is pressed", async () => {
    const { getByTestId } = render(
      <ChatComposer onSend={mockOnSend} onImage={mockOnImage} />
    );

    const imageButton = getByTestId("image-button");
    fireEvent.press(imageButton);

    await waitFor(() => {
      expect(mockOnImage).toHaveBeenCalled();
    });
  });

  it("calls onAttachment when attachment button is pressed", async () => {
    const { getByTestId } = render(
      <ChatComposer onSend={mockOnSend} onAttachment={mockOnAttachment} />
    );

    const attachmentButton = getByTestId("attachment-button");
    fireEvent.press(attachmentButton);

    await waitFor(() => {
      expect(mockOnAttachment).toHaveBeenCalled();
    });
  });
});
