import ReactMarkdown from "react-markdown";
import { Message } from "../types/chat";
import "./MessageBubble.css";

export default function MessageBubble({ message }: { message: Message }) {

  const isUser = message.role === "user";

  return (
    <div className={`message ${isUser ? "user" : "assistant"}`}>
      <div className="bubble">
        {isUser ? (
          message.content
        ) : (
          <ReactMarkdown>{message.content}</ReactMarkdown>
        )}
      </div>
    </div>
  );
}