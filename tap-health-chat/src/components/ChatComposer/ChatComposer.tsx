import React, { useState, useRef, useEffect } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  Platform,
  Text,
  Pressable,
  Alert,
  Modal,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";

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
  const [recordingTime, setRecordingTime] = useState(0);
  const micTimer = useRef<NodeJS.Timeout | null>(null);
  const countdownTimer = useRef<NodeJS.Timeout | null>(null);

  const handleSend = () => {
    if (!text.trim()) return;
    onSend(text);
    setText("");
    Keyboard.dismiss();
  };

  // 🖼️ Pick image from device
  const handleImage = async () => {
    try {
      // Request permissions
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (permissionResult.granted === false) {
        Alert.alert(
          "Permission Required",
          "Permission to access camera roll is required!"
        );
        return;
      }

      // Launch image picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        const imageData = {
          id: Date.now().toString(),
          type: "image" as const,
          uri: asset.uri,
          name: asset.fileName || `image-${Date.now()}.jpg`,
          size: asset.fileSize
            ? `${(asset.fileSize / 1024).toFixed(0)} KB`
            : "Unknown",
          mime: asset.mimeType || "image/jpeg",
        };
        onImage && onImage(imageData);
      }
    } catch (error) {
      console.error("Error picking image:", error);
      Alert.alert("Error", "Failed to pick image. Please try again.");
    }
  };

  // 📎 Pick file from device
  const handleAttachment = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*",
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        const fileData = {
          id: Date.now().toString(),
          type: "file" as const,
          uri: asset.uri,
          name: asset.name,
          size: asset.size ? `${(asset.size / 1024).toFixed(0)} KB` : "Unknown",
          mime: asset.mimeType || "application/octet-stream",
        };
        onAttachment && onAttachment(fileData);
      }
    } catch (error) {
      console.error("Error picking document:", error);
      Alert.alert("Error", "Failed to pick document. Please try again.");
    }
  };

  // 🎙️ Start recording with modal and countdown
  const handleMicPressIn = () => {
    setRecording(true);
    setRecordingTime(0);

    // Countdown timer (updates every second)
    let currentTime = 0;
    countdownTimer.current = setInterval(() => {
      currentTime += 1;
      setRecordingTime(currentTime);
    }, 1000);

    // Auto-stop after 4 seconds
    micTimer.current = setTimeout(() => {
      handleMicPressOut();
      const duration = 4;
      const mockAudio = {
        id: Date.now().toString(),
        type: "audio" as const,
        uri: "mock://audio/voice-note.m4a",
        name: "voice-note.m4a",
        size: "48 KB",
        mime: "audio/m4a",
        duration: `${duration}s`,
      };
      onAudio && onAudio(mockAudio);
    }, 4000);
  };

  const handleMicPressOut = () => {
    setRecording(false);
    setRecordingTime(0);
    if (micTimer.current) {
      clearTimeout(micTimer.current);
      micTimer.current = null;
    }
    if (countdownTimer.current) {
      clearInterval(countdownTimer.current);
      countdownTimer.current = null;
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (micTimer.current) clearTimeout(micTimer.current);
      if (countdownTimer.current) clearInterval(countdownTimer.current);
    };
  }, []);

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

      {/* Recording Modal */}
      <Modal
        visible={recording}
        transparent
        animationType="fade"
        onRequestClose={handleMicPressOut}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.recordingModal}>
            <View style={styles.recordingIconContainer}>
              <MaterialIcons name="mic" size={60} color="#FF3B30" />
            </View>
            <Text style={styles.recordingTitle}>Recording...</Text>
            <Text style={styles.recordingTimer}>{recordingTime}s / 4s</Text>
            <Text style={styles.recordingHint}>
              Release to unsend or hold for 4 seconds
            </Text>
          </View>
        </View>
      </Modal>
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
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  recordingModal: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    minWidth: 280,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  recordingIconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#FFE5E5",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  recordingTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#000",
    marginBottom: 8,
  },
  recordingTimer: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FF3B30",
    marginBottom: 16,
  },
  recordingHint: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
});
