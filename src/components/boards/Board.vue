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
          <div class="dealer">
            <div v-if="dealerNumber === playerIndex" class="dealer-marker">
              <CIcon :icon="cilChevronRight" size="xl" class="dealer-icon" />
            </div>
            &nbsp;
            <div v-else class="dealer-space">&nbsp;</div>
            <CFormInput
              type="text"
              id="playerName"
              label=""
              placeholder=""
              v-model="player.name"
              key="playerIndex"
              >{{ player.name }}
            </CFormInput>
          </div>
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
import { CButton } from '@coreui/vue/dist/esm/components/button'
import { ref, watch } from 'vue'
import { usePlayersStore } from '@/stores/PlayersStore'
import CellWithIcons from '@/components/boards/CellWithIcons.vue'
import CIcon from '@coreui/icons-vue'
import { cilChevronRight } from '@coreui/icons'

const playersStore = usePlayersStore()

const sum = (player: Player): number => {
  return player.points.reduce((curr: number, acc: number) => Number(acc) + Number(curr), 0)
}

const lastGamePlayed = ref<boolean>(false)

const dealerNumber = ref(0)

watch(
  playersStore.players,
  () => {
    const lasts = playersStore.players.map((player) => player.points[6])
    const registeredLasts = lasts.filter((points) => points > 0)
    const isNullEmptyOrZero = (x: number) => x === null || x === 0 || String(x) === ''
    lastGamePlayed.value = registeredLasts.length > 0

    const games = []
    for (let i = 0; i < 7; i++) {
      const map = playersStore.players.map((player) => player.points[i])
      const items = map.some((x) => !isNullEmptyOrZero(x))
      games.push(items)
    }

    const currentGame = games.lastIndexOf(true) + 1
    dealerNumber.value = currentGame % playersStore.players.length
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

.dealer {
  display: flex;
  align-items: center;
}

.dealer-icon {
  color: #ffffff;
  padding-left: 0;
  margin-left: -5px;
}

.dealer-space {
  width: 20px;
}

.dealer-marker {
  display: flex;
}
</style>
