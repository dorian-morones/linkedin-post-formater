export type FormatType =
  | "bold"
  | "italic"
  | "underline"
  | "strike"
  | "uppercase"
  | "lowercase"
  | "bullet"
  | "monospace";

export type Formatter = {
  label: string;
  shortcut?: string;
  apply: (text: string) => string;
  strip: (text: string) => string;
  detect: (text: string) => boolean;
};

// Unicode Mathematical Sans-Serif code point bases
const PLAIN_CAPS = 65;
const PLAIN_LOWER = 97;
const PLAIN_DIGITS = 48;

const SANS_CAPS = 0x1d5a0;         // 𝖠–𝖹  sans-serif (plain)
const SANS_LOWER = 0x1d5ba;        // 𝖺–𝗓
const SANS_DIGITS = 0x1d7e2;       // 𝟢–𝟫

const BOLD_CAPS = 0x1d5d4;         // 𝗔–𝗭  sans-serif bold
const BOLD_LOWER = 0x1d5ee;        // 𝗮–𝘇
const BOLD_DIGITS = 0x1d7ec;       // 𝟬–𝟵

const ITALIC_CAPS = 0x1d608;       // 𝘈–𝘡  sans-serif italic
const ITALIC_LOWER = 0x1d622;      // 𝘢–𝘻

const BOLD_ITALIC_CAPS = 0x1d63c;  // 𝘼–𝙕  sans-serif bold italic
const BOLD_ITALIC_LOWER = 0x1d656; // 𝙖–𝙯

const MONO_CAPS = 0x1d670;         // 𝙰–𝚉  monospace
const MONO_LOWER = 0x1d68a;        // 𝚊–𝚣
const MONO_DIGITS = 0x1d7f6;       // 𝟶–𝟿

// Represent the formatting state of one alphabetic character.
type CharState = {
  base: number;    // 0-based index (A/a = 0 … Z/z = 25, 0-9 = 0-9)
  upper: boolean;
  digit: boolean;
  bold: boolean;
  italic: boolean;
};

/** Decode a code point into its formatting state, or return null for non-letter/digit chars. */
function getCharState(cp: number): CharState | null {
  // plain ASCII letters
  if (cp >= PLAIN_CAPS && cp <= PLAIN_CAPS + 25)
    return { base: cp - PLAIN_CAPS, upper: true, digit: false, bold: false, italic: false };
  if (cp >= PLAIN_LOWER && cp <= PLAIN_LOWER + 25)
    return { base: cp - PLAIN_LOWER, upper: false, digit: false, bold: false, italic: false };
  // plain ASCII digits
  if (cp >= PLAIN_DIGITS && cp <= PLAIN_DIGITS + 9)
    return { base: cp - PLAIN_DIGITS, upper: false, digit: true, bold: false, italic: false };

  // sans-serif (plain) letters — e.g. 𝖠𝖡𝖢 / 𝖺𝖻𝖼
  if (cp >= SANS_CAPS && cp <= SANS_CAPS + 25)
    return { base: cp - SANS_CAPS, upper: true, digit: false, bold: false, italic: false };
  if (cp >= SANS_LOWER && cp <= SANS_LOWER + 25)
    return { base: cp - SANS_LOWER, upper: false, digit: false, bold: false, italic: false };
  // sans-serif (plain) digits — e.g. 𝟢𝟣𝟤
  if (cp >= SANS_DIGITS && cp <= SANS_DIGITS + 9)
    return { base: cp - SANS_DIGITS, upper: false, digit: true, bold: false, italic: false };

  // bold letters
  if (cp >= BOLD_CAPS && cp <= BOLD_CAPS + 25)
    return { base: cp - BOLD_CAPS, upper: true, digit: false, bold: true, italic: false };
  if (cp >= BOLD_LOWER && cp <= BOLD_LOWER + 25)
    return { base: cp - BOLD_LOWER, upper: false, digit: false, bold: true, italic: false };
  // bold digits
  if (cp >= BOLD_DIGITS && cp <= BOLD_DIGITS + 9)
    return { base: cp - BOLD_DIGITS, upper: false, digit: true, bold: true, italic: false };

  // italic letters (no italic digits in Unicode)
  if (cp >= ITALIC_CAPS && cp <= ITALIC_CAPS + 25)
    return { base: cp - ITALIC_CAPS, upper: true, digit: false, bold: false, italic: true };
  if (cp >= ITALIC_LOWER && cp <= ITALIC_LOWER + 25)
    return { base: cp - ITALIC_LOWER, upper: false, digit: false, bold: false, italic: true };

  // bold-italic letters
  if (cp >= BOLD_ITALIC_CAPS && cp <= BOLD_ITALIC_CAPS + 25)
    return { base: cp - BOLD_ITALIC_CAPS, upper: true, digit: false, bold: true, italic: true };
  if (cp >= BOLD_ITALIC_LOWER && cp <= BOLD_ITALIC_LOWER + 25)
    return { base: cp - BOLD_ITALIC_LOWER, upper: false, digit: false, bold: true, italic: true };

  return null;
}

