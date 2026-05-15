<template>
  <div class="filters">
    <CFormSelect v-model="selectedYear" style="width: 120px">
      <option value="all">{{ $t('message.allYears') }}</option>
      <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
    </CFormSelect>
  </div>
  <MiniGame v-for="game of filteredGames" :game="game" :key="game.date" />
</template>

<script setup lang="ts">
import MiniGame from '@/components/stats/game-history/MiniGame.vue'
import { DateTime } from 'luxon'
import { ref, computed } from 'vue'
import { CFormSelect } from '@coreui/vue/dist/esm/components/form'
import { useGamesStore } from '@/stores/GamesStore'

const gamesStore = useGamesStore()

const allGames = gamesStore.games ?? []

const years = [...new Set(allGames.map((g) => DateTime.fromISO(g.date).year.toString()))].sort(
  (a, b) => Number(b) - Number(a)
)

const selectedYear = ref<string>(years[0] ?? 'all')

const filteredGames = computed(() => {
  return [...allGames]
    .filter((g) => {
      if (selectedYear.value !== 'all' && DateTime.fromISO(g.date).year.toString() !== selectedYear.value) return false
      return true
    })
    .sort((a, b) => {
      const d1 = DateTime.fromISO(a.date)
      const d2 = DateTime.fromISO(b.date)
      return d1 < d2 ? 1 : d1 > d2 ? -1 : 0
    })
})
</script>

<style scoped>
.filters {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 16px;
  position: sticky;
  top: 0;
  z-index: 10;
  background: white;
  padding: 8px 0;
}

</style>
