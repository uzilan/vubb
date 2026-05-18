<template>
  <CHeader class="top-bar">
    <ResetWrapper />
    <CHeaderNav class="ms-auto">
      <Stats />
      <InstructionsWrapper />
      <Auth @logoutDone="playersStore.reset" />
    </CHeaderNav>
  </CHeader>

  <div class="content">
  <img v-if="!playersStore.players.length" src="/ubb.png" class="welcome-logo" alt="UBB" />
  <h1 v-if="!playersStore.players.length">{{ $t('message.welcome') }}</h1>

  <template v-if="authStore.user">
    <div v-if="!playersStore.players.length" class="players-wrapper">
      <div class="game-type-buttons">
        <div class="radio-group">
          <CFormCheck
            type="radio"
            name="boardType"
            :value="'normal-board'"
            :checked="activeTab === 'normal-board'"
            @change="activeTab = 'normal-board'"
            class="tab-radio"
          />
          <span class="radio-label">{{ $t('message.ubb') }}</span>
        </div>
        <div class="radio-group">
          <CFormCheck
            type="radio"
            name="boardType"
            :value="'long-board'"
            :checked="activeTab === 'long-board'"
            @change="activeTab = 'long-board'"
            class="tab-radio"
          />
          <span class="radio-label">{{ $t('message.longUbb') }}</span>
        </div>
        <div class="radio-group">
          <CFormCheck
            type="radio"
            name="boardType"
            :value="'longer-board'"
            :checked="activeTab === 'longer-board'"
            @change="activeTab = 'longer-board'"
            class="tab-radio"
          />
          <span class="radio-label">{{ $t('message.longerUbb') }}</span>
        </div>
      </div>
      <Players />
    </div>
    <div v-if="playersStore.players.length > 0" class="game" key="players.length">
      <Boards :activeTab="activeTab" @saveGame="saveGame" />
    </div>
  </template>

  <GameSaved />
  </div>
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
import { onMounted, ref } from 'vue'
import type { User } from '@firebase/auth'
import { CFormCheck } from '@coreui/vue/dist/esm/components/form'
import { CHeader, CHeaderNav } from '@coreui/vue/dist/esm/components/header'
// import { firebaseConfig } from '@/credentials-dev'

// Component name for linting
defineOptions({
  name: 'StartPage'
})

const authStore = useAuthStore()
const playersStore = usePlayersStore()
const gamesStore = useGamesStore()
const activeTab = ref('normal-board')

const saveGame = () => {
  gamesStore.saveGame(playersStore.game(firebase?.auth()?.currentUser?.displayName ?? 'N/A'))
  playersStore.reset()
}

firebase.initializeApp(firebaseConfig)

// Listen for authentication state changes
onMounted(() => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in
      authStore.user = user as User // Type assertion to handle Firebase compat types
      // Get the user's ID token for API calls if needed
      user.getIdToken().then((token) => {
        authStore.token = token
      })
    } else {
      // User is signed out
      authStore.user = null
      authStore.token = null
    }
  })
})
</script>

<style scoped lang="scss">
.content {
  padding: 0 8px;
}

.top-bar {
  background-color: rgba(0, 0, 0, 0.15) !important;
  border-radius: 0 0 8px 8px;
  border-bottom: none !important;
  padding: 8px 12px;
  margin-bottom: 8px;
  gap: 8px;
}

.top-bar :deep(.header-nav) {
  align-items: center;
  gap: 8px;
}

.top-bar :deep(.btn) {
  font-size: 0.75rem !important;
  padding: 0.2rem 0.5rem !important;
  line-height: 1.4 !important;
}

.top-bar :deep(.icon) {
  width: 14px !important;
  height: 14px !important;
}


.players-wrapper {
  width: 100%;
  text-align: center;
  padding: 10px 0;
}

.welcome-logo {
  display: block;
  margin: 10px auto 0;
  max-width: 400px;
  width: 40%;
}

@media (max-width: 430px) {
  .welcome-logo {
    width: 70%;
    max-width: 250px;
  }
}

@media (max-width: 430px) and (orientation: portrait) {
  .welcome-logo {
    margin-top: 50px;
  }
}

h1 {
  padding-top: 0;
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

.game-type-buttons {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 16px;
}

.radio-group {
  display: flex;
  align-items: center;
  margin-right: 20px;
}

.radio-group:first-child {
  padding-left: 10px;
}

.tab-radio {
  margin-right: 0;
}

.radio-label {
  color: white;
  font-weight: normal;
  font-size: 14px;
  margin-left: 8px;
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
