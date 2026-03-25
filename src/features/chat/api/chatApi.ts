const API = import.meta.env.VITE_API_URL || "http://localhost:8000"

export async function streamChat(
  prompt: string,
  file: File | null | undefined,
  onChunk: (chunk: string, done?: boolean) => void
) {
  try {

    const hour = new Date().getHours();
    let timePeriod = "evening";

    if (hour < 12) {
      timePeriod = "morning";
    } else if (hour < 17) {
      timePeriod = "afternoon";
    }

    const formData = new FormData();
    formData.append("prompt", prompt);
    formData.append("model", "smollm2");
    formData.append("time", timePeriod);

    if (file) {
      formData.append("file", file);
    }

    const response = await fetch(`${API}/api/v1/stream`, {
      method: "POST",
      body: formData
    });

    if (!response.ok) {
      throw new Error("Server Error");
    }

    if (!response.body) {
      throw new Error("No response stream");
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");

    let buffer = "";

    while (true) {

      const { value, done } = await reader.read();

      if (done) break;

      buffer += decoder.decode(value, { stream: true });

      const lines = buffer.split("\n");

      buffer = lines.pop() || "";

      for (const line of lines) {

        const trimmed = line.trim();

        if (!trimmed.startsWith("data:")) continue;

        const data = trimmed.replace("data:", "").trim();

        // STREAM FINISHED
        if (data === "[DONE]") {
          onChunk("", true);   // notify UI streaming finished
          return;
        }

        try {

          const json = JSON.parse(data);

          if (json.text) {
            onChunk(json.text);   // normal streaming chunk
          }

        } catch (err: unknown) {

          if (err instanceof Error) {
            console.error("Stream error:", err.message);
          } else {
            console.error("Stream error:", err);
          }

        }

      }
    }

  } catch (error) {

    console.error("Stream Error:", error);

    onChunk("Server down and offline. Please try again later!", true);

  }
}
