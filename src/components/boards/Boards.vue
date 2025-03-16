<template>
  <CTabs activeItemKey="normal-board">
    <CTabList variant="pills">
      <CTab itemKey="normal-board">{{ $t('message.ubb') }}</CTab>
      <CTab itemKey="long-board">{{ $t('message.longUbb') }}</CTab>
      <CTab itemKey="longer-board">{{ $t('message.longerUbb') }}</CTab>
    </CTabList>
    <CTabContent class="scroll">
      <CTabPanel class="p-3" itemKey="normal-board">
        <Board @saveGame="emit('saveGame')" />
      </CTabPanel>
      <CTabPanel class="p-3" itemKey="long-board">
        <LongBoard />
      </CTabPanel>
      <CTabPanel class="p-3" itemKey="longer-board">
        <LongerBoard />
      </CTabPanel>
    </CTabContent>
  </CTabs>
</template>

<script setup lang="ts">
import { CTab, CTabContent, CTabList, CTabPanel, CTabs } from '@coreui/vue/dist/esm/components/tabs'
import Board from '@/components/boards/Board.vue'
import LongBoard from '@/components/boards/LongBoard.vue'
import LongerBoard from '@/components/boards/LongerBoard.vue'

const emit = defineEmits(['saveGame'])
</script>

<style scoped></style>
