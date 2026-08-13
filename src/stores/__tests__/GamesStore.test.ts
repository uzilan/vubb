import { beforeEach, describe, expect, test, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'

const { get, add, firestore } = vi.hoisted(() => {
  const get = vi.fn()
  const add = vi.fn()
  const collection = vi.fn(() => ({ get, add }))
  const firestore = vi.fn(() => ({ collection }))
  return { get, add, firestore }
})

vi.mock('firebase/compat/app', () => ({
  default: { firestore }
}))

import { useGamesStore } from '@/stores/GamesStore'

beforeEach(() => {
  setActivePinia(createPinia())
  get.mockReset()
  add.mockReset()
})

describe('loadGames', () => {
  test('maps Firestore docs into games and clears loading', async () => {
    get.mockResolvedValue({
      docs: [
        {
          get: (field: string) =>
            ({
              playerNames: ['Alice'],
              rows: [],
              winner: { name: 'Alice', points: 0 },
              date: '2026-08-13',
              savedBy: 'tester'
            })[field]
        }
      ]
    })
    const store = useGamesStore()

    await store.loadGames()

    expect(store.games).toEqual([
      {
        playerNames: ['Alice'],
        rows: [],
        winner: { name: 'Alice', points: 0 },
        date: '2026-08-13',
        savedBy: 'tester'
      }
    ])
    expect(store.loading).toBe(false)
  })

  test('clears loading even when Firestore rejects', async () => {
    get.mockRejectedValue(new Error('offline'))
    const store = useGamesStore()

    await store.loadGames()

    expect(store.loading).toBe(false)
  })
})

describe('saveGame', () => {
  test('adds the game to the games collection and flags it as saved', () => {
    const store = useGamesStore()
    const game = {
      playerNames: ['Alice'],
      rows: [],
      winner: { name: 'Alice', points: 0 },
      date: '2026-08-13',
      savedBy: 'tester'
    }

    store.saveGame(game)

    expect(add).toHaveBeenCalledWith(game)
    expect(store.showSaved).toBe(true)
  })
})

describe('showSaveDone', () => {
  test('clears the showSaved flag', () => {
    const store = useGamesStore()
    store.showSaved = true

    store.showSaveDone()

    expect(store.showSaved).toBe(false)
  })
})
