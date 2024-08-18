<template>
  <CTable>
    <CTableHead>
      <CTableRow>
        <CTableHeaderCell scope="col" class="name">Namn</CTableHeaderCell>
        <CTableHeaderCell scope="col">oo</CTableHeaderCell>
        <CTableHeaderCell scope="col">o-</CTableHeaderCell>
        <CTableHeaderCell scope="col">--</CTableHeaderCell>
        <CTableHeaderCell scope="col">ooo</CTableHeaderCell>
        <CTableHeaderCell scope="col">oo-</CTableHeaderCell>
        <CTableHeaderCell scope="col">o--</CTableHeaderCell>
        <CTableHeaderCell scope="col">o--</CTableHeaderCell>
        <CTableHeaderCell scope="col">---</CTableHeaderCell>
        <CTableHeaderCell scope="col">oooo</CTableHeaderCell>
        <CTableHeaderCell scope="col">ooo-</CTableHeaderCell>
        <CTableHeaderCell scope="col">oo--</CTableHeaderCell>
        <CTableHeaderCell scope="col">o---</CTableHeaderCell>
        <CTableHeaderCell scope="col">----</CTableHeaderCell>
        <CTableHeaderCell scope="col">Summa</CTableHeaderCell>
      </CTableRow>
    </CTableHead>
    <CTableBody>
      <CTableRow v-for="(player, playerIndex) in playersStore.players" :key="playerIndex">
        <CTableDataCell v-model="player.name">
          <CFormInput
            type="text"
            id="playerName"
            label=""
            placeholder=""
            v-model="player.name"
            key="playerIndex"
            >{{ player.name }}
          </CFormInput>
        </CTableDataCell>
        <CTableDataCell v-for="(point, pointIndex) in player.longerPoints" v-bind:key="pointIndex">
          <CFormInput
            type="number"
            id="numberOfPlayers"
            label=""
            placeholder=""
            v-model="player.longerPoints[pointIndex]"
            key="pointIndex"
          />
        </CTableDataCell>
        <CTableDataCell class="sum">{{ sum(player) }}</CTableDataCell>
      </CTableRow>
    </CTableBody>
  </CTable>
</template>
<script setup lang="ts">
import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow
} from '@coreui/vue'
import { CFormInput } from '@coreui/vue/dist/esm/components/form'
import type { Player } from '@/models/Player'
import { ref, watch } from 'vue'
import { usePlayersStore } from '@/stores/PlayersStore'

const playersStore = usePlayersStore()

const sum = (player: Player): number => {
  return player.longerPoints.reduce((curr: number, acc: number) => Number(acc) + Number(curr), 0)
}

const lastGamePlayed = ref<boolean>(false)

watch(
  playersStore.players,
  () => {
    const lasts = playersStore.players.map((player) => player.longerPoints[12])
    const registeredLasts = lasts.filter((points) => points > 0)
    lastGamePlayed.value = registeredLasts.length > 0
  },
  {
    deep: true,
    immediate: true
  }
)
</script>
<style scoped>
.name {
  min-width: 100px;
}

input {
  padding-left: 0 !important;
  padding-right: 0 !important;
}
th {
  white-space: nowrap;
  font-size: 9pt;
}

td {
  padding-left: 2px !important;
  padding-right: 2px !important;
}

.sum {
  font-weight: bold;
}
</style>
