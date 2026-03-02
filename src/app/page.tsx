"use client";

import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [content, setContent] = useState("");
  const [hashtags, setHashtags] = useState([
    "#networking",
    "#career",
    "#growth",
  ]);
  const maxChars = 3000;
  const progress = (content.length / maxChars) * 100;

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
  };

  return (
    <div className="min-h-screen bg-[#f3f6f8] text-[#191919] font-sans selection:bg-[#0a66c2]/20">
      {/* Header */}
      <nav className="h-16 bg-white border-b border-[#e0e0e0] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#0a66c2] rounded flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-xl leading-none font-serif relative -top-[1px]">
                in
              </span>
            </div>
            <h1 className="text-[20px] font-bold tracking-tight text-[#000000e6]">
              PostCrafter
            </h1>
          </div>
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 bg-[#0a66c2] hover:bg-[#004182] active:scale-[0.98] transition-all text-white font-semibold py-2 px-6 rounded-full text-[14px] shadow-sm"
          >
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
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-2 lg:grid-cols-[1fr,420px] gap-8 items-start">
          {/* Editor Column */}
          <div className="flex flex-col gap-4">
            <div className="bg-white rounded-xl border border-[#e0e0e0] shadow-sm overflow-hidden flex flex-col min-h-[750px] relative">
              {/* Toolbar */}
              <div className="px-6 py-4 border-b border-[#f3f3f3] flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <button className="w-10 h-10 hover:bg-gray-50 rounded flex items-center justify-center text-[16px] font-bold text-gray-700 transition-colors">
                    B
                  </button>
                  <button className="w-10 h-10 hover:bg-gray-50 rounded flex items-center justify-center text-[16px] italic text-gray-700 transition-colors font-serif">
                    I
                  </button>
                  <button className="w-10 h-10 hover:bg-gray-50 rounded flex items-center justify-center transition-colors">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-gray-600"
                    >
                      <line x1="8" y1="6" x2="21" y2="6" />
                      <line x1="8" y1="12" x2="21" y2="12" />
                      <line x1="8" y1="18" x2="21" y2="18" />
                      <circle
                        cx="3"
                        cy="6"
                        r="1.5"
                        fill="currentColor"
                        stroke="none"
                      />
                      <circle
                        cx="3"
                        cy="12"
                        r="1.5"
                        fill="currentColor"
                        stroke="none"
                      />
                      <circle
                        cx="3"
                        cy="18"
                        r="1.5"
                        fill="currentColor"
                        stroke="none"
                      />
                    </svg>
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.1em]">
                    Hashtags:
                  </span>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {hashtags.map((tag) => (
                      <button
                        key={tag}
                        className="px-2.5 py-1 bg-[#f3f6f8] hover:bg-[#e0e0e0] text-[#666666] rounded-md text-[12px] font-semibold transition-colors"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Text Area */}
              <div className="flex-1">
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="What do you want to talk about today?"
                  className="w-full h-full p-8 text-[20px] leading-[1.6] resize-none focus:outline-none placeholder:text-gray-300 text-gray-800"
                />
              </div>

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
                    className={`h-full transition-all duration-500 ease-out`}
                    style={{
                      width: `${Math.min(progress, 100)}%`,
                      backgroundColor:
                        content.length > maxChars ? "#ef4444" : "#0a66c220",
                    }}
                  />
                </div>
              </div>
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

            {/* Pro Tips Card */}
            <div className="bg-white rounded-xl border border-[#e0e0e0] shadow-sm p-6">
              <h2 className="text-[12px] font-bold text-[#666666] uppercase tracking-[0.08em] mb-5">
                Pro Tips
              </h2>
              <ul className="flex flex-col gap-4">
                <li className="flex gap-3 items-start text-[#000000e6]">
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
                    Hook readers in the first 3 lines before the "see more"
                    cutoff.
                  </span>
                </li>
                <li className="flex gap-3 items-start text-[#000000e6]">
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
                    Use white space between paragraphs for better readability.
                  </span>
                </li>
                <li className="flex gap-3 items-start text-[#000000e6]">
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
                    Aim for 3-5 relevant hashtags.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
