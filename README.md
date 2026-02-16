# Nicholas Malan — Scroll-Driven Portfolio

A premium, cinematic, scroll-driven storytelling portfolio built with **vanilla HTML, CSS, and JavaScript** — no frameworks, no build step.

## Quick Start

### Option A: VS Code Live Server (recommended)

1. Open this folder in VS Code.
2. Install the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension.
3. Right-click `index.html` → **Open with Live Server**.

### Option B: Any static server

```bash
# Python 3
python -m http.server 8000

# Node (npx)
npx serve .

# PHP
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

## Project Structure

```
├── index.html              # Semantic HTML shell (DOM rendered by JS)
├── css/
│   └── style.css           # Full design — dark theme, typography, animations
├── js/
│   ├── content.js          # ✏️ Edit all copy, projects, skills here
│   ├── scroll-engine.js    # Lightweight scroll engine (ScrollScene system)
│   └── main.js             # App logic — renders DOM, registers scenes, animations
├── assets/
│   └── placeholder.txt     # Drop images here (hero-bg.jpg, project-*.jpg, etc.)
└── README.md
```

## How to Edit Content

All text, projects, skills, and links live in **`js/content.js`**. Edit the `CONTENT` object — no HTML changes needed.

## Architecture

- **ScrollEngine** — rAF loop that reads scroll position once per frame, computes per-scene progress (0→1), and calls registered callbacks. Uses lerp-based smooth state without hijacking native scroll.
- **ScrollScene** — Each section registers with the engine, receiving `onEnter`, `onLeave`, and `onProgress(0→1)` callbacks.
- **IntersectionObserver** — Used for visibility optimisation (scenes outside viewport are skipped).
- **5 animation patterns**: hero parallax, split-story highlight shift, skills step snap, project card pin+expand, timeline draw+reveal.

## Accessibility

- Semantic `<section>`, `<main>`, `<nav>`, `<footer>` elements
- Proper heading hierarchy (`h1` → `h2` → `h3` → `h4`)
- ARIA labels on sections and interactive elements
- Visible focus styles (`:focus-visible`)
- Keyboard-navigable dots and buttons
- `prefers-reduced-motion` support (disables transforms + smoothing)

## Browser Support

Modern browsers: Chrome, Firefox, Safari, Edge (ES6+, `IntersectionObserver`, CSS custom properties).

## License

Personal portfolio — all rights reserved.
