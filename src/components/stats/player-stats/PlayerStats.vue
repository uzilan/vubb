<template>
  <div class="player">
    <CFormSelect v-model="selectedPlayer">
      <option value="">{{ $t('message.choosePlayer') }}</option>
      <option v-for="player of stats?.players()" :key="player">{{ player }}</option>
    </CFormSelect>
  </div>
  <template v-if="selectedPlayer && selectedPlayer !== ''">
    <div>
      <dl>
        <dt>{{ $t('message.numberOfGames') }}:</dt>
        <dd>{{ numberOfGames }}</dd>
        <dt>{{ $t('message.maxPoints') }}:</dt>
        <dd>{{ max }}</dd>
        <dt>{{ $t('message.averagePoints') }}:</dt>
        <dd>{{ average }}</dd>
        <dt>{{ $t('message.minPoints') }}:</dt>
        <dd>{{ min }}</dd>
      </dl>
    </div>
    <div>
      <CChart
        type="radar"
        :plugins="[radarLabelsPlugin]"
        :options="radarOptions"
        :data="{
          labels: ['oo', 'o-', '--', 'ooo', 'oo-', 'o--', '---'],
          datasets: [
            {
              label: $t('message.averagePoints'),
              data: setAverages ?? [],
              backgroundColor: 'rgba(50, 152, 220, 0.2)',
              borderColor: 'rgba(50, 152, 220, 0.9)',
              pointBackgroundColor: 'rgba(50, 152, 220, 0.9)'
            },
            {
              label: $t('message.maxPoints'),
              data: setMaxes ?? [],
              backgroundColor: 'rgba(220, 100, 100, 0.2)',
              borderColor: 'rgba(220, 100, 100, 0.9)',
              pointBackgroundColor: 'rgba(220, 100, 100, 0.9)'
            }
          ]
        }"
      />
    </div>
    <div>
      <CChart
        type="pie"
        :plugins="[pieLabelsPlugin]"
        :options="doughnutOptions"
        :data="{
          labels: ['1st', '2nd', '3rd', '4th', '5th'].map((label, i) => `${label} (${placements?.[i] ?? 0})`),
          datasets: [
            {
              data: placements ?? [],
              backgroundColor: [
                'rgba(255, 195, 0, 0.8)',
                'rgba(180, 180, 180, 0.8)',
                'rgba(180, 120, 60, 0.8)',
                'rgba(100, 160, 220, 0.8)',
                'rgba(160, 100, 200, 0.8)'
              ]
            }
          ]
        }"
      />
    </div>
  </template>
</template>

<script setup lang="ts">
import { CFormSelect } from '@coreui/vue/dist/esm/components/form'
import { Stats } from '@/components/stats/Stats'
import { ref, watch } from 'vue'
import { CChart } from '@coreui/vue-chartjs'
import { useGamesStore } from '@/stores/GamesStore'

const gamesStore = useGamesStore()
const stats = gamesStore.games ? new Stats(gamesStore.games) : undefined
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

const doughnutOptions = {
  plugins: {
    legend: { display: true, position: 'right' as const }
  }
}

const pieLabelsPlugin = {
  id: 'pieLabels',
  afterDatasetsDraw(chart: any) {
    const { ctx } = chart
    chart.data.datasets.forEach((dataset: any, datasetIndex: number) => {
      const meta = chart.getDatasetMeta(datasetIndex)
      meta.data.forEach((element: any, index: number) => {
        const value = dataset.data[index]
        if (!value) return
        const { x, y } = element.tooltipPosition()
        ctx.save()
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillStyle = '#fff'
        ctx.font = 'bold 13px sans-serif'
        ctx.fillText(value, x, y)
        ctx.restore()
      })
    })
  }
}

const radarOptions = {
  plugins: { legend: { display: true } },
  scales: { r: { beginAtZero: true } }
}

const radarLabelsPlugin = {
  id: 'radarLabels',
  afterDatasetsDraw(chart: any) {
    const { ctx } = chart
    chart.data.datasets.forEach((dataset: any, datasetIndex: number) => {
      const meta = chart.getDatasetMeta(datasetIndex)
      const color = dataset.borderColor ?? '#444'
      meta.data.forEach((element: any, index: number) => {
        const value = dataset.data[index]
        if (!value) return
        const { x, y } = element
        const cx = chart.scales.r.xCenter
        const cy = chart.scales.r.yCenter
        const dx = x - cx
        const dy = y - cy
        const len = Math.sqrt(dx * dx + dy * dy)
        const offset = 12
        const lx = len > 0 ? x + (dx / len) * offset : x
        const ly = len > 0 ? y + (dy / len) * offset : y
        ctx.save()
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillStyle = color
        ctx.font = 'bold 11px sans-serif'
        ctx.fillText(value, lx, ly)
        ctx.restore()
      })
    })
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
  position: sticky;
  top: 0;
  z-index: 10;
  background: white;
  padding-top: 8px;
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
