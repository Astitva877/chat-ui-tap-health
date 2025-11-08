import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  View,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MessageList from "../components/chat/MessageList";
import ChatComposer from "../components/ChatComposer/ChatComposer";
import TypingIndicator from "../components/chat/TypingIndicator";
import { mockMessages } from "../data/mockMessages";
import { Message } from "../types/message";

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [isTyping, setIsTyping] = useState(false);

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

  return (
    <SafeAreaView style={styles.safeArea} edges={["bottom"]}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
            <MessageList messages={messages} />
            {isTyping && <TypingIndicator />}
            <ChatComposer
              onSend={handleSend}
              onAttachment={(file) => {
                setMessages((prev) => [
                  {
                    id: file.id,
                    sender: "user",
                    type: "file",
                    text: file.name,
                  },
                  ...prev,
                ]);
              }}
              onImage={(img) => {
                setMessages((prev) => [
                  {
                    id: img.id,
                    sender: "user",
                    type: "image",
                    text: img.name,
                    uri: img.uri,
                  },
                  ...prev,
                ]);
              }}
              onAudio={(audio) => {
                setMessages((prev) => [
                  {
                    id: audio.id,
                    sender: "user",
                    type: "audio",
                    text: `🎧 ${audio.name} (${audio.duration})`,
                  },
                  ...prev,
                ]);
              }}
            />
          </View>
        </TouchableWithoutFeedback>
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
