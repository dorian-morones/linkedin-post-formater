"use client";

import { useState, useRef } from "react";
import { Toolbar } from "@/components/Toolbar";
import { useTextFormatter } from "@/hooks/useTextFormatter";

export default function Home() {
  const [content, setContent] = useState("");
  const [copied, setCopied] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const maxChars = 3000;
  const progress = (content.length / maxChars) * 100;

  const { applyFormat, activeFormats, updateActiveFormats } = useTextFormatter(
    textareaRef,
    content,
    setContent,
  );

  const handleCopy = async () => {
    if (!content) return;
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for browsers that block clipboard API
      const ta = document.createElement("textarea");
      ta.value = content;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-[#f4f4f5] to-[#d4d4d8] text-[#191919] font-sans selection:bg-[#0a66c2]/20">
      {/* Header */}
      <nav className="h-16 bg-white border-b border-[#e0e0e0] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">
          <h1 className="flex items-center gap-2 text-[20px] font-bold tracking-tight text-[#000000e6]">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
            </svg>
            Postmator
          </h1>
          <button
            onClick={handleCopy}
            disabled={!content}
            className={`flex items-center gap-2 transition-all font-semibold py-2 px-6 rounded-full text-[14px] shadow-sm active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed ${
              copied
                ? "bg-[#7c6f5b] hover:bg-[#6b5f4d] text-[#fdf8f0]"
                : "bg-[#c8b89a] hover:bg-[#b8a88a] text-[#3d2f1f]"
            }`}
          >
            {copied ? (
              <>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-1"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Copied!
              </>
            ) : (
              <>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-1"
                >
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
                Copy to Clipboard
              </>
            )}
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-2 lg:grid-cols-[1fr,420px] gap-8 items-start">
          {/* Editor Column */}
          <div className="flex flex-col gap-4">
            <div className="bg-white rounded-xl border border-[#e0e0e0] shadow-sm overflow-hidden flex flex-col min-h-[650px] relative">
              {/* Toolbar */}
              <div className="px-6 py-4 border-b border-[#f3f3f3]">
                <Toolbar onFormat={applyFormat} activeFormats={activeFormats} />
              </div>

              {/* Text Area */}
              <textarea
                ref={textareaRef}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                onSelect={updateActiveFormats}
                onKeyUp={updateActiveFormats}
                onMouseUp={updateActiveFormats}
                placeholder="What do you want to talk about today?"
                className="flex-1 w-full p-8 text-[20px] leading-[1.6] resize-none focus:outline-none placeholder:text-gray-300 text-gray-800"
              />

              {/* Progress Footer */}
              <div className="px-8 py-5 border-t border-[#f3f3f3] flex items-center justify-between bg-white">
                <div className="text-[14px] font-medium text-gray-500">
                  <span
                    className={
                      content.length > maxChars
                        ? "text-red-500 font-bold"
                        : "text-gray-800"
                    }
                  >
                    {content.length.toLocaleString()}
                  </span>{" "}
                  / {maxChars.toLocaleString()} characters
                </div>
                <div className="w-[180px] h-2 bg-[#f3f6f8] rounded-full overflow-hidden">
                  <div
                    className="h-full transition-all duration-500 ease-out"
                    style={{
                      width: `${Math.min(progress, 100)}%`,
                      backgroundColor:
                        content.length > maxChars ? "#ef4444" : "#0a66c220",
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Pro Tips Card */}
            <div className="bg-white rounded-xl border border-[#e0e0e0] shadow-sm p-6">
              <h2 className="text-[12px] font-bold text-[#666666] uppercase tracking-[0.08em] mb-5">
                Pro Tips
              </h2>
              <ul className="flex flex-col gap-4">
                {[
                  "Hook readers in the first 3 lines before the \u201csee more\u201d cutoff.",
                  "Use white space between paragraphs for better readability.",
                  "Aim for 3-5 relevant hashtags.",
                ].map((tip) => (
                  <li
                    key={tip}
                    className="flex gap-3 items-start text-[#000000e6]"
                  >
                    <div className="text-green-600 shrink-0 mt-0.5">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <span className="text-[13px] leading-relaxed font-medium">
                      {tip}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar Column */}
          <div className="flex flex-col gap-6 sticky top-[100px]">
            {/* Live Feed Preview */}
            <div className="bg-white rounded-xl border border-[#e0e0e0] shadow-sm flex flex-col p-6">
              <h2 className="text-[12px] font-bold text-[#666666] uppercase tracking-[0.08em] mb-5">
                Live Feed Preview
              </h2>

              <div className="border border-[#e0e0e0] rounded-lg overflow-hidden flex flex-col">
                {/* User Info Header */}
                <div className="p-4 flex gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-[#fde8d8] flex items-center justify-center shrink-0">
                    <svg viewBox="0 0 100 100" className="w-9 h-9 opacity-80">
                      <circle cx="50" cy="40" r="22" fill="#a55d40" />
                      <path
                        d="M15,95 Q50,70 85,95"
                        stroke="#a55d40"
                        strokeWidth="10"
                        fill="none"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-1 leading-tight mb-0.5">
                      <span className="font-bold text-[14px] text-[#000000e6] hover:text-[#0a66c2] hover:underline cursor-pointer truncate">
                        Your Name
                      </span>
                      <span className="text-[#666666] text-[12px] shrink-0">
                        • 1st
                      </span>
                    </div>
                    <span className="text-[12px] text-[#666666] leading-tight truncate">
                      Professional Headline | Expert in Crafting Content
                    </span>
                    <div className="flex items-center gap-1 mt-0.5">
                      <span className="text-[11px] text-[#666666]">Now</span>
                      <span className="text-[#666666] text-[10px]">•</span>
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="text-[#666666]"
                      >
                        <circle cx="12" cy="12" r="10" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Content Area */}
                <div className="px-4 pb-16 pt-1 min-h-[140px]">
                  {content ? (
                    <div className="text-[14px] text-[#000000e6] whitespace-pre-wrap leading-[1.5] transition-all">
                      {content}
                    </div>
                  ) : (
                    <div className="text-[14px] text-[#00000099] font-medium leading-[1.5]">
                      Start typing to see your preview...
                    </div>
                  )}
                </div>

                {/* Interaction Footer */}
                <div className="px-2 py-1 border-t border-[#f3f3f3] flex items-center text-[#666666] font-semibold text-[14px]">
                  <button className="flex-1 flex items-center justify-center gap-1.5 hover:bg-[#f3f6f8] py-2.5 rounded transition-colors group">
                    <svg
                      className="group-hover:text-[#0a66c2]"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M7 10v12" />
                      <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
                    </svg>
                    <span className="group-hover:text-[#0a66c2]">Like</span>
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-1.5 hover:bg-[#f3f6f8] py-2.5 rounded transition-colors group">
                    <svg
                      className="group-hover:text-[#0a66c2]"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 15a2 2 0 0 1-2 2H7l4 4V7a2 2 0 1 1 4 0v8a2 2 0 1 1-2 2h-1" />
                    </svg>
                    <span className="group-hover:text-[#0a66c2]">Comment</span>
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-1.5 hover:bg-[#f3f6f8] py-2.5 rounded transition-colors group">
                    <svg
                      className="group-hover:text-[#0a66c2]"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m22 2-7 20-4-9-9-4Z" />
                      <path d="M22 2 11 13" />
                    </svg>
                    <span className="group-hover:text-[#0a66c2]">Share</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-[#e0e0e0] flex items-center justify-center py-2.5 gap-2 text-[13px] text-[#888888]">
        <span>Crafted with</span>
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#a0522d"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
          <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
          <line x1="6" y1="2" x2="6" y2="4" />
          <line x1="10" y1="2" x2="10" y2="4" />
          <line x1="14" y1="2" x2="14" y2="4" />
        </svg>
        <span>by</span>
        <a
          href="https://dorianmorones-com.vercel.app/projects"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-[#191919] hover:text-[#0a66c2] transition-colors underline underline-offset-2 decoration-dotted"
        >
          Dorian Morones
        </a>
      </footer>
    </div>
  );
}
