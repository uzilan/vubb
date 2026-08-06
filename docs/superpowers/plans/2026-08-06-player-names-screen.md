# Player Names Screen Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a screen for entering player names between the game-type/player-count screen and the score board, replacing the inline name inputs currently on the board header row.

**Architecture:** A new `PlayerNames.vue` component renders one `PlayerNameInput` per player from `playersStore.players`. A new `namesConfirmed` boolean in `PlayersStore` (persisted) drives a 3-way screen gate in `Start.vue`. The three board variants (`Board.vue`, `LongBoard.vue`, `LongerBoard.vue`) stop rendering an editable name input and instead show the name as plain text.

**Tech Stack:** Vue 3 `<script setup>`, Pinia (with `pinia-plugin-persistedstate`, given `persist: true` on the store), CoreUI Vue components, vue-i18n. No test suite configured in this repo — verification is via `npm run type-check`, `npm run lint`, and manual checks with `npm run dev`.

## Global Constraints

- Prettier: no semicolons, single quotes, 100-char lines, no trailing commas, 2-space indent.
- Path alias `@` → `src/`.
- i18n: every new user-facing string needs both `en` and `sv` entries in `src/i18n.ts`.
- Follow existing component/store patterns exactly (see `Players.vue`, `PlayersStore.ts` for style reference).
- No test suite exists; do not add one. Verify with `npm run type-check` and `npm run lint` after each task, plus a manual `npm run dev` check for UI tasks.

---

### Task 1: Add `namesConfirmed` state to `PlayersStore`

**Files:**
- Modify: `src/stores/PlayersStore.ts`

**Interfaces:**
- Produces: `playersStore.namesConfirmed: boolean` (state, persisted), `playersStore.confirmNames(): void` (action, sets `namesConfirmed = true`). `playersStore.reset()` now also sets `namesConfirmed = false`.

- [ ] **Step 1: Add the state field and update `reset()`**

In `src/stores/PlayersStore.ts`, add `namesConfirmed` to state and reset it in `reset()`:

```ts
export const usePlayersStore = defineStore('playersStore', {
  state: () => ({
    numberOfPlayers: ref<number>(4),
    players: ref<Player[]>([]),
    namesConfirmed: ref<boolean>(false),
  }),
  actions: {
    reset() {
      this.numberOfPlayers = 0
      this.players = []
      this.namesConfirmed = false
    },
    confirmNames() {
      this.namesConfirmed = true
    },
    initPlayers() {
      for (let i = 0; i < this.numberOfPlayers; i++) {
        this.players.push({
          name: '',
          points: new Array(7).fill(null),
          longerPoints: new Array(13).fill(null)
        })
      }
    },
    // ... game() unchanged
  },

  persist: true
})
```

Keep the rest of the file (the `game()` action) unchanged.

- [ ] **Step 2: Type-check**

Run: `npm run type-check`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/stores/PlayersStore.ts
git commit -m "feat: add namesConfirmed state to PlayersStore"
```

---

### Task 2: Add i18n strings for the names screen

**Files:**
- Modify: `src/i18n.ts`

**Interfaces:**
- Produces: `message.player` ("Player 1" prefix word), `message.continueLabel` (Continue button), `message.back` (Back button) — available for `PlayerNames.vue`.

- [ ] **Step 1: Add English keys**

In `src/i18n.ts`, in the `en.message` object, add after the existing `name: 'Name',` line:

```ts
        name: 'Name',
        player: 'Player',
        continueLabel: 'Continue',
        back: 'Back',
```

- [ ] **Step 2: Add Swedish keys**

In the `sv.message` object, add after the existing `name: 'Namn',` line:

```ts
        name: 'Namn',
        player: 'Spelare',
        continueLabel: 'Fortsätt',
        back: 'Tillbaka',
```

- [ ] **Step 3: Type-check**

Run: `npm run type-check`
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/i18n.ts
git commit -m "feat: add i18n strings for player names screen"
```

---

### Task 3: Create `PlayerNames.vue`

**Files:**
- Create: `src/components/PlayerNames.vue`

**Interfaces:**
- Consumes: `usePlayersStore()` → `players: Player[]` (each `{ name: string, points: (number|null)[], longerPoints: (number|null)[] }`), `confirmNames(): void`, `reset(): void`. `PlayerNameInput.vue` props `modelValue: string`, `inputId?: string`, emits `update:modelValue`.
- Produces: renders name entry UI; no exported interface (leaf component used by `Start.vue`).

- [ ] **Step 1: Write the component**

```vue
<template>
  <div class="player-names">
    <div v-for="(player, index) in playersStore.players" :key="index" class="player-name-row">
      <span class="player-label">{{ $t('message.player') }} {{ index + 1 }}</span>
      <PlayerNameInput v-model="player.name" :inputId="`playerName-${index}`" />
    </div>
    <div class="button-row">
      <CButton color="secondary" @click="playersStore.reset()">{{ $t('message.back') }}</CButton>
      <CButton color="primary" :disabled="!allNamesFilled" @click="playersStore.confirmNames()">
        {{ $t('message.continueLabel') }}
      </CButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CButton } from '@coreui/vue/dist/esm/components/button'
import PlayerNameInput from '@/components/PlayerNameInput.vue'
import { usePlayersStore } from '@/stores/PlayersStore'
import { computed } from 'vue'

const playersStore = usePlayersStore()

const allNamesFilled = computed(() =>
  playersStore.players.every((player) => player.name.trim().length > 0)
)
</script>

<style scoped>
.player-names {
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 280px;
  gap: 8px;
}

.player-name-row {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
}

.player-label {
  color: white;
  font-size: 14px;
  white-space: nowrap;
}

.button-row {
  display: flex;
  gap: 8px;
  margin-top: 8px;
}
</style>
```

