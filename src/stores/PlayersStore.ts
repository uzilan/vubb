import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Player } from '@/models/Player'

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
    }
  },
  persist: true
})
