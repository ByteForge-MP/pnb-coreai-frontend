export async function streamChat(
  prompt: string,
  file: File | null | undefined,
  onChunk: (chunk: string) => void
) {
  try {
    const hour = new Date().getHours();
    let timePeriod = "evening";

    if (hour < 12) {
      timePeriod = "morning";
    } else if (hour < 17) {
      timePeriod = "afternoon";
    }

    // ✅ build multipart request instead of JSON
    const formData = new FormData();
    formData.append("prompt", prompt);
    formData.append("model", "smollm2");
    formData.append("time", timePeriod);

    // append file if present
    if (file) {
      formData.append("file", file);
    }

    const response = await fetch("http://localhost:8000/api/v1/stream", {
      method: "POST",
      body: formData, // ❗ no headers here
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
    onChunk(
      'data: {"text": "Server down and offline. Please try again later!"} data: [DONE]'
    );
  }
}