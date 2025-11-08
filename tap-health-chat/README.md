# Tap Health Chat UI

A modern, WhatsApp-quality chat interface built with React Native and Expo. Features smooth keyboard handling, message streaming, typing indicators, and comprehensive attachment support.

## 🚀 Features

- ✅ **Inverted Message List** - Pinned to latest message with smooth scrolling
- ✅ **Jump to Latest Button** - Appears when scrolling up
- ✅ **Message Streaming** - Token-by-token streaming for assistant responses
- ✅ **Typing Indicator** - Real-time typing status
- ✅ **Rich Attachments** - Image, File, and Audio support with real device pickers
- ✅ **Voice Recording** - Long-press with 4-second countdown modal
- ✅ **Smart Send Button** - Dynamically shows/hides based on input
- ✅ **Smooth Keyboard Handling** - Proper transitions with safe area support
- ✅ **Accessibility Labels** - Full support for screen readers
- ✅ **Multiple Message Types** - Text, Images, Files, Audio, and Ad messages

## 📦 Installation

### Prerequisites

- Node.js >= 20.14.0
- Expo CLI
- Expo Go app on your phone ([iOS](https://apps.apple.com/app/expo-go/id982107779) / [Android](https://play.google.com/store/apps/details?id=host.exp.exponent))

For detailed setup instructions, visit: https://docs.expo.dev/get-started/set-up-your-environment/

### Setup

```bash
# Clone the repository
git clone https://github.com/Astitva877/chat-ui-tap-health.git
cd chat-ui-tap-health/tap-health-chat

# Install dependencies
npm install

# Start the development server
npm start
```

### Running on Devices

1. **Install Expo Go** on your mobile device:

   - iOS: https://apps.apple.com/app/expo-go/id982107779
   - Android: https://play.google.com/store/apps/details?id=host.exp.exponent

2. **Scan the QR code** from the terminal with:
   - iOS: Camera app
   - Android: Expo Go app

Or run directly on simulators:

```bash
# iOS Simulator
npm run ios

# Android Emulator
npm run android
```

## 🏗️ Project Structure

```
tap-health-chat/
├── src/
│   ├── components/
│   │   ├── chat/
│   │   │   ├── MessageList.tsx
│   │   │   ├── StreamingMessage.tsx
│   │   │   └── TypingIndicator.tsx
│   │   ├── ChatComposer/
│   │   │   └── ChatComposer.tsx
│   │   └── ChatWindow/
│   │       ├── ChatWindow.tsx
│   │       └── MessageBubble.tsx
│   ├── screens/
│   │   └── ChatScreen.tsx
│   ├── hooks/
│   │   └── useMessageStream.ts
│   ├── types/
│   │   └── message.ts
│   └── data/
│       └── mockMessages.ts
├── App.tsx
└── package.json
```

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```
