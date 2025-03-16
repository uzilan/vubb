<template>
  <CTable>
    <CTableHead>
      <CTableRow>
        <CTableHeaderCell scope="col" class="name">{{ $t('message.name') }}</CTableHeaderCell>
        <CellWithIcons icons="oo" />
        <CellWithIcons icons="o-" />
        <CellWithIcons icons="--" />
        <CellWithIcons icons="ooo" />
        <CellWithIcons icons="oo-" />
        <CellWithIcons icons="o--" />
        <CellWithIcons icons="---" />
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
    <CButton v-if="lastGamePlayed" @click="emit('saveGame')" color="primary"
      >{{ $t('message.save') }}
    </CButton>
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
import { usePlayersStore } from '@/stores/PlayersStore'
import CellWithIcons from '@/components/boards/CellWithIcons.vue'

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
