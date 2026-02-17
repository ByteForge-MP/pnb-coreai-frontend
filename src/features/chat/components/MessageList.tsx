import { Message } from "../types/chat";
import MessageBubble from "./MessageBubble";
import "./MessageList.css";

export default function MessageList({ messages }: { messages: Message[] }) {
  return (
    <div className="messages">
      {messages.map((msg) => (
        <MessageBubble key={msg.id} message={msg} />
      ))}
    </div>
  );
}
