import { describe, expect, test } from 'vitest'
import { Stats } from '@/components/stats/Stats'
import type { Game } from '@/models/Game'
import type { Row } from '@/models/Row'

const row = (player: string, overrides: Partial<Row> = {}): Row => ({
  player,
  ss: 0,
  sl: 0,
  ll: 0,
  sss: 0,
  ssl: 0,
  sll: 0,
  lll: 0,
  sum: 0,
  ...overrides
})

const game = (overrides: Partial<Game> = {}): Game => ({
  playerNames: ['Alice', 'Bob'],
  rows: [row('Alice', { sum: 10 }), row('Bob', { sum: 20 })],
  winner: { name: 'Alice', points: 10 },
  date: '2026-01-05',
  savedBy: 'tester',
  ...overrides
})

describe('players', () => {
  test('returns the trimmed, deduplicated, sorted set of player names across all games', () => {
    const stats = new Stats([
      game({ playerNames: ['Bob', ' Alice '] }),
      game({ playerNames: ['Alice', 'Carl'] })
    ])

    expect(stats.players()).toEqual(['Alice', 'Bob', 'Carl'])
  })
})

describe('maxPoints / minPoints / numberOfGames / averagePoints', () => {
  const stats = new Stats([
    game({ rows: [row('Alice', { sum: 10 }), row('Bob', { sum: 99 })] }),
    game({ rows: [row('Alice', { sum: 30 }), row('Bob', { sum: 99 })] }),
    game({ rows: [row('Alice', { sum: 20 }), row('Bob', { sum: 99 })] })
  ])

  test('maxPoints returns the highest game sum for the player', () => {
    expect(stats.maxPoints('Alice')).toBe(30)
  })

  test('minPoints returns the lowest game sum for the player', () => {
    expect(stats.minPoints('Alice')).toBe(10)
  })

  test('numberOfGames counts rows played by the player', () => {
    expect(stats.numberOfGames('Alice')).toBe(3)
  })

  test('averagePoints rounds the mean game sum', () => {
    expect(stats.averagePoints('Alice')).toBe(20)
  })

  test('all four return undefined when no player is given', () => {
    expect(stats.maxPoints(undefined)).toBeUndefined()
    expect(stats.minPoints(undefined)).toBeUndefined()
    expect(stats.numberOfGames(undefined)).toBeUndefined()
    expect(stats.averagePoints(undefined)).toBeUndefined()
  })
})

describe('setAverages', () => {
  test('averages each set field across the player\'s rows, in ss/sl/ll/sss/ssl/sll/lll order', () => {
    const stats = new Stats([
      game({ rows: [row('Alice', { ss: 10, sl: 20, ll: 30, sss: 40, ssl: 50, sll: 60, lll: 70 })] }),
      game({ rows: [row('Alice', { ss: 20, sl: 20, ll: 30, sss: 40, ssl: 50, sll: 60, lll: 70 })] })
    ])

    expect(stats.setAverages('Alice')).toEqual([15, 20, 30, 40, 50, 60, 70])
  })
})

describe('setMaxes', () => {
  test('takes the max of each set field across the player\'s rows', () => {
    const stats = new Stats([
      game({ rows: [row('Alice', { ss: 5, sl: 25, ll: 30, sss: 40, ssl: 50, sll: 60, lll: 70 })] }),
      game({ rows: [row('Alice', { ss: 15, sl: 10, ll: 30, sss: 40, ssl: 50, sll: 60, lll: 70 })] })
    ])

    expect(stats.setMaxes('Alice')).toEqual([15, 25, 30, 40, 50, 60, 70])
  })
})

describe('placements', () => {
  test('counts how many times the player finished in each rank (lowest sum wins)', () => {
    const stats = new Stats([
      game({ rows: [row('Alice', { sum: 10 }), row('Bob', { sum: 20 })] }), // Alice 1st
      game({ rows: [row('Alice', { sum: 30 }), row('Bob', { sum: 20 })] }) // Alice 2nd
    ])

    expect(stats.placements('Alice')).toEqual([1, 1, 0, 0, 0])
  })

  test('ignores games the player did not play', () => {
    const stats = new Stats([game({ playerNames: ['Bob', 'Carl'], rows: [row('Bob'), row('Carl')] })])

    expect(stats.placements('Alice')).toEqual([0, 0, 0, 0, 0])
  })
})

