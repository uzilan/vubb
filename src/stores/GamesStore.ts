import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Game } from '@/models/Game'
import firebase from 'firebase/compat/app'

export const useGamesStore = defineStore('gamesStore', {
  state: () => ({
    games: ref<Game[]>(),
    showSaved: ref<boolean>(false),
    loading: ref<boolean>(false)
  }),
  actions: {
    async loadGames() {
      this.loading = true
      try {
        const snapshot = await firebase.firestore().collection('games').get()
        this.games = snapshot.docs.map((doc) => ({
          playerNames: doc.get('playerNames'),
          rows: doc.get('rows'),
          winner: doc.get('winner'),
          date: doc.get('date'),
          savedBy: doc.get('savedBy')
        }))
      } catch (error) {
        console.error('Error loading games:', error)
      } finally {
        this.loading = false
      }
    },
    saveGame(game: Game) {
      firebase.firestore().collection('games').add(game)
      this.showSaved = true
    },
    showSaveDone() {
      this.showSaved = false
    }
  }
})
