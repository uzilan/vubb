<template>
  <CButton class="stats" color="primary" @click="openStats"
    >{{ $t('message.statistics') }}
  </CButton>
  <CModal size="lg" :visible="showStats" @close="showStats = false">
    <CModalHeader>
      <CModalTitle>{{ $t('message.statistics') }}</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CTabs activeItemKey="game-stats">
        <CTabList variant="tabs">
          <CTab itemKey="game-stats">{{ $t('message.statistics') }}</CTab>
          <CTab itemKey="player-stats">{{ $t('message.players') }}</CTab>
          <CTab itemKey="game-history">{{ $t('message.gameHistory') }}</CTab>
        </CTabList>
        <CTabContent class="scroll">
          <CTabPanel class="p-3" itemKey="game-stats">
            <GameStats />
          </CTabPanel>
          <CTabPanel class="p-3" itemKey="player-stats">
            <PlayerStats />
          </CTabPanel>
          <CTabPanel class="p-3" itemKey="game-history">
            <GameHistory />
          </CTabPanel>
        </CTabContent>
      </CTabs>
    </CModalBody>
  </CModal>
</template>

<script setup lang="ts">
import {
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle
} from '@coreui/vue/dist/esm/components/modal'
import { CButton } from '@coreui/vue/dist/esm/components/button'
import { ref } from 'vue'
import 'firebase/compat/firestore'
import { CTab, CTabContent, CTabList, CTabPanel, CTabs } from '@coreui/vue/dist/esm/components/tabs'
import PlayerStats from '@/components/stats/player-stats/PlayerStats.vue'
import GameHistory from '@/components/stats/game-history/GameHistory.vue'
import GameStats from '@/components/stats/game-stats/GameStats.vue'
import { useGamesStore } from '@/stores/GamesStore'

const showStats = ref<boolean>(false)
const gamesStore = useGamesStore()

const openStats = () => {
  showStats.value = true
  // Load statistics data when the modal is opened
  gamesStore.loadGames()
}
</script>

<style scoped>
.stats {
  position: absolute;
  top: 0;
  right: 120px;
}

.scroll {
  height: 80vh;
  overflow-y: scroll;
  overflow-x: hidden;
}

::-webkit-scrollbar {
  -webkit-appearance: none;
  width: 12px;
}

::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-box-shadow: 0 0 1px rgba(255, 255, 255, 0.5);
}
</style>
