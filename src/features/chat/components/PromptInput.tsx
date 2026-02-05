import { useState } from "react";

export default function PromptInput({
  onSend,
  disabled,
}: {
  onSend: (text: string) => void;
  disabled?: boolean;
}) {
  const [value, setValue] = useState("");

  const submit = () => {
    if (!value.trim()) return;
    onSend(value);
    setValue("");
  };

  return (
    <div className="prompt-box">
      <textarea
        placeholder="Ask PNB OneAI anything..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && submit()}
      />
      <button onClick={submit} disabled={disabled}>
        Send
      </button>
    </div>
  );
}
