# Player Names Screen — Design

## Purpose

Add an in-between screen for entering player names, after game type + player count selection and before the score board. Currently, names are entered inline on the board itself (first column of each row, via `PlayerNameInput.vue`). This moves name entry to its own dedicated screen.

## Architecture

New component: `src/components/PlayerNames.vue`

- One row per player: label ("Player 1", "Player 2", ...) + text input, reusing existing `PlayerNameInput.vue` bound to `playersStore.players[i].name`.
- "Continue" button: disabled until every player's trimmed name is non-empty. On click, calls `playersStore.confirmNames()`.
- "Back" button: calls `playersStore.reset()`, returning to the game-type/player-count screen.

## State (`PlayersStore`)

- Add `namesConfirmed: boolean` to state, persisted (same as `players`).
- `reset()`: also sets `namesConfirmed = false`.
- New action `confirmNames()`: sets `namesConfirmed = true`.

## Screen flow (`Start.vue`)

Replace the current 2-way gate (`players.length === 0` vs `> 0`) with a 3-way gate:

1. `players.length === 0` → game-type/player-count screen (unchanged)
2. `players.length > 0 && !namesConfirmed` → `PlayerNames.vue` (new)
3. `players.length > 0 && namesConfirmed` → `Boards.vue` (unchanged)

## Board changes

`Board.vue`, `LongBoard.vue`, `LongerBoard.vue`: replace `<PlayerNameInput v-model="player.name" .../>` in the body row's name cell with plain text display (`{{ player.name }}`). Names are now fixed before reaching the board. `PlayerNameInput.vue` itself is unchanged and reused on the new names screen.

## Validation

Continue button on the names screen is disabled until all names are non-empty (after trim). No uniqueness check (matches existing behavior — duplicates were already allowed).

## Out of scope

- No changes to `PlayerNameInput.vue` internals.
- No uniqueness validation.
- No changes to game-type/count screen or Reset flow beyond wiring `namesConfirmed` reset.
