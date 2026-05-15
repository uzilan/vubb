# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start Vite dev server
npm run build        # Type-check + build (parallel)
npm run build-only   # Vite build only
npm run type-check   # vue-tsc type check
npm run lint         # ESLint with auto-fix
npm run format       # Prettier format
```

No test suite configured.

## Architecture

UBB card game score tracker. Vue 3 SPA — no router. Navigation driven by conditional rendering based on auth state and app phase.

**Component flow:**
```
App.vue → Start.vue (orchestrator)
  Auth.vue              → Google login gate
  Players.vue           → player count/name setup
  Boards.vue            → tab switcher (normal/long/longer board variants)
    boards/Board.vue        → 7-set game
    boards/LongBoard.vue    → extended game
    boards/LongerBoard.vue  → longest variant
  stats/Stats.vue       → game history and player stats (Chart.js)
  Instructions.vue      → game rules
  Reset.vue             → reset game state
  GameSaved.vue         → save confirmation
```

**State (Pinia):**
- `AuthStore` — Firebase Auth user + ID token (not persisted)
- `PlayersStore` — player names and points arrays, **persisted to localStorage**
- `GamesStore` — Firestore games list, loading state, save action

**Backend:** Firebase (project `ubb-spel-aebae`)
- Firestore: game persistence
- Auth: Google OAuth via `src/credentials.ts`

**Key data models** (`src/models/`):
- `Player` — `{ name, points[], longerPoints[] }`
- `Game` — `{ playerNames[], rows[], winner, date, savedBy }`
- `Row` — per-player score row with fields `ss, sl, ll, sss, ssl, sll, lll, sum`

## Code Style

- Prettier: no semicolons, single quotes, 100-char lines, no trailing commas, 2-space indent
- ESLint: flat config; multi-word component name rule disabled
- Path alias: `@` → `src/`
- UI components from CoreUI Vue (`@coreui/vue`)
- DateTime via Luxon
- i18n via vue-i18n; browser language detection, English fallback