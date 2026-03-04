import { useState } from "react";
import { Message } from "../types/chat";
import { streamChat } from "../api/chatApi";

export function useChatStream() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  // ✅ accept file also
  const sendMessage = async (prompt: string, file?: File | null) => {
    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: prompt,
    };

    const assistantMessage: Message = {
      id: crypto.randomUUID(),
      role: "assistant",
      content: "",
    };

    setMessages((prev) => [...prev, userMessage, assistantMessage]);
    setLoading(true);

    // ✅ send both prompt + file to API layer
    await streamChat(prompt, file, (chunk) => {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantMessage.id
            ? { ...m, content: m.content + chunk }
            : m
        )
      );
    });

    setLoading(false);
  };

  return { messages, sendMessage, loading };
}