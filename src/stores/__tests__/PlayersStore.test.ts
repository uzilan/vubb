import { beforeEach, describe, expect, test } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { usePlayersStore } from '@/stores/PlayersStore'

beforeEach(() => {
  setActivePinia(createPinia())
})

describe('initPlayers', () => {
  test('creates one empty player per numberOfPlayers', () => {
    const store = usePlayersStore()
    store.numberOfPlayers = 3

    store.initPlayers()

    expect(store.players).toHaveLength(3)
  })

  test('each player starts with an empty name and 7 null points', () => {
    const store = usePlayersStore()
    store.numberOfPlayers = 1

    store.initPlayers()

    expect(store.players[0].name).toBe('')
    expect(store.players[0].points).toEqual([null, null, null, null, null, null, null])
  })
})

describe('reset', () => {
  test('clears players, numberOfPlayers, and namesConfirmed', () => {
    const store = usePlayersStore()
    store.numberOfPlayers = 2
    store.initPlayers()
    store.confirmNames()

    store.reset()

    expect(store.numberOfPlayers).toBe(0)
    expect(store.players).toEqual([])
    expect(store.namesConfirmed).toBe(false)
  })
})

describe('confirmNames', () => {
  test('sets namesConfirmed to true', () => {
    const store = usePlayersStore()

    store.confirmNames()

    expect(store.namesConfirmed).toBe(true)
  })
})

describe('game', () => {
  test('maps each player into a row with per-set points and a summed total', () => {
    const store = usePlayersStore()
    store.numberOfPlayers = 1
    store.initPlayers()
    store.players[0].name = 'Alice'
    store.players[0].points = [1, 2, 3, 4, 5, 6, 7]

    const result = store.game('tester')

    expect(result.rows[0]).toEqual({
      player: 'Alice',
      ss: 1,
      sl: 2,
      ll: 3,
      sss: 4,
      ssl: 5,
      sll: 6,
      lll: 7,
      sum: 28
    })
  })

  test('picks the player with the lowest total as winner', () => {
    const store = usePlayersStore()
    store.numberOfPlayers = 2
    store.initPlayers()
    store.players[0].name = 'Alice'
    store.players[0].points = [10, 0, 0, 0, 0, 0, 0]
    store.players[1].name = 'Bob'
    store.players[1].points = [5, 0, 0, 0, 0, 0, 0]

    const result = store.game('tester')

    expect(result.winner).toEqual({ name: 'Bob', points: 5 })
  })

  test('trims player names in rows, winner, and playerNames', () => {
    const store = usePlayersStore()
    store.numberOfPlayers = 1
    store.initPlayers()
    store.players[0].name = '  Alice  '
    store.players[0].points = [0, 0, 0, 0, 0, 0, 0]

    const result = store.game('tester')

    expect(result.playerNames).toEqual(['Alice'])
    expect(result.rows[0].player).toBe('Alice')
    expect(result.winner.name).toBe('Alice')
  })

  test('records who saved the game and today\'s date', () => {
    const store = usePlayersStore()
    store.numberOfPlayers = 1
    store.initPlayers()
    store.players[0].points = [0, 0, 0, 0, 0, 0, 0]

    const result = store.game('uzi@example.com')

    expect(result.savedBy).toBe('uzi@example.com')
    expect(result.date).toMatch(/^\d{4}-\d{2}-\d{2}$/)
  })
})
