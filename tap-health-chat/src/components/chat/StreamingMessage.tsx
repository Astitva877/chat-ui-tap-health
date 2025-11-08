import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { useMessageStream } from "../../hooks/useMessageStream";

interface StreamingMessageProps {
  fullText: string;
  onComplete?: () => void;
  isUser: boolean;
}

export default function StreamingMessage({
  fullText,
  onComplete,
  isUser,
}: StreamingMessageProps) {
  const { streamedText } = useMessageStream({
    fullText,
    onComplete,
    tokenDelayMs: 50, // 50ms per token for smooth streaming
  });

  return (
    <View
      style={[
        styles.message,
        isUser ? styles.userMessage : styles.assistantMessage,
      ]}
    >
      <Text style={styles.text}>
        {streamedText}
        {streamedText.length < fullText.length && (
          <Text style={styles.cursor}>▌</Text>
        )}
      </Text>
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
  text: {
    fontSize: 15,
  },
  cursor: {
    color: "#007AFF",
    fontWeight: "bold",
  },
});
