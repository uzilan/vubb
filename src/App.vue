<script setup lang="ts">
import Start from '@/components/Start.vue'
</script>

<template>
  <Start class="board"></Start>
</template>

<style>
.board {
  display: block;
  grid-template-columns: none;
}

#app {
  padding-bottom: 2rem;
}

html,
body {
  margin: 0;
  height: 100%;
  min-height: 100%;
  background-color: #3298dc;
  vertical-align: middle;
  text-align: center;
  font-family: Roboto, 'Helvetica Neue', sans-serif;
}

table,
thead,
tbody,
tr,
th,
td {
  background-color: #3298dc !important;
}
</style>
