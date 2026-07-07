# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository overview

This repo contains two unrelated, independent sub-projects. There is no shared build system, package manifest, or top-level entry point tying them together — treat each as its own root when working in it.

1. `problem solving/` — standalone Python algorithm exercises (no dependencies, no test framework).
2. `autocomplete_extension/` — a Chrome Manifest V3 extension that adds AI ghost-text autocomplete to text inputs on any page.

## `problem solving/`

Plain Python 3 scripts, each self-contained with the problem statement as a comment header followed by a single function. No package manager, requirements file, or test suite — a `.venv` exists locally but isn't part of version control.

- Run a script directly: `python "problem solving/Pair_Finder.py"` (scripts define functions only; add a `if __name__ == "__main__":` block or an interactive `python -i` session to exercise them).
- Follow the existing convention when adding new problems: comment block with the problem statement/examples/constraints above the function, then a solution function named after the problem (e.g. `two_sum`, `three_sum`).

## `autocomplete_extension/`

Chrome extension, Manifest V3, no build step — loaded unpacked directly from source.

- **`manifest.json`** — declares an `activeTab` + `host_permissions` for the OpenRouter API, a background service worker, and a content script injected on `<all_urls>`.
- **`content.js`** — runs in the page context. Watches focused text inputs; once the value is 5+ characters, sends the current text to the background worker via `chrome.runtime.sendMessage({ type: "GET_COMPLETION", text })`, then renders the suggestion as grey "ghost text" in an absolutely-positioned overlay `<div>` layered on top of the real input (mirrors the input's font/padding/rect so the overlay lines up visually).
- **`background.js`** — the only piece allowed to talk to the network (per `host_permissions`). Listens for `GET_COMPLETION` messages, calls OpenRouter's `/chat/completions` endpoint (model: `openai/gpt-4o-mini`, routed through OpenRouter's OpenAI-compatible API), and returns `{ suggestion }` back to the content script via `sendResponse`. This split exists because content scripts can't make cross-origin fetches directly under MV3.
- **To test changes**: load the extension unpacked via `chrome://extensions` → Developer mode → "Load unpacked" → select `autocomplete_extension/`, then reload the extension after edits (background/content script changes both require a manual reload from that page, plus a page refresh for content script changes to take effect).

**API key handling**: the OpenRouter key is never stored in source. `background.js` reads it from `chrome.storage.local` (`openrouterApiKey`), set by the user via `options.html`/`options.js` (right-click extension icon → Options). Keep it that way — never hardcode a key here, even temporarily. History note: a key was once hardcoded and leaked; it was rotated and the fix landed with the storage-based approach.
