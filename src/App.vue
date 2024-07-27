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

div#app {
  grid-template-columns: none;
  padding-left: 5px;
  padding-right: 5px;
}

html, body {
  margin: 0;
  height: 100%;
  min-height: 100%;
  background-color: #3298dc;
  vertical-align: middle;
  text-align: center;
  font-family: Roboto, "Helvetica Neue", sans-serif;
}

table, thead, tbody, tr, th, td {
  background-color: #3298dc !important;
}

</style>
