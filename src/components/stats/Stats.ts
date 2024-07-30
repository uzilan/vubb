import type { Game } from '@/models/Game'
import type { Row } from '@/models/Row'
import type { Winner } from '@/models/Winner'
import { DateTime } from 'luxon'

export interface NameAndValue {
  name: string
  value: number
}

export interface WinnerAndLoser {
  winner: NameAndValue
  loser: NameAndValue
  diff: number
}

export class Stats {
  games: Game[]

  constructor(games: Game[]) {
    this.games = games
  }

  players(): string[] {
    const allNames = this.games?.flatMap((game) => game.playerNames).map((name) => name.trim())
    const uniques = new Set(allNames)
    return [...uniques].sort()
  }

  private playerRows = (player: string): Row[] => {
    return this.games.flatMap((game) => game.rows.filter((row) => row.player.trim() === player))
  }

  private playerGameSums = (player: string): number[] => {
    return this.playerRows(player).map((row) => row.sum)
  }

  private frequencies = (arr: any[]): NameAndValue[] => {
    const reduced = arr.reduce((a, v) => {
      a[v] = (a[v] ?? 0) + 1
      return a
    }, {})
    const entries = Object.entries(reduced)
    return entries.map((entry) => ({ name: entry[0], value: Number(entry[1]) }))
  }

  maxPoints = (player: string | undefined): number | undefined => {
    if (!player) return
    return Math.max(...this.playerGameSums(player))
  }

  minPoints = (player: string | undefined): number | undefined => {
    if (!player) return
    return Math.min(...this.playerGameSums(player))
  }

  numberOfGames = (player: string | undefined): number | undefined => {
    if (!player) return
    return this.playerRows(player).length
  }

  averagePoints = (player: string | undefined): number | undefined => {
    if (!player) return
    const sums = this.playerGameSums(player)
    return Math.round(sums.reduce((a, b) => a + b) / sums.length)
  }

  setAverages = (player: string | undefined): number[] | undefined => {
    if (!player) return
    const rows = this.playerRows(player)
    const sums = { ss: 0, sl: 0, ll: 0, sss: 0, ssl: 0, sll: 0, lll: 0 }
    rows.forEach((row: Row) => {
      sums.ss += row.ss
      sums.sl += row.sl
      sums.ll += row.ll
      sums.sss += row.sss
      sums.ssl += row.ssl
      sums.sll += row.sll
      sums.lll += row.lll
    })

    return Object.values(sums).map((x) => Math.round(x / rows.length))
  }

  setMaxes = (player: string | undefined): number[] | undefined => {
    if (!player) return
    const rows = this.playerRows(player)
    return [
      Math.max(...rows.map((row) => row.ss)),
      Math.max(...rows.map((row) => row.sl)),
      Math.max(...rows.map((row) => row.ll)),
      Math.max(...rows.map((row) => row.sss)),
      Math.max(...rows.map((row) => row.ssl)),
      Math.max(...rows.map((row) => row.sll)),
      Math.max(...rows.map((row) => row.lll))
    ]
  }

  placements = (player: string | undefined): number[] | undefined => {
    if (!player) return

    const placement = (game: Game) => {
      const sorted = game.rows.sort((a, b) => a.sum - b.sum)
      return sorted.findIndex((row) => row.player === player)
    }

    const placements = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    const gamesWithPlayer = this.games.filter((game) => game.playerNames.includes(player))
    const gamePlacements = gamesWithPlayer.map((game) => placement(game))
    gamePlacements.forEach((pl) => placements[pl]++)
    return placements.slice(0, 5)
  }

  winners = (): NameAndValue[] => {
    const winners = this.games.map((game) => game.winner.name.trim())
    const frequencies = this.frequencies(winners)
    return frequencies.sort((a, b) => b.value - a.value)
  }

  lowests = (): Winner[] => {
    const winners = this.games.map((game) => game.winner)
    return winners.sort((a, b) => a.points - b.points)
  }

  highests = (): NameAndValue[] => {
    const playerSums = this.games.flatMap((game) =>
      game.rows.map((row) => ({ name: row.player, value: row.sum }))
    )
    return playerSums.sort((a, b) => b.value - a.value)
  }

  highestHand = (): NameAndValue[] => {
    const highestInRow = (row: Row) =>
      Math.max(row.ss, row.sl, row.ll, row.sss, row.ssl, row.sll, row.lll)
    const rows = this.games.flatMap((game) =>
      game.rows.map((row) => ({ name: row.player, value: highestInRow(row) }))
    )
    return rows.sort((a, b) => b.value - a.value)
  }

  mostPlayed = (): NameAndValue[] => {
    const players = new Set(
      this.games.flatMap((game) => game.playerNames.map((player) => player.trim()))
    )
    const playersAndGameCount = [...players].map((player) => {
      const gamesWithPlayer = this.games.filter((game) =>
        game.playerNames.map((player) => player.trim()).includes(player)
      ).length
      return { name: player, value: gamesWithPlayer }
    })
    return playersAndGameCount.sort((a, b) => b.value - a.value)
  }

  highestDiff = (): WinnerAndLoser[] => {
    const winnerAndPoints = (game: Game): NameAndValue => ({
      name: game.winner.name,
      value: game.winner.points
    })
    const loserAndPoints = (game: Game): NameAndValue => {
      const sortedSums = game.rows
        .map((row) => ({ name: row.player, value: row.sum }))
        .sort((a, b) => b.value - a.value)
      return sortedSums[0]
    }
    const gameDiff = (game: Game): WinnerAndLoser => {
      const winner = winnerAndPoints(game)
      const loser = loserAndPoints(game)
      return { winner: winner, loser: loser, diff: loser.value - winner.value }
    }
    const diffs = this.games.map((game) => gameDiff(game))
    return diffs.sort((a, b) => b.diff - a.diff)
  }

  calendar = (): NameAndValue[] => {
    const dates = this.games.map((game) => DateTime.fromISO(game.date).toFormat('yyyy-MM')).sort()
    const frequencies = this.frequencies(dates)
    return frequencies.sort((a, b) => a.name.localeCompare(b.name))
  }

  weekdays = (): NameAndValue[] => {
    const weekdays = this.games.map((game) => DateTime.fromISO(game.date).weekdayLong)
    const frequencies = this.frequencies(weekdays)
    return frequencies.sort((a, b) => {
      const wa = DateTime.fromFormat(a.name, 'EEEE')
      const wb = DateTime.fromFormat(b.name, 'EEEE')
      return wa.weekday - wb.weekday
    })
  }
}
