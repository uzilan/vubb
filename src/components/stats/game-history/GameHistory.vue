<template>
  <MiniGame v-for="game of sortedGames()" :game="game" :key="game.date" />
</template>

<script setup lang="ts">
import MiniGame from '@/components/stats/game-history/MiniGame.vue'
import { DateTime } from 'luxon'
import { useGamesStore } from '@/stores/GamesStore'

const gamesStore = useGamesStore()

const sortedGames = () => {
  if (!gamesStore.games) return
  return [...gamesStore.games].sort((a, b) => compareDates(a.date, b.date))
}
const compareDates = (a: string, b: string) => {
  const date1 = DateTime.fromISO(a)
  const date2 = DateTime.fromISO(b)
  if (date1 < date2) return 1
  else if (date1 > date2) return -1
  return 0
}
</script>

<style scoped></style>
