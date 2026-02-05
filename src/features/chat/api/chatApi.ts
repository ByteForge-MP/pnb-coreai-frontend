export async function streamChat(
  prompt: string,
  onChunk: (chunk: string) => void
) {
  try {
    const response = await fetch("http://localhost:8000/api/v1/stream", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
        model: "gpt-4o",
      }),
    });

    if (!response.ok) {
      // Handles 404, 500, or 400 errors
      throw new Error("Server Error");
    }

    if (!response.body) {
      throw new Error("No response stream");
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      onChunk(decoder.decode(value));
    }
  } catch (error) {
    console.error("Stream Error:", error);
    onChunk('data: {"text": "Server down and offline 🔌❌ Please try again later!"} data: [DONE]');
  }
}