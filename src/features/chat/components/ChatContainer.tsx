import { useChatStream } from "../hooks/useChatStream";
import MessageList from "./MessageList";
import PromptInput from "./PromptInput";
import "./ChatContainer.css";

interface ChatContainerProps {
  theme: "light" | "dark";
}

export default function ChatContainer({ theme }: ChatContainerProps) {

  const { messages, sendMessage, loading } = useChatStream();

  const handleStop = () => {
    // placeholder for stop streaming logic
  };

  return (
    <div className={`chat-container ${theme}`}>

      <header className="chat-header">

        <div className="chat-title">
          <h1>PNB GPT</h1>
        </div>

        <div>
          <span>Your intelligent banking assistant</span>
        </div>

      </header>

      {messages.length === 0 && (
        <div className="welcome-message">
          Hello, how can I help you?
        </div>
      )}

      <MessageList messages={messages} />

      <PromptInput
        onSend={sendMessage}
        disabled={loading}
        isStreaming={loading}
        onStop={handleStop}
      />

    </div>
  );
}