This mirrors the layout conventions of `src/components/Players.vue` (280px centered column, white labels, CoreUI `CButton`).

- [ ] **Step 2: Type-check and lint**

Run: `npm run type-check && npm run lint`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/PlayerNames.vue
git commit -m "feat: add PlayerNames component"
```

---

### Task 4: Wire the 3-way screen gate into `Start.vue`

**Files:**
- Modify: `src/components/Start.vue`

**Interfaces:**
- Consumes: `PlayerNames.vue` (Task 3, no props), `playersStore.namesConfirmed: boolean` (Task 1).

- [ ] **Step 1: Import `PlayerNames.vue`**

In `src/components/Start.vue`, add the import alongside the existing `Players` import:

```ts
import Players from '@/components/Players.vue'
import PlayerNames from '@/components/PlayerNames.vue'
```

- [ ] **Step 2: Update the template gate**

Replace:

```html
    <div v-if="playersStore.players.length > 0" class="game" key="players.length">
      <Boards :activeTab="activeTab" @saveGame="saveGame" />
    </div>
```

with:

```html
    <div
      v-if="playersStore.players.length > 0 && !playersStore.namesConfirmed"
      class="players-wrapper"
    >
      <PlayerNames />
    </div>
    <div
      v-if="playersStore.players.length > 0 && playersStore.namesConfirmed"
      class="game"
      key="players.length"
    >
      <Boards :activeTab="activeTab" @saveGame="saveGame" />
    </div>
```

Leave the welcome logo/heading `v-if="!playersStore.players.length"` conditions and the game-type/count screen block untouched.

- [ ] **Step 3: Type-check and lint**

Run: `npm run type-check && npm run lint`
Expected: no errors.

- [ ] **Step 4: Manual check**

Run: `npm run dev`, open the app, log in, pick a game type and player count, click Start. Confirm the new names screen appears (Continue disabled), typing all names enables Continue, clicking it shows the board, and Back returns to the count screen.

- [ ] **Step 5: Commit**

```bash
git add src/components/Start.vue
git commit -m "feat: wire player names screen into Start.vue flow"
```

---

### Task 5: Replace name input with plain text in the three board components

**Files:**
- Modify: `src/components/boards/Board.vue:29`
- Modify: `src/components/boards/LongBoard.vue:18`
- Modify: `src/components/boards/LongerBoard.vue:24`

**Interfaces:**
- Consumes: `player.name: string` (already in scope in each board's row loop). No change to `PlayerNameInput.vue`.

- [ ] **Step 1: Update `Board.vue`**

Replace line 29:

```html
          <PlayerNameInput v-model="player.name" :inputId="`playerName-${playerIndex}`" />
```

with:

```html
          {{ player.name }}
```

Then remove the now-unused import `import PlayerNameInput from '@/components/PlayerNameInput.vue'` from `Board.vue`'s `<script setup>` block, and check if `playerIndex` is still used elsewhere in the file (it is, in the `v-for` and the dealer check) — keep the `v-for` key/index as-is, only the `PlayerNameInput` element and its now-unused import go.

- [ ] **Step 2: Update `LongBoard.vue`**

Same change at line 18: replace `<PlayerNameInput v-model="player.name" :inputId="`playerName-${playerIndex}`" />` with `{{ player.name }}`, and remove the `PlayerNameInput` import from its `<script setup>` block.

- [ ] **Step 3: Update `LongerBoard.vue`**

Same change at line 24: replace `<PlayerNameInput v-model="player.name" :inputId="`playerName-${playerIndex}`" />` with `{{ player.name }}`, and remove the `PlayerNameInput` import from its `<script setup>` block.

- [ ] **Step 4: Type-check and lint**

Run: `npm run type-check && npm run lint`
Expected: no errors (lint will catch any leftover unused imports).

- [ ] **Step 5: Manual check**

Run: `npm run dev`, go through the full flow for each of the three game types (UBB, Long UBB, Longer UBB): pick type, pick count, fill in names, continue, confirm each board shows player names as plain text (not editable) in the header row of the score table.

- [ ] **Step 6: Commit**

```bash
git add src/components/boards/Board.vue src/components/boards/LongBoard.vue src/components/boards/LongerBoard.vue
git commit -m "feat: show player name as text on boards instead of editable input"
```

---

## Final Verification

- [ ] Run `npm run build` (type-check + build) and confirm it succeeds.
- [ ] Manual full run-through: Start → pick game type/count → names screen (Back works, Continue disabled until filled) → board with names as text → play a round → Save → GameSaved screen → Reset returns to the very first screen with `namesConfirmed` cleared (verify by going through the flow again from scratch).
