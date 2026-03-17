import { useEffect, useRef } from "react";
import { Message } from "../types/chat";
import MessageBubble from "./MessageBubble";
import "./MessageList.css";

export default function MessageList({ messages }: { messages: Message[] }) {

  // reference to bottom element
  const bottomRef = useRef<HTMLDivElement | null>(null);

  // run whenever messages change (including streaming updates)
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="messages">

      {messages.map((msg) => (
        <MessageBubble key={msg.id} message={msg} />
      ))}

      {/* invisible anchor used for scrolling */}
      <div ref={bottomRef}></div>

    </div>
  );
}