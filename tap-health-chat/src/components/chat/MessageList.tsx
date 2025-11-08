import React, { useState, useRef } from "react";
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Message } from "../../types/message";
import { Ionicons } from "@expo/vector-icons";

export default function MessageList({ messages }: { messages: Message[] }) {
  const [showJump, setShowJump] = useState(false);
  const listRef = useRef<FlatList>(null);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        contentContainerStyle={{ paddingBottom: 80 }}
        ref={listRef}
        inverted
        data={messages}
        keyExtractor={(item) => item.id}
        onScroll={(e) => {
          const offset = e.nativeEvent.contentOffset.y;
          if (offset > 100 && !showJump) setShowJump(true);
          if (offset < 50 && showJump) setShowJump(false);
        }}
        renderItem={({ item }) => {
          if (item.type === "ad") {
            return (
              <View style={styles.adContainer}>
                <Text style={styles.adText}>{item.text}</Text>
              </View>
            );
          }
          const isUser = item.sender === "user";
          return (
            <View
              style={[
                styles.message,
                isUser ? styles.userMessage : styles.assistantMessage,
              ]}
            >
              <Text style={styles.text}>{item.text}</Text>
            </View>
          );
        }}
      />

      {showJump && (
        <TouchableOpacity
          style={styles.jumpBtn}
          onPress={() => {
            listRef.current?.scrollToOffset({ offset: 0, animated: true });
            setShowJump(false);
          }}
        >
          <Ionicons name="arrow-down" size={18} color="#fff" />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  message: {
    marginVertical: 4,
    maxWidth: "80%",
    borderRadius: 16,
    padding: 10,
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#DCF8C6",
  },
  assistantMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#F1F0F0",
  },
  adContainer: {
    alignSelf: "center",
    backgroundColor: "#E7F3FF",
    borderRadius: 10,
    padding: 8,
    marginVertical: 6,
  },
  adText: {
    color: "#007AFF",
    fontWeight: "600",
  },
  text: {
    fontSize: 15,
  },
  jumpBtn: {
    position: "absolute",
    bottom: 10,
    alignSelf: "center",
    backgroundColor: "#007AFF",
    borderRadius: 16,
    padding: 6,
    elevation: 2,
  },
});
