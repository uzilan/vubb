<template>
  <div class="stat-card">
  <div class="date">{{ props.game?.date }}</div>
  <div class="table-scroll">
    <CTable>
      <CTableHead>
        <CTableRow>
          <CTableHeaderCell scope="col">{{ $t('message.name') }}</CTableHeaderCell>
          <CTableHeaderCell scope="col">oo</CTableHeaderCell>
          <CTableHeaderCell scope="col">o-</CTableHeaderCell>
          <CTableHeaderCell scope="col">--</CTableHeaderCell>
          <CTableHeaderCell scope="col">ooo</CTableHeaderCell>
          <CTableHeaderCell scope="col">oo-</CTableHeaderCell>
          <CTableHeaderCell scope="col">o--</CTableHeaderCell>
          <CTableHeaderCell scope="col">---</CTableHeaderCell>
          <CTableHeaderCell scope="col">{{ $t('message.sum') }}</CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
        <CTableRow
          v-for="(row, playerIndex) in props.game?.rows"
          :key="playerIndex"
          :class="maybeWinner(row)"
        >
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
  </div>
</template>

<script setup lang="ts">
import type { Game } from '@/models/Game'
import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow
} from '@coreui/vue'
import type { Row } from '@/models/Row'

const props = defineProps<{
  game: Game | undefined
}>()

const maybeWinner = (row: Row) => {
  if (row.player.trim() === props.game?.winner?.name.trim()) return 'winner'
  return 'normal'
}
</script>

<style scoped>
.stat-card {
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 12px 16px;
  margin: 10px 0;
  background: #fff;
  text-align: left;
}

.date {
  font-size: 0.8rem;
  font-weight: 400;
  color: #888;
  margin-bottom: 8px;
}

.table-scroll {
  overflow-x: auto;
}

th {
  font-weight: bold;
  background-color: white !important;
  white-space: nowrap;
}

.winner {
  background-color: #fcc8d2 !important;
}

.normal {
  background-color: white !important;
}

.sum {
  font-weight: bold;
}
</style>
