<template>
  <InstructionsWrapper />
  <ResetWrapper />

  <h1 v-if="!playersStore.players.length">{{ $t('message.welcome') }}</h1>

  <Auth @loginDone="loadStats" @logoutDone="playersStore.reset" />

  <template v-if="authStore.user">
    <Stats />

    <div v-if="!playersStore.players.length" class="players-wrapper">
      <div class="players">
        <CFormLabel for="numberOfPlayers" class="players-label"
          >{{ $t('message.numberOfPlayers') }}
        </CFormLabel>
        <CFormInput
          type="number"
          size="l"
          id="numberOfPlayers"
          placeholder=""
          v-model="playersStore.numberOfPlayers"
        />&nbsp;
        <CButton color="primary" @click="playersStore.initPlayers()">{{
          $t('message.ok')
        }}</CButton>
      </div>
    </div>
    <div v-if="playersStore.players.length > 0" class="game" key="players.length">
      <CTabs activeItemKey="normal-board">
        <CTabList variant="pills">
          <CTab itemKey="normal-board">{{ $t('message.ubb') }}</CTab>
          <CTab itemKey="long-board">{{ $t('message.longUbb') }}</CTab>
          <CTab itemKey="longer-board">{{ $t('message.longerUbb') }}</CTab>
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
  <CToaster class="p-3" placement="top-center">
    <CToast :autohide="false" class="align-items-center" v-if="showSaved" visible>
      <CToastBody>
        {{ $t('message.saved') }}
        <div class="mt-2 pt-2 border-top">
          <CButton type="button" color="primary" size="sm" @click="showSaved = false">
            {{ $t('message.ok') }}
          </CButton>
          <CToastClose as="CButton" color="secondary" size="sm" class="ms-1"
            >{{ $t('message.close') }}
          </CToastClose>
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
import { CTab, CTabContent, CTabList, CTabPanel, CTabs } from '@coreui/vue/dist/esm/components/tabs'
import LongBoard from '@/components/LongBoard.vue'
import { useAuthStore } from '@/stores/AuthStore'
import { usePlayersStore } from '@/stores/PlayersStore'
import { firebaseConfig } from '@/credentials'
import LongerBoard from '@/components/LongerBoard.vue'
import InstructionsWrapper from '@/components/instructions/InstructionsWrapper.vue'
import ResetWrapper from '@/components/ResetWrapper.vue'
import { useGamesStore } from '@/stores/GamesStore'
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

const showSaved = ref<boolean>(false)
const saveGame = (game: Game) => {
  gamesStore.saveGame(game)
  playersStore.reset()
  loadStats()
  showSaved.value = true
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
