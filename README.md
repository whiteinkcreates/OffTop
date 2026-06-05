# OffTop

No pen. No prep. Just bars.

A freestyle rap practice challenge generator. Train with random words, themes, bar counts, timers, personas, and constraints.

## Phase 1 Features

- **SpitKit**: The freestyle drill generator
- **Cipher Deck**: Challenge card system
- **ColdBars**: Hard mode
- **Final Boss**: Ridiculous/extreme mode
- Random word generation (3-5 words)
- Theme selection and randomization
- Bar count selector (4, 8, 16, 32)
- Timer with start/pause/reset (30s - 5m)
- Difficulty modes: Rookie, Open Mic, Cipher, ColdBars, Final Boss
- Constraint toggles
- Persona mode
- Session history with localStorage
- Copy drill functionality
- Mobile-first responsive design

## Tech Stack

- Next.js 15
- React 18
- TypeScript
- Tailwind CSS
- localStorage (no database)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
app/
  layout.tsx
  page.tsx
components/
  SpitKitGenerator.tsx
  CipherDeckCard.tsx
  Timer.tsx
  SelectorControls.tsx
  HistoryList.tsx
  ToggleControl.tsx
  PillWordList.tsx
data/
  wordBanks.ts
  themes.ts
  personas.ts
  difficulties.ts
types/
  index.ts
styles/
  globals.css
```

## Build Status

Phase 1: In Development
