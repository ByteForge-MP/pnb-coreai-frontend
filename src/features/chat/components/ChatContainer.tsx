import { useChatStream } from "../hooks/useChatStream";
import MessageList from "./MessageList";
import PromptInput from "./PromptInput";
import "./ChatContainer.css";

export default function ChatContainer() {
  const { messages, sendMessage, loading } = useChatStream();

  return (
    <div className="chat-container">
      <header className="chat-header">
          <div className="chat-title">
            <h1>PNB OneAI</h1>
          </div>
          <div>
            <span>Your intelligent banking assistant</span>
          </div>
      </header>
      <MessageList messages={messages} />
      <PromptInput onSend={sendMessage} disabled={loading} />
    </div>
  );
}
