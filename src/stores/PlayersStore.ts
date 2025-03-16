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
    }
  },
  persist: true
})