/** Re-encode a CharState back to a Unicode character. */
function charFromState(s: CharState): string {
  if (s.digit) {
    return s.bold
      ? String.fromCodePoint(BOLD_DIGITS + s.base)
      : String.fromCharCode(PLAIN_DIGITS + s.base);
  }
  if (!s.bold && !s.italic)
    return String.fromCharCode((s.upper ? PLAIN_CAPS : PLAIN_LOWER) + s.base);
  if (s.bold && !s.italic)
    return String.fromCodePoint((s.upper ? BOLD_CAPS : BOLD_LOWER) + s.base);
  if (!s.bold && s.italic)
    return String.fromCodePoint((s.upper ? ITALIC_CAPS : ITALIC_LOWER) + s.base);
  // bold && italic
  return String.fromCodePoint((s.upper ? BOLD_ITALIC_CAPS : BOLD_ITALIC_LOWER) + s.base);
}

/** Map each character through a state transform, leaving non-letter/digit chars untouched. */
function mapChars(text: string, transform: (s: CharState) => CharState): string {
  return Array.from(text)
    .map((char) => {
      const cp = char.codePointAt(0);
      if (cp === undefined) return char;
      const state = getCharState(cp);
      return state ? charFromState(transform(state)) : char;
    })
    .join("");
}

/**
 * Returns true when every letter/digit character in `text` satisfies `predicate`.
 * Non-letter/digit characters are ignored (spaces, punctuation, etc.).
 * Returns false if the text contains no letter/digit characters.
 */
function everyLetter(text: string, predicate: (s: CharState) => boolean): boolean {
  const letters = Array.from(text).filter((char) => {
    const cp = char.codePointAt(0);
    return cp !== undefined && getCharState(cp) !== null;
  });
  if (letters.length === 0) return false;
  return letters.every((char) => {
    const state = getCharState(char.codePointAt(0)!)!;
    return predicate(state);
  });
}

export const FORMATTERS: Record<FormatType, Formatter> = {
  bold: {
    label: "Bold",
    shortcut: "mod+b",
    // Toggles bold on while keeping italic intact → may produce bold-italic
    apply: (text) => mapChars(text, (s) => ({ ...s, bold: true })),
    // Toggles bold off while keeping italic intact → may produce pure italic
    strip: (text) => mapChars(text, (s) => ({ ...s, bold: false })),
    detect: (text) => everyLetter(text, (s) => s.bold),
  },

  italic: {
    label: "Italic",
    shortcut: "mod+i",
    // Toggles italic on while keeping bold intact → may produce bold-italic
    apply: (text) => mapChars(text, (s) => ({ ...s, italic: true })),
    // Toggles italic off while keeping bold intact → may produce pure bold
    strip: (text) => mapChars(text, (s) => ({ ...s, italic: false })),
    detect: (text) => everyLetter(text, (s) => s.italic),
  },

  underline: {
    label: "Underline",
    shortcut: "mod+u",
    apply: (text) => text.split("").map((c) => c + "\u0332").join(""),
    strip: (text) => text.replace(/\u0332/g, ""),
    detect: (text) => /\u0332/.test(text),
  },

  strike: {
    label: "Strikethrough",
    apply: (text) => text.split("").map((c) => c + "\u0336").join(""),
    strip: (text) => text.replace(/\u0336/g, ""),
    detect: (text) => /\u0336/.test(text),
  },

  uppercase: {
    label: "Uppercase",
    apply: (text) => text.toUpperCase(),
    strip: (text) => text.toLowerCase(),
    detect: (text) => text === text.toUpperCase() && text !== text.toLowerCase(),
  },

  lowercase: {
    label: "Lowercase",
    apply: (text) => text.toLowerCase(),
    strip: (text) => text.toUpperCase(),
    detect: (text) => text === text.toLowerCase() && text !== text.toUpperCase(),
  },

  bullet: {
    label: "Bullet List",
    apply: (text) =>
      text
        .split("\n")
        .map((line) => (line.trim() ? `• ${line}` : line))
        .join("\n"),
    strip: (text) => text.replace(/^• /gm, ""),
    detect: (text) => /^• /m.test(text),
  },

  monospace: {
    label: "Monospace",
    apply: (text) =>
      Array.from(text)
        .map((char) => {
          const cp = char.codePointAt(0)!;
          if (cp >= 65 && cp <= 90) return String.fromCodePoint(MONO_CAPS + (cp - 65));
          if (cp >= 97 && cp <= 122) return String.fromCodePoint(MONO_LOWER + (cp - 97));
          if (cp >= 48 && cp <= 57) return String.fromCodePoint(MONO_DIGITS + (cp - 48));
          return char;
        })
        .join(""),
    strip: (text) =>
      Array.from(text)
        .map((char) => {
          const cp = char.codePointAt(0)!;
          if (cp >= MONO_CAPS && cp <= MONO_CAPS + 25) return String.fromCharCode(cp - MONO_CAPS + 65);
          if (cp >= MONO_LOWER && cp <= MONO_LOWER + 25) return String.fromCharCode(cp - MONO_LOWER + 97);
          if (cp >= MONO_DIGITS && cp <= MONO_DIGITS + 9) return String.fromCharCode(cp - MONO_DIGITS + 48);
          return char;
        })
        .join(""),
    detect: (text) =>
      Array.from(text).some((char) => {
        const cp = char.codePointAt(0)!;
        return (
          (cp >= MONO_CAPS && cp <= MONO_CAPS + 25) ||
          (cp >= MONO_LOWER && cp <= MONO_LOWER + 25) ||
          (cp >= MONO_DIGITS && cp <= MONO_DIGITS + 9)
        );
      }),
  },
};
