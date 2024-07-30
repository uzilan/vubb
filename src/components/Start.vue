<template>
  <h1 v-if="!players.length">Välkommen till UBB!</h1>
  <Auth @user="setUser" />
  <template v-if="user">
    <Stats :games="games" />

    <div v-if="!players.length" class="players-wrapper">
      <div class="players">
        <CFormLabel for="numberOfPlayers" class="players-label">Antal spelare</CFormLabel>
        <CFormInput
          type="number"
          size="l"
          id="numberOfPlayers"
          placeholder=""
          v-model="numberOfPlayers"
        />&nbsp;
        <CButton color="primary" @click="initPlayers()">Ok</CButton>
      </div>
    </div>
    <div v-if="players.length > 0" class="game" key="players.length">
      <Board :players="players" @saveGame="saveGame"></Board>
    </div>
  </template>
  <CToaster class="p-3" placement="top-end">
    <CToast :autohide="false" class="align-items-center" v-if="showSaved" visible>
      <CToastBody>
        Spelet är sparat. Statistiken hittar du här
        <CIcon :icon="cilHandPointUp" size="l" />
        <div class="mt-2 pt-2 border-top">
          <CButton type="button" color="primary" size="sm" @click="showSaved = false"> OK</CButton>
          <CToastClose as="CButton" color="secondary" size="sm" class="ms-1">Close</CToastClose>
        </div>
      </CToastBody>
    </CToast>
  </CToaster>
</template>

<script setup lang="ts">
import { CFormInput, CFormLabel } from '@coreui/vue/dist/esm/components/form'
import { CButton } from '@coreui/vue/dist/esm/components/button'
import { ref } from 'vue'
import type { Player } from '@/models/Player'
import Board from '@/components/Board.vue'
import Auth from '@/components/Auth.vue'
import type { User } from '@firebase/auth'
import firebase from 'firebase/compat/app'
import type { Game } from '@/models/Game'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import Stats from '@/components/stats/Stats.vue'
import { CToast, CToastBody, CToastClose, CToaster } from '@coreui/vue/dist/esm/components/toast'
import { cilHandPointUp } from '@coreui/icons'
import { CIcon } from '@coreui/icons-vue'

const numberOfPlayers = ref<number>(0)
const players = ref<Player[]>([])

const initPlayers = () => {
  for (let i = 0; i < numberOfPlayers.value; i++) {
    players.value.push({ name: '', points: new Array(7).fill(null) })
  }
}

const resetGame = () => {
  numberOfPlayers.value = 0
  players.value = []
}

const user = ref<User>()
const setUser = (u: User) => {
  user.value = u
  loadStats()
}

const games = ref<Game[]>()
const loadStats = () => {
  firebase
    .firestore()
    .collection('games')
    .get()
    .then((data) => {
      games.value = data.docs.map((doc) => ({
        playerNames: doc.get('playerNames'),
        rows: doc.get('rows'),
        winner: doc.get('winner'),
        date: doc.get('date')
      }))
    })
}

const showSaved = ref<boolean>(false)
const saveGame = (game: Game) => {
  firebase.firestore().collection('games').add(game)
  resetGame()
  loadStats()
  showSaved.value = true
}
</script>
<style scoped lang="scss">
.players-wrapper {
  width: 100%;
  text-align: center;
  padding: 10px 0;
}

.players-label {
  white-space: nowrap;
  vertical-align: center;
  font-weight: bolder;
  font-size: 22px;
  padding-right: 10px;
  padding-top: 10px;
}

.players {
  margin: auto;
  display: flex;
  width: 280px;
  justify-content: space-around;
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
