<template>
  <div class="cards">
    <CContainer fluid>
      <CRow>
        <CCol xs="12" lg="6">
          <div class="stat-card">
            <h4>{{ $t('message.winningLeague') }}</h4>
            <div class="chart-wrapper">
              <CChart type="bar" :options="hBarOptionsFixed" :data="winnersData" />
            </div>
          </div>
        </CCol>
        <CCol xs="12" lg="6">
          <div class="stat-card">
            <h4>{{ $t('message.mostPlayed') }}</h4>
            <div class="chart-wrapper">
              <CChart type="bar" :options="hBarOptionsFixed" :data="mostPlayedData" />
            </div>
          </div>
        </CCol>
      </CRow>
      <CRow>
        <CCol xs="12" lg="6">
          <div class="stat-card">
            <h4>{{ $t('message.pointLeague') }}</h4>
            <div class="chart-wrapper">
              <CChart type="bar" :options="hBarOptionsFixed" :data="highestsData" />
            </div>
          </div>
        </CCol>
        <CCol xs="12" lg="6">
          <div class="stat-card">
            <h4>{{ $t('message.highestHand') }}</h4>
            <div class="chart-wrapper">
              <CChart type="bar" :options="hBarOptionsFixed" :data="highestHandData" />
            </div>
          </div>
        </CCol>
      </CRow>
      <CRow>
        <CCol xs="12" lg="6">
          <div class="stat-card">
            <h4>{{ $t('message.lowestWinningPoints') }}</h4>
            <div class="chart-wrapper">
              <CChart type="bar" :options="hBarOptionsFixed" :data="lowestsData" />
            </div>
          </div>
        </CCol>
        <CCol xs="12" lg="6">
          <div class="stat-card">
            <h4>{{ $t('message.highestDiff') }}</h4>
            <div class="chart-wrapper">
              <CChart type="bar" :options="hBarOptionsFixed" :data="highestDiffData" />
            </div>
          </div>
        </CCol>
      </CRow>
    </CContainer>
    <CContainer fluid>
      <CRow>
        <CCol xs="12" lg="6">
          <div class="stat-card">
            <div class="set-masters-header">
              <h4>{{ $t('message.playerAverages') }}</h4>
              <CButton size="sm" variant="outline" color="secondary" @click="avgHighFirst = !avgHighFirst">
                {{ avgHighFirst ? '↓' : '↑' }}
              </CButton>
            </div>
            <div class="chart-wrapper">
              <CChart type="bar" :options="hBarOptionsFixed" :data="playerAveragesData" />
            </div>
          </div>
        </CCol>
        <CCol xs="12" lg="6">
          <div class="stat-card">
            <div class="set-masters-header">
              <h4>{{ $t('message.setMasters') }}</h4>
              <CFormSelect v-model="selectedSet" class="set-select">
                <option v-for="(setKey, i) in setKeys" :key="setKey" :value="setKey">{{ setLabels[i] }}</option>
              </CFormSelect>
            </div>
            <div class="chart-wrapper">
              <CChart type="bar" :options="hBarOptionsFixed" :data="setLeagueData(selectedSet)" />
            </div>
          </div>
        </CCol>
      </CRow>
    </CContainer>
    <CContainer fluid>
      <CRow>
        <CCol xs="12" lg="6">
          <div class="stat-card">
            <h4>{{ $t('message.calendarOverview') }}</h4>
            <div class="chart-wrapper">
              <CChart
                type="bar"
                :options="vBarOptions"
                :data="{
                  labels: stats?.calendar().map((entry) => entry.name),
                  datasets: [{ data: stats?.calendar().map((entry) => entry.value) ?? [], backgroundColor: chartColor }]
                }"
              />
            </div>
          </div>
        </CCol>
        <CCol xs="12" lg="6">
          <div class="stat-card">
            <h4>{{ $t('message.weekdayOverview') }}</h4>
            <div class="chart-wrapper">
              <CChart
                type="bar"
                :options="vBarOptions"
                :data="{
                  labels: stats?.weekdays().map((entry) => entry.name),
                  datasets: [{ data: stats?.weekdays().map((entry) => entry.value) ?? [], backgroundColor: chartColor }]
                }"
              />
            </div>
          </div>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script setup lang="ts">