describe('playerAverages', () => {
  test('excludes players with fewer than 5 games', () => {
    const stats = new Stats([game(), game(), game(), game()])

    expect(stats.playerAverages()).toEqual([])
  })

  test('includes and ranks players with 5+ games by average, highest first', () => {
    const fiveGames = Array.from({ length: 5 }, () =>
      game({ rows: [row('Alice', { sum: 10 }), row('Bob', { sum: 40 })] })
    )
    const stats = new Stats(fiveGames)

    expect(stats.playerAverages()).toEqual([
      { name: 'Bob', value: 40 },
      { name: 'Alice', value: 10 }
    ])
  })
})

describe('winners', () => {
  test('counts wins per player, most wins first', () => {
    const stats = new Stats([
      game({ winner: { name: 'Alice', points: 10 } }),
      game({ winner: { name: 'Alice', points: 15 } }),
      game({ winner: { name: 'Bob', points: 5 } })
    ])

    expect(stats.winners()).toEqual([
      { name: 'Alice', value: 2 },
      { name: 'Bob', value: 1 }
    ])
  })
})

describe('lowests', () => {
  test('sorts game winners by points ascending', () => {
    const stats = new Stats([
      game({ winner: { name: 'Alice', points: 15 } }),
      game({ winner: { name: 'Bob', points: 5 } })
    ])

    expect(stats.lowests()).toEqual([
      { name: 'Bob', points: 5 },
      { name: 'Alice', points: 15 }
    ])
  })
})

describe('highests', () => {
  test('lists every row sum across all games, highest first', () => {
    const stats = new Stats([
      game({ rows: [row('Alice', { sum: 10 }), row('Bob', { sum: 50 })] })
    ])

    expect(stats.highests()).toEqual([
      { name: 'Bob', value: 50 },
      { name: 'Alice', value: 10 }
    ])
  })
})

describe('highestHand', () => {
  test('takes the max set value within each row, highest first', () => {
    const stats = new Stats([
      game({
        rows: [
          row('Alice', { ss: 5, sl: 90, ll: 1 }),
          row('Bob', { ss: 5, sl: 1, ll: 1 })
        ]
      })
    ])

    expect(stats.highestHand()).toEqual([
      { name: 'Alice', value: 90 },
      { name: 'Bob', value: 5 }
    ])
  })
})

describe('mostPlayed', () => {
  test('counts games played per player, most first', () => {
    const stats = new Stats([
      game({ playerNames: ['Alice', 'Bob'] }),
      game({ playerNames: ['Alice', 'Carl'] })
    ])

    expect(stats.mostPlayed()).toEqual([
      { name: 'Alice', value: 2 },
      { name: 'Bob', value: 1 },
      { name: 'Carl', value: 1 }
    ])
  })
})

describe('highestDiff', () => {
  test('pairs each game\'s winner with its runner-up and the point gap between them', () => {
    const stats = new Stats([
      game({
        winner: { name: 'Alice', points: 10 },
        rows: [row('Alice', { sum: 10 }), row('Bob', { sum: 45 })]
      })
    ])

    expect(stats.highestDiff()).toEqual([
      {
        winner: { name: 'Alice', value: 10 },
        loser: { name: 'Bob', value: 45 },
        diff: 35
      }
    ])
  })
})

describe('calendar', () => {
  test('counts games per year-month, sorted chronologically', () => {
    const stats = new Stats([
      game({ date: '2026-02-10' }),
      game({ date: '2026-01-05' }),
      game({ date: '2026-01-20' })
    ])

    expect(stats.calendar()).toEqual([
      { name: '2026-01', value: 2 },
      { name: '2026-02', value: 1 }
    ])
  })
})

describe('weekdays', () => {
  test('counts games per weekday, ordered Monday through Sunday', () => {
    const stats = new Stats([
      game({ date: '2026-01-05' }), // Monday
      game({ date: '2026-01-12' }), // Monday
      game({ date: '2026-01-07' }) // Wednesday
    ])

    expect(stats.weekdays()).toEqual([
      { name: 'Monday', value: 2 },
      { name: 'Wednesday', value: 1 }
    ])
  })
})

describe('setLeagues', () => {
  test('ranks every row for each set field independently, highest first', () => {
    const stats = new Stats([
      game({ rows: [row('Alice', { ss: 10 }), row('Bob', { ss: 25 })] })
    ])

    expect(stats.setLeagues().ss).toEqual([
      { name: 'Bob', value: 25 },
      { name: 'Alice', value: 10 }
    ])
  })
})
