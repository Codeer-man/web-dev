// CopyInput.tsx
import { useState } from "react";
import PopContent from "./popCpntent";

export default function CopyInput() {
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState<boolean>(false);

  function handleClick() {
    navigator.clipboard.writeText(input).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div>
      <input
        type="text"
        placeholder="input in here"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={handleClick}>Copy</button>
      <PopContent copied={copied} />
    </div>
  );
}
