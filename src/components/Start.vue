<template>
  <h1 v-if="!playersStore.players.length">Välkommen till UBB!</h1>
  <CButton
    v-if="authStore.user && playersStore.players.length"
    color="primary"
    @click="resetGame"
    class="reset-button"
    >Starta om
  </CButton>
  <Auth @loginDone="loadStats" @logoutDone="resetGame" />
  <template v-if="authStore.user">
    <Stats :games="games" />

    <div v-if="!playersStore.players.length" class="players-wrapper">
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
    <div v-if="playersStore.players.length > 0" class="game" key="players.length">
      <CTabs activeItemKey="normal-board">
        <CTabList variant="pills">
          <CTab itemKey="normal-board">UBB</CTab>
          <CTab itemKey="long-board">LÅNG UBB</CTab>
          <CTab itemKey="longer-board">LÄNGRE UBB</CTab>
        </CTabList>
        <CTabContent class="scroll">
          <CTabPanel class="p-3" itemKey="normal-board">
            <Board @saveGame="saveGame" />
          </CTabPanel>
          <CTabPanel class="p-3" itemKey="long-board">
            <LongBoard />
          </CTabPanel>
          <CTabPanel class="p-3" itemKey="longer-board">
            <LongerBoard />
          </CTabPanel>
        </CTabContent>
      </CTabs>
    </div>
  </template>
  <CToaster class="p-3" placement="top-end">
    <CToast :autohide="false" class="align-items-center" v-if="showSaved" visible>
      <CToastBody>
        Spelet är sparat. Statistiken hittar du här
        <CIcon :icon="cilHandPointUp" size="l" />
        <div class="mt-2 pt-2 border-top">
          <CButton type="button" color="primary" size="sm" @click="showSaved = false">OK</CButton>
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
import Board from '@/components/Board.vue'
import Auth from '@/components/Auth.vue'
import firebase from 'firebase/compat/app'
import type { Game } from '@/models/Game'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import Stats from '@/components/stats/Stats.vue'
import { CToast, CToastBody, CToastClose, CToaster } from '@coreui/vue/dist/esm/components/toast'
import { cilHandPointUp } from '@coreui/icons'
import { CIcon } from '@coreui/icons-vue'
import { CTab, CTabContent, CTabList, CTabPanel, CTabs } from '@coreui/vue/dist/esm/components/tabs'
import LongBoard from '@/components/LongBoard.vue'
import { useAuthStore } from '@/components/AuthStore'
import { usePlayersStore } from '@/components/PlayersStore'
import { firebaseConfig } from '@/credentials'
import LongerBoard from '@/components/LongerBoard.vue'
// import { firebaseConfig } from '@/credentials-dev'

const authStore = useAuthStore()
const playersStore = usePlayersStore()

const numberOfPlayers = ref<number>(0)

const initPlayers = () => {
  for (let i = 0; i < numberOfPlayers.value; i++) {
    playersStore.players.push({
      name: '',
      points: new Array(7).fill(null),
      longerPoints: new Array(13).fill(null)
    })
  }
}

const resetGame = () => {
  numberOfPlayers.value = 0
  playersStore.players = []
}

const games = ref<Game[]>()
const loadStats = () => {
  if (!authStore.user) {
    return
  }

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

firebase.initializeApp(firebaseConfig)
loadStats()
</script>
<style scoped lang="scss">
.reset-button {
  position: absolute;
  top: 0;
}

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
