import { useState, useEffect, useRef } from "react";

interface UseMessageStreamOptions {
  fullText: string;
  onComplete?: () => void;
  tokenDelayMs?: number;
}

/**
 * Hook for streaming messages token-by-token
 * @param fullText - The complete message to stream
 * @param onComplete - Callback when streaming completes
 * @param tokenDelayMs - Delay between tokens (30-60ms recommended)
 * @returns Current streamed text
 */
export const useMessageStream = ({
  fullText,
  onComplete,
  tokenDelayMs = 50, // Default 50ms per token
}: UseMessageStreamOptions) => {
  const [streamedText, setStreamedText] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const currentIndexRef = useRef(0);

  useEffect(() => {
    if (!fullText) return;

    setIsStreaming(true);
    currentIndexRef.current = 0;
    setStreamedText("");

    const streamNextToken = () => {
      if (currentIndexRef.current < fullText.length) {
        // Stream 1-3 characters at a time (more realistic)
        const charsToAdd = Math.min(
          Math.floor(Math.random() * 2) + 1,
          fullText.length - currentIndexRef.current
        );

        currentIndexRef.current += charsToAdd;
        setStreamedText(fullText.substring(0, currentIndexRef.current));

        timeoutRef.current = setTimeout(streamNextToken, tokenDelayMs);
      } else {
        setIsStreaming(false);
        if (onComplete) {
          onComplete();
        }
      }
    };

    timeoutRef.current = setTimeout(streamNextToken, tokenDelayMs);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [fullText, tokenDelayMs, onComplete]);

  return { streamedText, isStreaming };
};
