export async function streamChat( prompt: string, onChunk: (chunk: string) => void) {
  try {
    const hour = new Date().getHours();
    let timePeriod = "evening";

    if (hour < 12) {
      timePeriod = "morning";
    } else if (hour < 17) {
      timePeriod = "afternoon";
    }

    const response = await fetch("http://localhost:8000/api/v1/stream", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
        model: "smollm2",
        time: timePeriod,
      }),
    });

    if (!response.ok) {
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
    onChunk('data: {"text": "Server down and offline. Please try again later!"} data: [DONE]');
  }
}