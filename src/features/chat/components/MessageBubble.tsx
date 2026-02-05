import { Message } from "../types/chat";

export default function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === "user";

  return (
    <div className={`message ${isUser ? "user" : "assistant"}`}>
      <div className="bubble">{message.content}</div>
    </div>
  );
}
