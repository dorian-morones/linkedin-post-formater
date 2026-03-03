"use client";

import { FormatType } from "@/lib/formatters";

type Props = {
  onFormat: (type: FormatType) => void;
  activeFormats: Set<FormatType>;
};

const isMac = typeof navigator !== "undefined" && /Mac/.test(navigator.platform);
const mod = isMac ? "⌘" : "Ctrl+";

type ButtonDef = {
  type: FormatType;
  label: string;
  shortcut?: string;
  content: React.ReactNode;
  className?: string;
};

const BUTTONS: ButtonDef[] = [
  {
    type: "bold",
    label: "Bold",
    shortcut: `${mod}B`,
    content: <span className="font-bold text-[16px]">B</span>,
  },
  {
    type: "italic",
    label: "Italic",
    shortcut: `${mod}I`,
    content: <span className="italic text-[16px] font-serif">I</span>,
  },
  {
    type: "underline",
    label: "Underline",
    shortcut: `${mod}U`,
    content: <span className="underline text-[16px]">U</span>,
  },
  {
    type: "strike",
    label: "Strikethrough",
    content: <span className="line-through text-[16px]">S</span>,
  },
  {
    type: "uppercase",
    label: "Uppercase",
    content: <span className="text-[14px] font-bold">AA</span>,
  },
  {
    type: "lowercase",
    label: "Lowercase",
    content: <span className="text-[14px] font-medium">aa</span>,
  },
  {
    type: "monospace",
    label: "Monospace",
    content: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    type: "bullet",
    label: "Bullet List",
    content: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="8" y1="6" x2="21" y2="6" />
        <line x1="8" y1="12" x2="21" y2="12" />
        <line x1="8" y1="18" x2="21" y2="18" />
        <circle cx="3" cy="6" r="1.5" fill="currentColor" stroke="none" />
        <circle cx="3" cy="12" r="1.5" fill="currentColor" stroke="none" />
        <circle cx="3" cy="18" r="1.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
];

export function Toolbar({ onFormat, activeFormats }: Props) {
  return (
    <div className="flex items-center gap-1">
      {BUTTONS.map(({ type, label, shortcut, content }) => {
        const isActive = activeFormats.has(type);
        const title = shortcut ? `${label} (${shortcut})` : label;
        return (
          <button
            key={type}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => onFormat(type)}
            aria-pressed={isActive}
            title={title}
            className={`w-10 h-10 rounded flex items-center justify-center transition-colors ${
              isActive
                ? "bg-[#0a66c2]/10 text-[#0a66c2]"
                : "hover:bg-gray-50 text-gray-700"
            }`}
          >
            {content}
          </button>
        );
      })}
    </div>
  );
}
