import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Player } from '@/models/Player'
import { DateTime } from 'luxon'
import firebase from 'firebase/compat/app'

export const usePlayersStore = defineStore('playersStore', {
  state: () => ({
    numberOfPlayers: ref<number>(0),
    players: ref<Player[]>([]),
    existingPlayerNames: ref<string[]>([])
  }),
  actions: {
    reset() {
      this.numberOfPlayers = 0
      this.players = []
    },
    async fetchExistingPlayerNames() {
      try {
        const snapshot = await firebase.firestore().collection('games').get()
        const allNames = snapshot.docs.flatMap((doc) => doc.get('playerNames') || [])
        const uniqueNames = [...new Set(allNames.map((name) => name.trim()))].filter(
          (name) => name.length > 0
        )
        this.existingPlayerNames = uniqueNames.sort()
      } catch (error) {
        console.error('Error fetching existing player names:', error)
        this.existingPlayerNames = []
      }
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
    game(user: string) {
      const playerNames = this.players.map((player: Player) => player.name.trim())
      const rows = this.players.map((player: Player) => ({
        player: player.name.trim(),
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
          name: player.name.trim(),
          points: player.points.reduce((curr: number, acc: number) => Number(acc) + Number(curr), 0)
        }))
        .sort((a, b) => a.points - b.points)[0]
      const date = DateTime.now().toFormat('yyyy-MM-dd')

      return {
        playerNames: playerNames,
        rows: rows,
        winner: winner,
        date: date,
        savedBy: user
      }
    }
  },

  persist: true
})
