<template>
  <div class="date">{{ props.game?.date }}</div>
  <div class="table-wrapper">
    <CTable>
      <CTableHead>
        <CTableRow>
          <CTableHeaderCell scope="col">Namn</CTableHeaderCell>
          <CTableHeaderCell scope="col">oo</CTableHeaderCell>
          <CTableHeaderCell scope="col">o-</CTableHeaderCell>
          <CTableHeaderCell scope="col">--</CTableHeaderCell>
          <CTableHeaderCell scope="col">ooo</CTableHeaderCell>
          <CTableHeaderCell scope="col">oo-</CTableHeaderCell>
          <CTableHeaderCell scope="col">o--</CTableHeaderCell>
          <CTableHeaderCell scope="col">---</CTableHeaderCell>
          <CTableHeaderCell scope="col">Summa</CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
        <CTableRow v-for="(row, playerIndex) in props.game?.rows" :key="playerIndex"
                   :class="maybeWinner(row)">
          <CTableDataCell :class="maybeWinner(row)"> {{ row.player }}</CTableDataCell>
          <CTableDataCell :class="maybeWinner(row)">{{ row.ss }}</CTableDataCell>
          <CTableDataCell :class="maybeWinner(row)">{{ row.sl }}</CTableDataCell>
          <CTableDataCell :class="maybeWinner(row)">{{ row.ll }}</CTableDataCell>
          <CTableDataCell :class="maybeWinner(row)">{{ row.sss }}</CTableDataCell>
          <CTableDataCell :class="maybeWinner(row)">{{ row.ssl }}</CTableDataCell>
          <CTableDataCell :class="maybeWinner(row)">{{ row.sll }}</CTableDataCell>
          <CTableDataCell :class="maybeWinner(row)">{{ row.lll }}</CTableDataCell>
          <CTableDataCell :class="maybeWinner(row)" class="sum">{{ row.sum }}</CTableDataCell>
        </CTableRow>
      </CTableBody>
    </CTable>
  </div>
</template>

<script setup lang="ts">
import type { Game } from '@/models/Game'
import { CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/vue'
import type { Row } from '@/models/Row'

const props = defineProps<{
  game: Game | undefined,
}>()

const maybeWinner = (row: Row) => {
  if (row.player.trim() === props.game?.winner?.name.trim()) return 'winner'
  return 'normal'
}
</script>


<style scoped>
th {
  font-weight: bold;
  background-color: white !important;
}

.table-wrapper {
  border: #1f1f1f 1px solid;
  box-shadow: 2px 2px 2px #3298dc;
  margin-bottom: 10px;
}

.date {
  font-size: 12px;
  font-weight: bold;
}

.winner {
  background-color: #ffb3c2 !important;
}

.normal {
  background-color: white !important;
}

.sum {
  font-weight: bold;
}
</style>
