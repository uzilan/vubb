<template>
  <InstructionsWrapper />
  <ResetWrapper />

  <h1 v-if="!playersStore.players.length">{{ $t('message.welcome') }}</h1>

  <Auth @loginDone="loadStats" @logoutDone="playersStore.reset" />

  <template v-if="authStore.user">
    <Stats />
    <div v-if="!playersStore.players.length" class="players-wrapper">
      <Players />
    </div>
    <div v-if="playersStore.players.length > 0" class="game" key="players.length">
      <Boards @saveGame="saveGame" />
    </div>
  </template>

  <GameSaved />
</template>

<script setup lang="ts">
import Auth from '@/components/Auth.vue'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import Stats from '@/components/stats/Stats.vue'
import { useAuthStore } from '@/stores/AuthStore'
import { usePlayersStore } from '@/stores/PlayersStore'
import { firebaseConfig } from '@/credentials'
import InstructionsWrapper from '@/components/instructions/InstructionsWrapper.vue'
import ResetWrapper from '@/components/ResetWrapper.vue'
import { useGamesStore } from '@/stores/GamesStore'
import Players from '@/components/Players.vue'
import Boards from '@/components/boards/Boards.vue'
import GameSaved from '@/components/GameSaved.vue'
// import { firebaseConfig } from '@/credentials-dev'

const authStore = useAuthStore()
const playersStore = usePlayersStore()
const gamesStore = useGamesStore()

const loadStats = () => {
  if (!authStore.user) {
    return
  }

  gamesStore.loadGames()
}

const saveGame = () => {
  gamesStore.saveGame(playersStore.game(firebase?.auth()?.currentUser?.displayName ?? 'N/A'))
  playersStore.reset()
  loadStats()
}

firebase.initializeApp(firebaseConfig)
loadStats()
</script>

<style scoped lang="scss">
.players-wrapper {
  width: 100%;
  text-align: center;
  padding: 10px 0;
}

h1 {
  padding-top: 50px;
}

th,
.sum {
  font-weight: bolder;
}

.game {
  padding-top: 10px;
  display: grid;
  width: 100%;
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type='number'] {
  -moz-appearance: textfield;
}
</style>
