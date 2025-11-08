import { renderHook, waitFor } from "@testing-library/react-native";
import { useMessageStream } from "../useMessageStream";

describe("useMessageStream", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("streams text character by character", async () => {
    const { result } = renderHook(() =>
      useMessageStream({
        fullText: "Hello",
        tokenDelayMs: 50,
      })
    );

    expect(result.current.streamedText).toBe("");
    expect(result.current.isStreaming).toBe(true);

    // Advance time to stream characters
    jest.advanceTimersByTime(60);
    await waitFor(() => {
      expect(result.current.streamedText.length).toBeGreaterThan(0);
    });
  });

  it("calls onComplete when streaming finishes", async () => {
    const onComplete = jest.fn();
    const { result } = renderHook(() =>
      useMessageStream({
        fullText: "Hi",
        tokenDelayMs: 10,
        onComplete,
      })
    );

    // Fast forward through entire streaming
    jest.advanceTimersByTime(1000);

    await waitFor(() => {
      expect(result.current.isStreaming).toBe(false);
      expect(result.current.streamedText).toBe("Hi");
      expect(onComplete).toHaveBeenCalled();
    });
  });

  it("handles empty text", () => {
    const { result } = renderHook(() =>
      useMessageStream({
        fullText: "",
        tokenDelayMs: 50,
      })
    );

    expect(result.current.streamedText).toBe("");
    expect(result.current.isStreaming).toBe(false);
  });

  it("cleans up timeout on unmount", () => {
    const { unmount } = renderHook(() =>
      useMessageStream({
        fullText: "Test message",
        tokenDelayMs: 50,
      })
    );

    unmount();

    // Should not throw error
    expect(() => jest.advanceTimersByTime(100)).not.toThrow();
  });
});
