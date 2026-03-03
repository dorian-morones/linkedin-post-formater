"use client";

import { useEffect, useState, RefObject } from "react";
import { FORMATTERS, FormatType } from "@/lib/formatters";

export function useTextFormatter(
  textareaRef: RefObject<HTMLTextAreaElement | null>,
  content: string,
  setContent: (value: string) => void,
) {
  const [activeFormats, setActiveFormats] = useState<Set<FormatType>>(new Set());

  // Update active formats based on selection
  function updateActiveFormats() {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = content.substring(start, end);

    if (!selected) {
      setActiveFormats(new Set());
      return;
    }

    const active = new Set<FormatType>();
    for (const [type, formatter] of Object.entries(FORMATTERS) as [FormatType, typeof FORMATTERS[FormatType]][]) {
      if (formatter.detect(selected)) {
        active.add(type);
      }
    }
    setActiveFormats(active);
  }

  function applyFormat(type: FormatType) {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    const formatter = FORMATTERS[type];

    let newText: string;

    if (type === "bullet") {
      if (!selectedText) {
        const beforeCursor = content.slice(0, start);
        newText = !beforeCursor.endsWith("\n") && start !== 0 ? "\n• " : "• ";
      } else {
        newText = formatter.apply(selectedText);
      }
    } else {
      if (!selectedText) return;
      newText = formatter.detect(selectedText)
        ? formatter.strip(selectedText)
        : formatter.apply(selectedText);
    }

    const updatedContent = content.substring(0, start) + newText + content.substring(end);
    setContent(updatedContent);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start, start + newText.length);
      updateActiveFormats();
    }, 0);
  }

  // Keyboard shortcuts
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const isMod = e.metaKey || e.ctrlKey;
      if (!isMod) return;

      const shortcutMap: Partial<Record<string, FormatType>> = {
        b: "bold",
        i: "italic",
        u: "underline",
      };

      const type = shortcutMap[e.key.toLowerCase()];
      if (!type) return;

      // Only intercept when textarea is focused
      if (document.activeElement !== textareaRef.current) return;

      e.preventDefault();
      applyFormat(type);
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content]);

  return { applyFormat, activeFormats, updateActiveFormats };
}
