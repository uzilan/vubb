<template>
  <div class="player">
    <CFormSelect v-model="selectedPlayer">
      <option value="">Välj en spelare</option>
      <option v-for="player of stats?.players()" key="player">{{ player }}</option>
    </CFormSelect>
  </div>
  <template v-if="selectedPlayer && selectedPlayer !== ''">
    <div>
      <dl>
        <dt>Antal spel:</dt>
        <dd>{{ numberOfGames }}</dd>
        <dt>Maxpoäng:</dt>
        <dd>{{ max }}</dd>
        <dt>Genomsnittliga poäng:</dt>
        <dd>{{ average }}</dd>
        <dt>Minpoäng:</dt>
        <dd>{{ min }}</dd>
      </dl>
    </div>
    <div>
      <CChart
        type="bar"
        :options="options"
        :data="{
          labels: [`oo`, 'o-', '--', 'ooo', 'oo-', 'o--', '---'],
          datasets: [
            {
              label: 'Genomsnittliga poäng',
              data: setAverages ?? []
            },
            {
              label: 'Maxpoäng ',
              data: setMaxes ?? []
            }
          ]
        }"
        labels="months"
      />
    </div>
    <div>
      <CChart
        type="bar"
        :options="options"
        :data="{
          labels: [`1`, '2', '3', '4', '5'],
          datasets: [
            {
              label: 'Placeringar',
              data: placements ?? []
            }
          ]
        }"
        labels="months"
      />
    </div>
  </template>
</template>

<script setup lang="ts">
import { CFormSelect } from '@coreui/vue/dist/esm/components/form'
import type { Game } from '@/models/Game'
import { Stats } from '@/components/stats/Stats'
import { ref, watch } from 'vue'
import { CChart } from '@coreui/vue-chartjs'

const props = defineProps<{
  games: Game[] | undefined
}>()

const stats = props.games ? new Stats(props.games) : undefined
const selectedPlayer = ref<string | undefined>()
const max = ref<number>()
const min = ref<number>()
const numberOfGames = ref<number>()
const average = ref<number>()
const setAverages = ref<number[]>()
const setMaxes = ref<number[]>()
const placements = ref<number[]>()
const options = {
  legend: {
    display: false
  }
}

watch(selectedPlayer, () => {
  max.value = stats?.maxPoints(selectedPlayer.value)
  min.value = stats?.minPoints(selectedPlayer.value)
  numberOfGames.value = stats?.numberOfGames(selectedPlayer.value)
  average.value = stats?.averagePoints(selectedPlayer.value)
  setAverages.value = stats?.setAverages(selectedPlayer.value)
  setMaxes.value = stats?.setMaxes(selectedPlayer.value)
  placements.value = stats?.placements(selectedPlayer.value)
})
</script>

<style scoped>
.player {
  padding-bottom: 20px;
}

dl {
  display: grid;
  grid-template-columns: max-content auto;
}

dt {
  grid-column-start: 1;
  text-align: left;
}

dd {
  grid-column-start: 2;
  text-align: right;
}
</style>
