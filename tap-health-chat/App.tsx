// App.tsx
import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import ChatScreen from "./src/screens/ChatScreen";

export default function App() {
  return (
    <SafeAreaProvider style={styles.container}>
      <StatusBar style="auto" />
      <ChatScreen />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
