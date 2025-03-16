import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Player } from '@/models/Player'
import { DateTime } from 'luxon'

export const usePlayersStore = defineStore('playersStore', {
  state: () => ({
    numberOfPlayers: ref<number>(0),
    players: ref<Player[]>([])
  }),
  actions: {
    reset() {
      this.numberOfPlayers = 0
      this.players = []
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
    game() {
      const playerNames = this.players.map((player: Player) => player.name)
      const rows = this.players.map((player: Player) => ({
        player: player.name,
        ss: player.points[0] ?? 0,
        sl: player.points[1] ?? 0,
        ll: player.points[2] ?? 0,
        sss: player.points[3] ?? 0,
        ssl: player.points[4] ?? 0,
        sll: player.points[5] ?? 0,
        lll: player.points[6] ?? 0,
        sum: player.points.reduce((curr: number, acc: number) => Number(acc) + Number(curr), 0)
      }))
      const winner = [...this.players]
        .map((player) => ({
          name: player.name,
          points: player.points.reduce((curr: number, acc: number) => Number(acc) + Number(curr), 0)
        }))
        .sort((a, b) => a.points - b.points)[0]
      const date = DateTime.now().toFormat('yyyy-MM-dd')

      return {
        playerNames: playerNames,
        rows: rows,
        winner: winner,
        date: date
      }
    }
  },

  persist: true
})
