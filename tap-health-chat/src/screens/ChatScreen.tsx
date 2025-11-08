import React, { useRef, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native";
import { mockMessages } from "../data/mockMessages";
import { ChatMessage } from "../types/chat";
import { SafeAreaView } from "react-native-safe-area-context";

const ChatScreen = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(mockMessages);
  const [input, setInput] = useState("");
  const flatListRef = useRef<FlatList<ChatMessage>>(null);

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      type: "text",
      role: "user",
      content: input.trim(),
      createdAt: Date.now(),
    };

    setMessages((prev) => [newMessage, ...prev]); // FlatList inverted
    setInput("");

    // Simulate assistant reply after 1s
    setTimeout(() => {
      const reply: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: "text",
        role: "assistant",
        content: "Got it! 👍",
        createdAt: Date.now(),
      };
      setMessages((prev) => [reply, ...prev]);
    }, 1000);
  };

  const renderItem = ({ item }: { item: ChatMessage }) => {
    const isUser = item.role === "user";
    const isAd = item.type === "ad";

    return (
      <View
        style={[
          styles.messageContainer,
          isUser ? styles.userMessage : styles.assistantMessage,
          isAd && styles.adMessage,
        ]}
      >
        <Text style={isAd ? styles.adText : styles.messageText}>
          {item.content}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={80}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          inverted
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ padding: 12 }}
        />

        {/* Chat Composer */}
        <View style={styles.composerContainer}>
          <TextInput
            style={styles.input}
            value={input}
            onChangeText={setInput}
            placeholder="Type a message..."
            multiline
          />
          <TouchableOpacity
            style={[
              styles.sendButton,
              input.trim() ? styles.sendActive : styles.sendDisabled,
            ]}
            onPress={handleSend}
            disabled={!input.trim()}
          >
            <Text style={styles.sendText}>Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },
  messageContainer: {
    marginVertical: 4,
    padding: 10,
    borderRadius: 10,
    maxWidth: "80%",
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#DCF8C6",
  },
  assistantMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#FFF",
  },
  messageText: {
    fontSize: 16,
    color: "#222",
  },
  adMessage: {
    alignSelf: "center",
    backgroundColor: "#EDEDED",
    borderRadius: 6,
  },
  adText: {
    color: "#888",
    fontStyle: "italic",
    fontSize: 14,
  },
  composerContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    padding: 8,
    backgroundColor: "#FFF",
    borderTopWidth: 1,
    borderColor: "#E0E0E0",
  },
  input: {
    flex: 1,
    minHeight: 40,
    maxHeight: 120, // ~6 lines
    paddingHorizontal: 10,
    fontSize: 16,
  },
  sendButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },
  sendActive: {
    backgroundColor: "#007AFF",
  },
  sendDisabled: {
    backgroundColor: "#AAA",
  },
  sendText: {
    color: "#FFF",
    fontWeight: "600",
  },
});
