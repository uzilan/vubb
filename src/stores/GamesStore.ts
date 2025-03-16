import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Game } from '@/models/Game'
import firebase from 'firebase/compat/app'

export const useGamesStore = defineStore('gamesStore', {
  state: () => ({
    games: ref<Game[]>(),
    showSaved: ref<boolean>(false)
  }),
  actions: {
    loadGames() {
      firebase
        .firestore()
        .collection('games')
        .get()
        .then((data) => {
          this.games = data.docs.map((doc) => ({
            playerNames: doc.get('playerNames'),
            rows: doc.get('rows'),
            winner: doc.get('winner'),
            date: doc.get('date'),
            savedBy: doc.get('savedBy')
          }))
        })
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
