<template>
  <CTable>
    <CTableHead>
      <CTableRow>
        <CTableHeaderCell scope="col" class="name">Namn</CTableHeaderCell>
        <CTableHeaderCell scope="col">
          <CIcon :icon="cilCircle" size="l" />
          <CIcon :icon="cilCircle" size="l" />
          <span>&nbsp;&nbsp;&nbsp;</span>
        </CTableHeaderCell>
        <CTableHeaderCell scope="col">
          <CIcon :icon="cilCircle" size="l" />
          <CIcon :icon="cilMinus" size="l" />
          <span>&nbsp;&nbsp;&nbsp;</span>
        </CTableHeaderCell>
        <CTableHeaderCell scope="col">
          <CIcon :icon="cilMinus" size="l" />
          <CIcon :icon="cilMinus" size="l" />
          <span>&nbsp;&nbsp;&nbsp;</span>
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
      </CTableRow>
    </CTableHead>
    <CTableBody>
      <CTableRow v-for="(player, playerIndex) in players" :key="playerIndex">
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
  <div>
    <CButton @click="resetGame()" color="primary">Starta om</CButton>
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
import { CFormCheck, CFormInput } from '@coreui/vue/dist/esm/components/form'
import { CIcon } from '@coreui/icons-vue'
import type { Player } from '@/models/Player'
import { CButton } from '@coreui/vue/dist/esm/components/button'

defineProps<{
  players: Player[]
}>()

const emit = defineEmits(['resetGame'])

const resetGame = () => {
  emit('resetGame')
}
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
