import { useState, useRef } from "react";
import "./PromptInput.css";

interface PromptInputProps {
  onSend: (text: string, file?: File | null) => void;
  disabled?: boolean;
  isStreaming?: boolean;
  onStop?: () => void;
}

export default function PromptInput({
  onSend,
  disabled,
  isStreaming,
  onStop,
}: PromptInputProps) {
  const [value, setValue] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const audioInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (
    file?: File,
    input?: HTMLInputElement | null
  ) => {
    if (!file) return;

    setSelectedFile(file);

    if (input) input.value = "";
  };

  const submit = () => {
    if ((!value.trim() && !selectedFile) || disabled || isStreaming) return;

    onSend(value, selectedFile);

    setValue("");
    setSelectedFile(null);
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

      {selectedFile && (
        <div className="file-preview">
          <span style={{ color: "black" }}>{selectedFile.name}</span>
          <button onClick={() => setSelectedFile(null)}><img width={15} height={15} src="/cross.svg" /></button>
        </div>
      )}

      <button
        className="attach-btn"
        onClick={() => setShowMenu(!showMenu)}
        disabled={disabled || isStreaming}
      >
      <img width={15} height={15} src="/attachment.svg" />
      </button>

      {showMenu && (
        <div className="attach-menu">
          <div
            onClick={() => {
              fileInputRef.current?.click();
              setShowMenu(false);
            }}
          >
          <img width={15} height={15} src="/file.svg" /> Upload File
          </div>

          <div
            onClick={() => {
              audioInputRef.current?.click();
              setShowMenu(false);
            }}
          >
          <img width={15} height={15} src="/mic.svg" /> Upload Voice
          </div>
        </div>
      )}

      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={(e) =>
          handleFile(e.target.files?.[0], e.target)
        }
        accept=".pdf,.doc,.docx,.txt,.xlsx"
      />

      <input
        type="file"
        ref={audioInputRef}
        style={{ display: "none" }}
        onChange={(e) =>
          handleFile(e.target.files?.[0], e.target)
        }
        accept="audio/*"
      />

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

      <button
        className="send-btn"
        onClick={handleButtonClick}
        disabled={disabled}
      >
      <img 
        width={15} 
        height={15} 
        src={isStreaming ? "/stop.svg" : "/send.svg"}
      /> 
      </button>
    </div>
  );
}