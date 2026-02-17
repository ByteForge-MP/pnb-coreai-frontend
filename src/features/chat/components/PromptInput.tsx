
import { useState } from "react";
import "./PromptInput.css";
import sendIcon from "../../../assets/send.svg";
import stopIcon from "../../../assets/stop.svg";

export default function PromptInput({
  onSend,
  disabled,
  isStreaming,
  onStop,
}: {
  onSend: (text: string) => void;
  disabled?: boolean;
  isStreaming?: boolean;
  onStop?: () => void;
}) {
  const [value, setValue] = useState("");

  const submit = () => {
    if (!value.trim() || disabled || isStreaming) return;
    onSend(value);
    setValue("");
  };

  const handleButtonClick = () => {
    if (isStreaming && onStop) {
      onStop();
    } else {
      submit();
    }
  };

  return (
    <div className="prompt-box">
      <textarea
        placeholder="Ask PNB OneAI anything..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && submit()}
        disabled={disabled || isStreaming}
      />
      <button onClick={handleButtonClick} disabled={disabled} aria-label={isStreaming ? "Stop" : "Send"}>
        <img src={isStreaming ? stopIcon : sendIcon} alt={isStreaming ? "Stop" : "Send"} style={{ width: 24, height: 24 }} />
      </button>
    </div>
  );
}
