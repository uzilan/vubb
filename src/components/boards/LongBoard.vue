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
      </CTableRow>
    </CTableHead>
    <CTableBody>
      <CTableRow v-for="(player, playerIndex) in playersStore.players" :key="playerIndex">
        <CTableDataCell v-model="player.name" class="name">
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
        <CTableDataCell v-for="(point, pointIndex) in player.points" v-bind:key="pointIndex">
          <CFormCheck id="flexCheckDefault" />
        </CTableDataCell>
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
import { CFormCheck, CFormInput } from '@coreui/vue/dist/esm/components/form'
import { usePlayersStore } from '@/stores/PlayersStore'
import CellWithIcons from '@/components/boards/CellWithIcons.vue'

const playersStore = usePlayersStore()
</script>
<style scoped>
.name {
  min-width: 50px;
}

input {
  padding-left: 0 !important;
  padding-right: 0 !important;
}

td {
  padding-left: 2px !important;
  padding-right: 2px !important;
  width: 200px;
}

.form-check-input[type='checkbox'] {
  height: 38px;
  width: 38px;
  margin-top: 0px;
}
</style>
