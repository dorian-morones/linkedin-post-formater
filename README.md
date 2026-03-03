# ✍️ Postmator — LinkedIn Post Formatter

Format your LinkedIn posts with **bold**, *italic*, underline, strikethrough, monospace, and more — all using Unicode characters that paste perfectly into LinkedIn.

---

## What it does

LinkedIn's text editor is plain text — it doesn't support HTML or rich text. Postmator works around this by converting your text into Unicode mathematical symbols that LinkedIn renders as styled text.

Write your post, select any part of it, apply a format, and copy it straight to LinkedIn.

### Supported formats

| Style | How to apply |
|---|---|
| **Bold** | Click B or `Cmd/Ctrl + B` |
| *Italic* | Click I or `Cmd/Ctrl + I` |
| Bold Italic | Apply bold + italic together |
| Underline | Click U or `Cmd/Ctrl + U` |
| Strikethrough | Click S |
| UPPERCASE / lowercase | Click AA or aa |
| `Monospace` | Click the `</>` button |
| • Bullet list | Click the bullet button |

### Key behaviours

- **Toggle** — selecting already-formatted text and clicking the same format removes it
- **Combine** — bold and italic work independently, so you can apply both to get bold italic
- **Live preview** — the right panel shows exactly how your post will look on LinkedIn
- **Keyboard shortcuts** — `Cmd/Ctrl + B / I / U` work while the editor is focused
- **Active state** — toolbar buttons highlight when the selected text already has that format applied

---

## Tech stack

- [Next.js 16](https://nextjs.org/) — React framework (App Router)
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS 4](https://tailwindcss.com/)

---

## Project structure

```
src/
├── app/
│   ├── layout.tsx           # Root layout + SEO metadata
│   └── page.tsx             # Main page — composes everything
├── components/
│   └── Toolbar.tsx          # Format buttons (pure UI)
├── hooks/
│   └── useTextFormatter.ts  # Selection, formatting logic, keyboard shortcuts
└── lib/
    └── formatters.ts        # Formatter registry — add a new style here
```

### Adding a new format

All formatting logic lives in `src/lib/formatters.ts`. Each format is a self-contained object:

```ts
export const FORMATTERS: Record<FormatType, Formatter> = {
  // Add your new format here:
  myFormat: {
    label: "My Format",
    apply: (text) => /* convert text */,
    strip: (text) => /* revert text */,
    detect: (text) => /* return true if already formatted */,
  },
}
```

Then add a button for it in `src/components/Toolbar.tsx`. Nothing else needs to change.

---

## Running locally

**Requirements:** Node.js 18+ and [pnpm](https://pnpm.io/)

```bash
# 1. Clone the repo
git clone https://github.com/dorianmorones/linkedin-post-formater.git
cd linkedin-post-formater

# 2. Install dependencies
pnpm install

# 3. Start the dev server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Other commands

```bash
pnpm build    # Production build
pnpm start    # Start production server
pnpm lint     # Run ESLint
```

---

## Author

**[Dorian Morones](https://dorianmorones-com.vercel.app/projects)**
