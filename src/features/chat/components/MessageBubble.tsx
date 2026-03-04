import ReactMarkdown from 'react-markdown';
import { Message } from "../types/chat";
import "./MessageBubble.css";

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
  let text = combinedText || raw;
  console.log("Extracted Text:", text);
  try {
    text = JSON.parse(`"${text}"`);
  } catch {
    // ignore decoding errors
  }
  // normalize spacing
  text = text
    .replace(/\n\n+/g, "\n")   // remove extra blank lines
    .trim();
  return text
  
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