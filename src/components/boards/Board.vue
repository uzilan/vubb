<template>
  <CAlert color="danger" dismissible :visible="illigalPoints" class="alert"
    >{{ $t('message.illegalPoints') }}
  </CAlert>
  <CTable>
    <CTableHead>
      <CTableRow>
        <CTableHeaderCell scope="col" />
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
        <CTableDataCell>
          <div v-if="dealerIndex === playerIndex" class="dealer">
            <CIcon :icon="cilChevronRight" size="xl" class="dealer-icon" />
          </div>
          <div v-else class="dealer-space">&nbsp;</div>
        </CTableDataCell>
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
            :value="player.points[pointIndex] === 0 ? '' : player.points[pointIndex]"
            @input="
              (event) =>
                (player.points[pointIndex] = Number((event.target as HTMLInputElement).value) || 0)
            "
            @blur="validatePoints($event, playerIndex, pointIndex)"
            key="pointIndex"
          />
        </CTableDataCell>
        <CTableDataCell class="sum">{{ sum(player) }}</CTableDataCell>
      </CTableRow>
      <CTableRow class="bottom-row">
        <CTableDataCell></CTableDataCell>
        <CTableDataCell>{{ $t('message.dealtCards') }}</CTableDataCell>
        <CTableDataCell class="bottom-cell">7</CTableDataCell>
        <CTableDataCell class="bottom-cell">8</CTableDataCell>
        <CTableDataCell class="bottom-cell">9</CTableDataCell>
        <CTableDataCell class="bottom-cell">10</CTableDataCell>
        <CTableDataCell class="bottom-cell">10</CTableDataCell>
        <CTableDataCell class="bottom-cell">10</CTableDataCell>
        <CTableDataCell class="bottom-cell">10</CTableDataCell>
        <CTableDataCell></CTableDataCell>
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
import { CAlert } from '@coreui/vue/dist/esm/components/alert'

const playersStore = usePlayersStore()

const illigalPoints = ref<boolean>(false)

const validatePoints = (evt: FocusEvent, playerIndex: number, pointIndex: number) => {
  const target = evt.target as HTMLInputElement
  let value = Number(target.value)

  if (value % 5 !== 0) {
    target.value = ''
    playersStore.players[playerIndex].points[pointIndex] = 0
    illigalPoints.value = true
  } else {
    illigalPoints.value = false
    playersStore.players[playerIndex].points[pointIndex] = value
  }
}

const sum = (player: Player): number => {
  return player.points.reduce((curr: number, acc: number) => Number(acc) + Number(curr), 0)
}

const lastGamePlayed = ref<boolean>(false)

const dealerIndex = ref(0)

watch(
  playersStore.players,
  () => {
    const lasts = playersStore.players.map((player) => player.points[6])
    const registeredLasts = lasts.filter((points) => points > 0)
    lastGamePlayed.value = registeredLasts.length > 0

    const isNullEmptyOrZero = (x: number) => x === null || x === 0 || String(x) === ''
    const playedGames = playersStore.players[0].points.map((_, i) =>
      playersStore.players.some((player) => !isNullEmptyOrZero(player.points[i]))
    )
    const currentGame = playedGames.lastIndexOf(true) + 1
    dealerIndex.value = currentGame % playersStore.players.length
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
  height: 36px;
}

.dealer-icon {
  color: #ffffff;
}

.dealer-space {
  width: 20px;
}

.alert {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
}

.bottom-row {
  height: 20px;
}

.bottom-row td {
  padding: 2px !important;
  height: 20px;
  vertical-align: middle;
  text-align: center;
  font-size: 12px;
  font-weight: bold;
  border: none;
}

.bottom-cell {
  background-color: #f8f9fa;
  border: none;
}
</style>
