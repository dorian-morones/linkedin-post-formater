import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Postmator — LinkedIn Post Formatter",
  description:
    "Format your LinkedIn posts with bold, italic, underline, strikethrough, and more. Write, style, and copy in seconds.",
  keywords: [
    "LinkedIn post formatter",
    "LinkedIn text formatter",
    "bold text LinkedIn",
    "italic text LinkedIn",
    "Unicode text formatter",
    "LinkedIn post editor",
  ],
  openGraph: {
    title: "Postmator — LinkedIn Post Formatter",
    description:
      "Format your LinkedIn posts with bold, italic, underline, strikethrough, and more. Write, style, and copy in seconds.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Postmator — LinkedIn Post Formatter",
    description:
      "Format your LinkedIn posts with bold, italic, underline, and more. Write, style, and copy in seconds.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
