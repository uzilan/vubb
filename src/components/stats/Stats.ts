import type { Game } from '@/models/Game'
import type { Row } from '@/models/Row'

export class Stats {
  games: Game[]

  constructor(games: Game[]) {
    this.games = games
  }

  players(): string[] {
    const allNames = this.games
      ?.flatMap((game) => game.playerNames)
      .map(name => name.trim())
    const uniques = new Set(allNames)
    return [...uniques].sort()
  }

  private playerRows = (player: string): Row[] => {
    return this.games.flatMap(game => game.rows.filter(row => row.player.trim() === player))
  }

  private playerGameSums = (player: string): number[] => {
    return this.playerRows(player).map(row => row.sum)
  }

  private frequencies = (arr: any[]) =>
    arr.reduce((a, v) => {
      a[v] = (a[v] ?? 0) + 1
      return a
    }, {})

  playerGames = (player: string | undefined) => {
    if (!player) return
    return this.playerRows(player)
  }

  maxPoints = (player: string | undefined) => {
    if (!player) return
    return Math.max(...this.playerGameSums(player))
  }

  minPoints = (player: string | undefined) => {
    if (!player) return
    return Math.min(...this.playerGameSums(player))
  }

  numberOfGames = (player: string | undefined) => {
    if (!player) return
    return this.playerRows(player).length
  }

  averagePoints = (player: string | undefined) => {
    if (!player) return
    const sums = this.playerGameSums(player)
    return Math.round(sums.reduce((a, b) => a + b) / sums.length)
  }

  setAverages = (player: string | undefined) => {
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

    return Object.values(sums).map(x => Math.round(x / rows.length))
  }

  setMaxes = (player: string | undefined) => {
    if (!player) return
    const rows = this.playerRows(player)
    return [
      Math.max(...(rows.map(row => row.ss))),
      Math.max(...(rows.map(row => row.sl))),
      Math.max(...(rows.map(row => row.ll))),
      Math.max(...(rows.map(row => row.sss))),
      Math.max(...(rows.map(row => row.ssl))),
      Math.max(...(rows.map(row => row.sll))),
      Math.max(...(rows.map(row => row.lll)))
    ]
  }

  placements = (player: string | undefined) => {
    if (!player) return

    const placement = (game: Game) => {
      const sorted = game.rows.sort((a, b) => a.sum - b.sum)
      return sorted.findIndex(row => row.player === player)
    }

    const placements = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    const gamesWithPlayer = this.games.filter(game => game.playerNames.includes(player))
    const gamePlacements = gamesWithPlayer.map(game => placement(game))
    gamePlacements.forEach(pl => placements[pl]++)
    return placements.slice(0, 5)
  }

  winners = () => {
    const winners = this.games.map(game => game.winner.name)
    const frequencies = Object.entries(this.frequencies(winners))
    const sorted = frequencies.sort((a, b) => b[1] - a[1])
    return new Map(sorted)
  }

  lowests = () => {
    const winners = this.games.map(game => game.winner)
    return winners.sort((a, b) => a.points - b.points)
  }

  highests = () => {
    const playerSums = this.games.flatMap(game => game.rows.map(row => [row.player, row.sum]))
    return playerSums.sort((a, b) => b[1] - a[1])
  }

  highestHand = () => {
    const highestInRow = (row: Row) => Math.max(row.ss, row.sl, row.ll, row.sss, row.ssl, row.sll, row.lll)
    const rows = this.games.flatMap(game => game.rows.map(row =>
      [row.player, highestInRow(row)]))
    return rows.sort((a, b) => b[1] - a[1])
  }

  mostPlayed = () => {
    const players = new Set(this.games.flatMap(game => game.playerNames.map(player => player.trim())))
    const playersAndGameCount = [...players].map(player => {
      const gamesWithPlayer = this.games
        .filter(game => game.playerNames.map(player => player.trim()).includes(player)).length
      return [player, gamesWithPlayer]
    })
    return playersAndGameCount.sort((a, b) => b[1] - a[1])
  }

  highestDiff = () => {
    const winnerAndPoints = (game: Game) => [game.winner.name, game.winner.points]
    const loserAndPoints = (game: Game) => {
      const sortedSums = game.rows.map(row => [row.player, row.sum]).sort((a, b) => b[1] - a[1])
      return sortedSums[0]
    }
    const gameDiff = (game: Game) => {
      const winner = winnerAndPoints(game)
      const loser = loserAndPoints(game)
      const conc = winner.concat(loser)
      conc.push(loser[1] - winner[1])
      return conc
    }
    const diffs = this.games.map(game => gameDiff(game))
    return diffs.sort((a, b) => b[4] - a[4])
  }
}

