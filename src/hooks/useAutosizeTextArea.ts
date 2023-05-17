import { useEffect } from "react";

export default function useAutosizeTextArea(
  textArea: HTMLTextAreaElement | null,
  value: string
) {
  useEffect(() => {
    if (textArea) {
      updateTextAreaSize(textArea);
    }
  }, [textArea, value]);
}

function updateTextAreaSize(textArea: HTMLTextAreaElement | null) {
  if (!textArea) return;

  textArea.style.height = "0";
  textArea.style.height = `${textArea.scrollHeight}px`;
}
