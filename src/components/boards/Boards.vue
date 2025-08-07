<template>
  <div class="board-content">
    <Board v-if="props.activeTab === 'normal-board'" @saveGame="emit('saveGame')" />
    <LongBoard v-else-if="props.activeTab === 'long-board'" />
    <LongerBoard v-else-if="props.activeTab === 'longer-board'" />
  </div>
</template>

<script setup lang="ts">
import Board from '@/components/boards/Board.vue'
import LongBoard from '@/components/boards/LongBoard.vue'
import LongerBoard from '@/components/boards/LongerBoard.vue'

const props = defineProps<{
  activeTab: string
}>()

const emit = defineEmits(['saveGame'])
</script>

<style scoped></style>
