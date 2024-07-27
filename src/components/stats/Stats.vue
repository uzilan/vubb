<template>
  <CButton class="stats" color="primary" @click="showStats = true">Statistik</CButton>
  <CModal
    :visible="showStats"
    @close="() => { showStats = false }"
  >
    <CModalHeader>
      <CModalTitle>Statistik</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CTabs activeItemKey="game-stats">
        <CTabList variant="tabs">
          <CTab itemKey="game-stats">Statistik</CTab>
          <CTab itemKey="player-stats">Spelare</CTab>
          <CTab itemKey="game-history">Spelhistorik</CTab>
        </CTabList>
        <CTabContent class="scroll">
          <CTabPanel class="p-3" itemKey="game-stats">
            <GameStats :games="games" />
          </CTabPanel>
          <CTabPanel class="p-3" itemKey="player-stats">
            <PlayerStats :games="games" />
          </CTabPanel>
          <CTabPanel class="p-3" itemKey="game-history">
            <GameHistory :games="games" />
          </CTabPanel>
        </CTabContent>
      </CTabs>
    </CModalBody>
    <CModalFooter>
      <CButton color="secondary" @click="() => { showStats = false }">
        Stäng
      </CButton>
    </CModalFooter>
  </CModal>
</template>

<script setup lang="ts">

import { CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/vue/dist/esm/components/modal'
import { CButton } from '@coreui/vue/dist/esm/components/button'
import { ref } from 'vue'
import 'firebase/compat/firestore'
import { CTab, CTabContent, CTabList, CTabPanel, CTabs } from '@coreui/vue/dist/esm/components/tabs'
import PlayerStats from '@/components/stats/player-stats/PlayerStats.vue'
import type { Game } from '@/models/Game'
import GameHistory from '@/components/stats/game-history/GameHistory.vue'
import GameStats from '@/components/stats/game-stats/GameStats.vue'

const showStats = ref<boolean>(false)

defineProps<{
  games: Game[] | undefined,
}>()

</script>


<style scoped>
.stats {
  position: absolute;
  top: 0;
  right: 0;
}

.scroll {
  height: 80vh;
  overflow: scroll;
}
</style>
