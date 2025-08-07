# vubb

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and
disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for
type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the
TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## Features

### Player Name Auto-Complete

The application now includes auto-complete functionality for player names:

- **Auto-complete suggestions**: When entering player names, the system will show suggestions based on previously used names from Firebase
- **Keyboard navigation**: Use arrow keys to navigate through suggestions and Enter to select
- **Mouse interaction**: Click on suggestions to select them
- **Custom names**: You can still enter new names that aren't in the suggestions
- **Automatic trimming**: Names are automatically trimmed of whitespace when selected or when the input loses focus
- **Real-time filtering**: Suggestions are filtered as you type

The auto-complete feature works across all game board types (UBB, Long UBB, and Longer UBB).