import { Stats, type NameAndValue } from '@/components/stats/Stats'
import { ref, computed } from 'vue'
import { CCol, CContainer, CRow } from '@coreui/vue/dist/esm/components/grid'
import { CChart } from '@coreui/vue-chartjs'
import { CFormSelect } from '@coreui/vue/dist/esm/components/form'
import { CButton } from '@coreui/vue/dist/esm/components/button'
import { useGamesStore } from '@/stores/GamesStore'

const gamesStore = useGamesStore()
const stats = gamesStore.games ? new Stats(gamesStore.games) : undefined

const chartColor = 'rgba(50, 152, 220, 0.7)'

const hBarOptions = {
  indexAxis: 'y' as const,
  plugins: { legend: { display: false } },
  scales: {
    x: { beginAtZero: true },
    y: { ticks: { autoSkip: false } }
  }
}

const hBarOptionsFixed = {
  ...hBarOptions,
  maintainAspectRatio: false
}

const options = {
  plugins: { legend: { display: false } }
}

const vBarOptions = {
  maintainAspectRatio: false,
  plugins: { legend: { display: false } }
}

const toChartData = (items: NameAndValue[] | undefined) => ({
  labels: items?.slice(0, 5).map((i) => `${i.name} (${i.value})`) ?? [],
  datasets: [{ data: items?.slice(0, 5).map((i) => i.value) ?? [], backgroundColor: chartColor }]
})

const avgHighFirst = ref(true)
const playerAveragesData = computed(() => {
  const items = stats?.playerAverages() ?? []
  const sorted = avgHighFirst.value ? items : [...items].reverse()
  const top5 = sorted.slice(0, 5)
  return {
    labels: top5.map((i) => `${i.name} (${i.value} | ${stats?.numberOfGames(i.name)}g)`),
    datasets: [{ data: top5.map((i) => i.value), backgroundColor: chartColor }]
  }
})
const winnersData = toChartData(stats?.winners())
const highestsData = toChartData(stats?.highests())
const highestHandData = toChartData(stats?.highestHand())
const mostPlayedData = toChartData(stats?.mostPlayed())
const highestDiffData = {
  labels: stats?.highestDiff().slice(0, 5).map((d) => `${d.winner.name} vs ${d.loser.name} (${d.diff})`) ?? [],
  datasets: [{ data: stats?.highestDiff().slice(0, 5).map((d) => d.diff) ?? [], backgroundColor: chartColor }]
}
const lowestsData = {
  labels: stats?.lowests().slice(0, 5).map((w) => `${w.name} (${w.points})`) ?? [],
  datasets: [{ data: stats?.lowests().slice(0, 5).map((w) => w.points) ?? [], backgroundColor: chartColor }]
}

type SetKey = 'ss' | 'sl' | 'll' | 'sss' | 'ssl' | 'sll' | 'lll'
const setKeys: SetKey[] = ['ss', 'sl', 'll', 'sss', 'ssl', 'sll', 'lll']
const setLabels = ['oo', 'o-', '--', 'ooo', 'oo-', 'o--', '---']
const selectedSet = ref<SetKey>('ss')

const setLeagueData = (key: SetKey) => toChartData(stats?.setLeagues()[key])
</script>

<style scoped>
.cards {
  text-align: -webkit-center;
}

.stat-card {
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 12px 16px;
  margin: 6px;
  background: #fff;
  text-align: left;
}

h4 {
  font-size: 1rem;
  font-weight: 600;
  color: #444;
  margin-bottom: 10px;
  padding-top: 4px;
}

.set-masters-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 10px;
}

.set-masters-header h4 {
  margin: 0;
  white-space: nowrap;
}

.set-select {
  flex: 0 0 auto;
  width: 80px;
  padding-top: 2px;
  padding-bottom: 2px;
}

.chart-wrapper {
  position: relative;
  height: 200px;
}

ol {
  padding-left: 20px;
  margin: 0;
}

li {
  padding: 3px 0;
  font-size: 0.95rem;
}

li:first-child span {
  background-color: #ffb3c2;
  padding: 1px 4px;
  border-radius: 3px;
}

span {
  white-space: nowrap;
}
</style>
