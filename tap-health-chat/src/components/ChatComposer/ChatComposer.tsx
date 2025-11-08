import React, { useState, useRef } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  Platform,
  Text,
  Pressable,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

interface ChatComposerProps {
  onSend: (text: string) => void;
  onAttachment?: (file: any) => void;
  onImage?: (image: any) => void;
  onAudio?: (audio: any) => void;
}

export default function ChatComposer({
  onSend,
  onAttachment,
  onImage,
  onAudio,
}: ChatComposerProps) {
  const [text, setText] = useState("");
  const [recording, setRecording] = useState(false);
  const micTimer = useRef<NodeJS.Timeout | null>(null);

  const handleSend = () => {
    if (!text.trim()) return;
    onSend(text);
    setText("");
    Keyboard.dismiss();
  };

  // 🖼️ Mock image
  const handleImage = () => {
    const mockImage = {
      id: Date.now().toString(),
      type: "image",
      uri: "https://placekitten.com/200/200",
      name: "cute-cat.jpg",
      size: "245 KB",
    };
    onImage && onImage(mockImage);
  };

  // 📎 Mock file
  const handleAttachment = () => {
    const mockFile = {
      id: Date.now().toString(),
      type: "file",
      name: "document.pdf",
      size: "512 KB",
    };
    onAttachment && onAttachment(mockFile);
  };

  // 🎙️ Long press mic mock recording
  const handleMicPressIn = () => {
    setRecording(true);
    micTimer.current = setTimeout(() => {
      setRecording(false);
      const mockAudio = {
        id: Date.now().toString(),
        type: "audio",
        name: "voice-note.m4a",
        duration: `${Math.floor(3 + Math.random() * 2)}s`,
      };
      onAudio && onAudio(mockAudio);
    }, 3000);
  };

  const handleMicPressOut = () => {
    setRecording(false);
    if (micTimer.current) clearTimeout(micTimer.current);
  };

  return (
    <View style={styles.container}>
      {/* Left Actions */}
      <View style={styles.leftActions}>
        <TouchableOpacity style={styles.iconButton} onPress={handleImage}>
          <Ionicons name="image-outline" size={24} color="#555" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={handleAttachment}>
          <Ionicons name="attach-outline" size={24} color="#555" />
        </TouchableOpacity>
      </View>

      {/* Input */}
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Type a message"
          placeholderTextColor="#999"
          multiline
          value={text}
          onChangeText={setText}
        />
      </View>

      {/* Right Action */}
      <View style={styles.rightAction}>
        {text.trim().length > 0 ? (
          <TouchableOpacity onPress={handleSend} style={styles.iconButton}>
            <Ionicons name="send" size={24} color="#007AFF" />
          </TouchableOpacity>
        ) : (
          <Pressable
            onPressIn={handleMicPressIn}
            onPressOut={handleMicPressOut}
            style={styles.iconButton}
          >
            <MaterialIcons
              name={recording ? "mic" : "keyboard-voice"}
              size={24}
              color={recording ? "red" : "#555"}
            />
          </Pressable>
        )}
      </View>

      {/* Recording Overlay */}
      {recording && (
        <View style={styles.recordingBubble}>
          <Text style={styles.recordingText}>🎙️ Recording...</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingHorizontal: 8,
    paddingVertical: Platform.OS === "ios" ? 8 : 4,
    borderTopWidth: 1,
    borderColor: "#eee",
    backgroundColor: "#fff",
  },
  leftActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    padding: 6,
  },
  inputWrapper: {
    flex: 1,
    maxHeight: 150,
    marginHorizontal: 6,
    backgroundColor: "#f5f5f5",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: Platform.OS === "ios" ? 8 : 4,
  },
  input: {
    fontSize: 16,
    lineHeight: 20,
    textAlignVertical: "top",
    color: "#000",
  },
  rightAction: {
    justifyContent: "flex-end",
  },
  recordingBubble: {
    position: "absolute",
    bottom: 60,
    right: 20,
    backgroundColor: "#333",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  recordingText: {
    color: "#fff",
    fontWeight: "500",
  },
});
