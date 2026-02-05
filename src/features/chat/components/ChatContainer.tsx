import { useChatStream } from "../hooks/useChatStream";
import MessageList from "./MessageList";
import PromptInput from "./PromptInput";

export default function ChatContainer() {
  const { messages, sendMessage, loading } = useChatStream();

  return (
    <div className="chat-container">
      {/* Header */}
      <header className="chat-header">
        <h1>PNB OneAI</h1>
        <span>Your intelligent banking assistant</span>
      </header>

      {/* Messages */}
      <MessageList messages={messages} />

      {/* Input box */}
      <PromptInput onSend={sendMessage} disabled={loading} />
    </div>
  );
}
