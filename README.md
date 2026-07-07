# Personal Finance Tracker

A simple, no-dependency personal finance tracker built with **TypeScript**, **HTML**, and **CSS**. Add income and expense transactions, see your running balance update live, and browse your transaction history — all in the browser, no backend required.



## Features

- ➕ Add income or expense transactions with description, amount, and category
- 💰 Live-updating balance calculated from all transactions
- 🛡️ Input validation (empty fields, invalid amounts, negative/zero values)
- 🚫 Prevents expenses that would push your balance negative
- 📜 Scrollable transaction history list, color-coded by type
- 🎨 Clean, animated, glassmorphism-style UI



## Project Structure

```
finance-tracker/
├── index.html      # App markup
├── styles.css      # Styling
├── app.ts          # TypeScript source
├── app.js          # Compiled JavaScript (generated from app.ts)
└── tsconfig.json   # TypeScript compiler configuration
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (for the TypeScript compiler)
- TypeScript installed globally or as a dev dependency:

```bash
npm install -D typescript
```

### Build

Compile `app.ts` into `app.js`:

```bash
npx tsc
```

### Run

Just open `index.html` in a browser — no server or bundler required.

## Tech Stack

- **TypeScript** — app logic with strict typing
- **HTML5** — structure
- **CSS3** — styling, animations, glassmorphism effects

## How It Works

1. Fill in the transaction form (description, amount, type, category).
2. On submit, the app validates the input and checks that expenses don't exceed your current balance.
3. A new transaction is added to the in-memory list, and the UI re-renders:
   - Balance display updates
   - Transaction history list updates, with income shown in green and expenses in red

## Configuration Notes

This project compiles TypeScript for the **browser**, not Node.js. In `tsconfig.json`, make sure:

```jsonc
"module": "esnext"
```

is set (not `"commonjs"` or `"nodenext"`), otherwise the compiler emits Node-style `exports`/`require` code that will throw a `ReferenceError: exports is not defined` in the browser and break the app.
