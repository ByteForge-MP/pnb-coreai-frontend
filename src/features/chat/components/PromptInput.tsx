import { useState, useRef } from "react";
import "./PromptInput.css";

interface PromptInputProps {
  onSend: (text: string) => void;
  onUpload?: (file: File) => void;
  disabled?: boolean;
  isStreaming?: boolean;
  onStop?: () => void;
}

export default function PromptInput({
  onSend,
  onUpload,
  disabled,
  isStreaming,
  onStop,
}: PromptInputProps) {
  const [value, setValue] = useState("");
  const [showMenu, setShowMenu] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const audioInputRef = useRef<HTMLInputElement>(null);

  const submit = () => {
    if (!value.trim() || disabled || isStreaming) return;
    onSend(value);
    setValue("");
  };

  const handleFile = (file?: File) => {
    if (!file || !onUpload) return;
    onUpload(file);
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

      {/* 📎 Attach Button */}
      <button
        className="attach-btn"
        onClick={() => setShowMenu(!showMenu)}
        disabled={disabled || isStreaming}
      >
        📎
      </button>

      {/* Attach Menu */}
      {showMenu && (
        <div className="attach-menu">
          <div
            onClick={() => {
              fileInputRef.current?.click();
              setShowMenu(false);
            }}
          >
            📄 Upload File
          </div>

          <div
            onClick={() => {
              audioInputRef.current?.click();
              setShowMenu(false);
            }}
          >
            🎤 Upload Voice
          </div>
        </div>
      )}

      {/* Hidden File Inputs */}
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={(e) => handleFile(e.target.files?.[0])}
        accept=".pdf,.doc,.docx,.txt,.xlsx"
      />

      <input
        type="file"
        ref={audioInputRef}
        style={{ display: "none" }}
        onChange={(e) => handleFile(e.target.files?.[0])}
        accept="audio/*"
      />

      {/* Textarea */}
      <textarea
        placeholder="Ask PNB GPT anything..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={disabled || isStreaming}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            submit();
          }
        }}
      />

      {/* Send / Stop Button */}
      <button
        className="send-btn"
        onClick={handleButtonClick}
        disabled={disabled}
      >
        {isStreaming ? "⏹️" : "➤"}
      </button>

    </div>
  );
}
