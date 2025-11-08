import React, { useState, useRef } from "react";
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Keyboard,
} from "react-native";
import { Message } from "../../types/message";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

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
        onScrollBeginDrag={() => Keyboard.dismiss()}
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

          // Render image message
          if (item.type === "image" && item.content) {
            return (
              <View
                style={[
                  styles.message,
                  isUser ? styles.userMessage : styles.assistantMessage,
                ]}
              >
                <Image
                  source={{ uri: item.content.uri }}
                  style={styles.imageThumbnail}
                  resizeMode="cover"
                />
                <Text style={styles.attachmentName}>{item.content.name}</Text>
                <Text style={styles.attachmentSize}>{item.content.size}</Text>
              </View>
            );
          }

          // Render file message
          if (item.type === "file" && item.content) {
            return (
              <View
                style={[
                  styles.message,
                  styles.fileMessage,
                  isUser ? styles.userMessage : styles.assistantMessage,
                ]}
              >
                <View style={styles.fileIconContainer}>
                  <MaterialIcons
                    name="insert-drive-file"
                    size={40}
                    color="#555"
                  />
                </View>
                <View style={styles.fileInfo}>
                  <Text style={styles.fileName} numberOfLines={1}>
                    {item.content.name}
                  </Text>
                  <Text style={styles.fileSize}>{item.content.size}</Text>
                </View>
              </View>
            );
          }

          // Render audio message
          if (item.type === "audio" && item.content) {
            return (
              <View
                style={[
                  styles.message,
                  styles.audioMessage,
                  isUser ? styles.userMessage : styles.assistantMessage,
                ]}
              >
                <View style={styles.audioIconContainer}>
                  <Ionicons name="play-circle" size={40} color="#007AFF" />
                </View>
                <View style={styles.audioInfo}>
                  <Text style={styles.audioName} numberOfLines={1}>
                    🎧 {item.content.name}
                  </Text>
                  <Text style={styles.audioDuration}>
                    {item.content.duration}
                  </Text>
                </View>
              </View>
            );
          }

          // Render text message
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
  imageThumbnail: {
    width: 200,
    height: 200,
    borderRadius: 12,
    marginBottom: 4,
  },
  attachmentName: {
    fontSize: 13,
    fontWeight: "500",
    marginTop: 4,
  },
  attachmentSize: {
    fontSize: 11,
    color: "#666",
    marginTop: 2,
  },
  fileMessage: {
    flexDirection: "row",
    alignItems: "center",
    minWidth: 200,
  },
  fileIconContainer: {
    marginRight: 12,
  },
  fileInfo: {
    flex: 1,
  },
  fileName: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 2,
  },
  fileSize: {
    fontSize: 12,
    color: "#666",
  },
  audioMessage: {
    flexDirection: "row",
    alignItems: "center",
    minWidth: 200,
  },
  audioIconContainer: {
    marginRight: 12,
  },
  audioInfo: {
    flex: 1,
  },
  audioName: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 2,
  },
  audioDuration: {
    fontSize: 12,
    color: "#666",
    fontWeight: "600",
  },
});
