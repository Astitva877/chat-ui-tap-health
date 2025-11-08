import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, View, StyleSheet } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import MessageList from "../components/chat/MessageList";
import ChatComposer from "../components/ChatComposer/ChatComposer";
import TypingIndicator from "../components/chat/TypingIndicator";
import { mockMessages } from "../data/mockMessages";
import { Message } from "../types/message";

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [isTyping, setIsTyping] = useState(false);
  const insets = useSafeAreaInsets();

  const handleSend = (text: string) => {
    const newMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      type: "text",
      text,
    };
    setMessages((prev) => [newMsg, ...prev]);

    // Simulate assistant typing
    setIsTyping(true);
    setTimeout(() => {
      setMessages((prev) => [
        {
          id: Date.now().toString(),
          sender: "assistant",
          type: "text",
          text: "Got it! 👌",
        },
        ...prev,
      ]);
      setIsTyping(false);
    }, 2000);
  };

  const handleImageSend = (img: any) => {
    const newMsg: Message = {
      id: img.id,
      sender: "user",
      type: "image",
      content: {
        uri: img.uri,
        name: img.name,
        size: img.size,
        mime: img.mime,
      },
    };
    setMessages((prev) => [newMsg, ...prev]);

    // Assistant replies with the same image after 2 seconds
    setTimeout(() => {
      setMessages((prev) => [
        {
          id: Date.now().toString(),
          sender: "assistant",
          type: "image",
          content: {
            uri: img.uri,
            name: img.name,
            size: img.size,
            mime: img.mime,
          },
        },
        ...prev,
      ]);
    }, 2000);
  };

  const handleFileSend = (file: any) => {
    const newMsg: Message = {
      id: file.id,
      sender: "user",
      type: "file",
      content: {
        uri: file.uri,
        name: file.name,
        size: file.size,
        mime: file.mime,
      },
    };
    setMessages((prev) => [newMsg, ...prev]);

    // Assistant replies with the same file after 2 seconds
    setTimeout(() => {
      setMessages((prev) => [
        {
          id: Date.now().toString(),
          sender: "assistant",
          type: "file",
          content: {
            uri: file.uri,
            name: file.name,
            size: file.size,
            mime: file.mime,
          },
        },
        ...prev,
      ]);
    }, 2000);
  };

  const handleAudioSend = (audio: any) => {
    const newMsg: Message = {
      id: audio.id,
      sender: "user",
      type: "audio",
      content: {
        uri: audio.uri,
        name: audio.name,
        size: audio.size,
        mime: audio.mime,
        duration: audio.duration,
      },
    };
    setMessages((prev) => [newMsg, ...prev]);

    // Assistant replies with the same audio after 2 seconds
    setTimeout(() => {
      setMessages((prev) => [
        {
          id: Date.now().toString(),
          sender: "assistant",
          type: "audio",
          content: {
            uri: audio.uri,
            name: audio.name,
            size: audio.size,
            mime: audio.mime,
            duration: audio.duration,
          },
        },
        ...prev,
      ]);
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={0}
      >
        <View style={styles.inner}>
          <MessageList messages={messages} />
          {isTyping && <TypingIndicator />}
          <View style={{ paddingBottom: insets.bottom }}>
            <ChatComposer
              onSend={handleSend}
              onAttachment={handleFileSend}
              onImage={handleImageSend}
              onAudio={handleAudioSend}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
  },
});
