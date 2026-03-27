import { useState } from "react";
import { Message } from "../types/chat";
import { streamChat } from "../api/chatApi";

export function useChatStream() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  // ✅ accept file also
  const sendMessage = async (prompt: string, file?: File | null) => {
    const imagePreview =
      file?.type.startsWith("image/") ? URL.createObjectURL(file) : undefined;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: prompt,
      image: imagePreview,
    };

    const assistantMessage: Message = {
      id: crypto.randomUUID(),
      role: "assistant",
      content: "",
      streaming: true,
    };

    setMessages((prev) => [...prev, userMessage, assistantMessage]);
    setLoading(true);

    // ✅ send both prompt + file to API layer
    await streamChat(prompt, file, (chunk, done) => {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantMessage.id
            ? {
                ...m,
                content: m.content + chunk,
                streaming: !done,
              }
            : m
        )
      );
    });

    setLoading(false);
  };

  return { messages, sendMessage, loading };
}
