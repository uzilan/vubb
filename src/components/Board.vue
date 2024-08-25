<template>
  <CTable>
    <CTableHead>
      <CTableRow>
        <CTableHeaderCell scope="col" class="name">{{ $t('message.name') }}</CTableHeaderCell>
        <CTableHeaderCell scope="col">
          <CIcon :icon="cilCircle" size="l" />
          <CIcon :icon="cilCircle" size="l" />
        </CTableHeaderCell>
        <CTableHeaderCell scope="col">
          <CIcon :icon="cilCircle" size="l" />
          <CIcon :icon="cilMinus" size="l" />
        </CTableHeaderCell>
        <CTableHeaderCell scope="col">
          <CIcon :icon="cilMinus" size="l" />
          <CIcon :icon="cilMinus" size="l" />
        </CTableHeaderCell>
        <CTableHeaderCell scope="col">
          <CIcon :icon="cilCircle" size="l" />
          <CIcon :icon="cilCircle" size="l" />
          <CIcon :icon="cilCircle" size="l" />
        </CTableHeaderCell>
        <CTableHeaderCell scope="col">
          <CIcon :icon="cilCircle" size="l" />
          <CIcon :icon="cilCircle" size="l" />
          <CIcon :icon="cilMinus" size="l" />
        </CTableHeaderCell>
        <CTableHeaderCell scope="col">
          <CIcon :icon="cilCircle" size="l" />
          <CIcon :icon="cilMinus" size="l" />
          <CIcon :icon="cilMinus" size="l" />
        </CTableHeaderCell>
        <CTableHeaderCell scope="col">
          <CIcon :icon="cilMinus" size="l" />
          <CIcon :icon="cilMinus" size="l" />
          <CIcon :icon="cilMinus" size="l" />
        </CTableHeaderCell>
        <CTableHeaderCell scope="col">{{ $t('message.sum') }}</CTableHeaderCell>
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
        <CTableDataCell v-for="(_, pointIndex) in player.points" v-bind:key="pointIndex">
          <CFormInput
            type="number"
            id="numberOfPlayers"
            label=""
            placeholder=""
            v-model="player.points[pointIndex]"
            key="pointIndex"
          />
        </CTableDataCell>
        <CTableDataCell class="sum">{{ sum(player) }}</CTableDataCell>
      </CTableRow>
    </CTableBody>
  </CTable>
  <div>
    <CButton v-if="lastGamePlayed" @click="saveGame()" color="primary">{{
      $t('message.save')
    }}</CButton>
  </div>
</template>
<script setup lang="ts">
import { cilCircle, cilMinus } from '@coreui/icons'
import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow
} from '@coreui/vue'
import { CFormInput } from '@coreui/vue/dist/esm/components/form'
import { CIcon } from '@coreui/icons-vue'
import type { Player } from '@/models/Player'
import { CButton } from '@coreui/vue/dist/esm/components/button'
import { ref, watch } from 'vue'
import type { Winner } from '@/models/Winner'
import { DateTime } from 'luxon'
import { usePlayersStore } from '@/stores/PlayersStore'

const playersStore = usePlayersStore()

const sum = (player: Player): number => {
  return player.points.reduce((curr: number, acc: number) => Number(acc) + Number(curr), 0)
}

const lastGamePlayed = ref<boolean>(false)

watch(
  playersStore.players,
  () => {
    const lasts = playersStore.players.map((player) => player.points[6])
    const registeredLasts = lasts.filter((points) => points > 0)
    lastGamePlayed.value = registeredLasts.length > 0
  },
  {
    deep: true,
    immediate: true
  }
)

const emit = defineEmits(['saveGame'])

const winner = (): Winner => {
  const playersAndSums = [...playersStore.players].map((player) => ({
    name: player.name,
    points: sum(player)
  }))
  return playersAndSums.sort((a, b) => a.points - b.points)[0]
}

const saveGame = () => {
  const game = {
    playerNames: playersStore.players.map((player) => player.name),
    rows: playersStore.players.map((player) => ({
      player: player.name,
      ss: player.points[0] ?? 0,
      sl: player.points[1] ?? 0,
      ll: player.points[2] ?? 0,
      sss: player.points[3] ?? 0,
      ssl: player.points[4] ?? 0,
      sll: player.points[5] ?? 0,
      lll: player.points[6] ?? 0,
      sum: sum(player)
    })),
    winner: winner(),
    date: DateTime.now().toFormat('yyyy-MM-dd')
  }
  emit('saveGame', game)
}
</script>
<style scoped>
.name {
  min-width: 100px;
}

input {
  padding-left: 0 !important;
  padding-right: 0 !important;
}

td {
  padding-left: 2px !important;
  padding-right: 2px !important;
}

.sum {
  font-weight: bold;
}
</style>
