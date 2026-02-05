import { useState } from "react";
import { Message } from "../types/chat";
import { streamChat } from "../api/chatApi";

export function useChatStream() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async (prompt: string) => {
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

    await streamChat(prompt, (chunk) => {
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
