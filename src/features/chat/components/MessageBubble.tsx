import ReactMarkdown from 'react-markdown';
import { Message } from "../types/chat";

export default function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === "user";

  const getExtractedContent = (raw: string) => {
    if (isUser) return raw;

    const regex = /"text":\s*"([^"]*)"/g;
    let match;
    let combinedText = "";

    while ((match = regex.exec(raw)) !== null) {
      combinedText += match[1];
    }

    return combinedText
           .replace(/\\n/g, '\n')
           .replace(/\n/g, '  \n')
            || raw;
  };

  const cleanContent = getExtractedContent(message.content);

  return (
    <div className={`message ${isUser ? "user" : "assistant"}`}>
      <div className="bubble">
        {isUser ? (
          cleanContent
        ) : (
          <ReactMarkdown>{cleanContent}</ReactMarkdown>
        )}
      </div>
    </div>
  );
}