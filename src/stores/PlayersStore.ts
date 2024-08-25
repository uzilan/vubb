import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Player } from '@/models/Player'

export const usePlayersStore = defineStore('playersStore', {
  state: () => ({
    players: ref<Player[]>([])
  }),
  persist: true
})
