<template>
  <div class="cards">
    <CContainer>
      <CRow class="align-items-start">
        <CCol>
          <div class="wrapwrapper">
            <h4>{{ $t('message.winningLeague') }}</h4>
            <div class="stats-wrapper">
              <ol>
                <li v-for="winner of stats?.winners()" :key="winner.name">
                  <span>{{ winner.name }} - {{ winner.value }} {{ $t('message.times') }}</span>
                </li>
              </ol>
            </div>
          </div>
        </CCol>
        <CCol>
          <div class="wrapwrapper">
            <h4>{{ $t('message.lowestWinningPoints') }}</h4>
            <div class="stats-wrapper">
              <ol>
                <li v-for="winner of stats?.lowests()" :key="winner.name">
                  <span>{{ winner.name }} - {{ winner.points }} {{ $t('message.points') }}</span>
                </li>
              </ol>
            </div>
          </div>
        </CCol>
      </CRow>
      <CRow>
        <CCol>
          <div class="wrapwrapper">
            <h4>{{ $t('message.pointLeague') }}</h4>
            <div class="stats-wrapper">
              <ol>
                <li v-for="(heighest, index) of stats?.highests()" :key="index">
                  <span>{{ heighest.name }} - {{ heighest.value }} {{ $t('message.points') }}</span>
                </li>
              </ol>
            </div>
          </div>
        </CCol>
        <CCol>
          <div class="wrapwrapper">
            <h4>{{ $t('message.highestHand') }}</h4>
            <div class="stats-wrapper">
              <ol>
                <li v-for="(hand, index) of stats?.highestHand()" :key="index">
                  <span>{{ hand.name }} - {{ hand.value }} {{ $t('message.points') }}</span>
                </li>
              </ol>
            </div>
          </div>
        </CCol>
      </CRow>
      <CRow>
        <CCol>
          <div class="wrapwrapper">
            <h4>{{ $t('message.mostPlayed') }}</h4>
            <div class="stats-wrapper">
              <ol>
                <li v-for="(playerAndGameCount, index) of stats?.mostPlayed()" :key="index">
                  <span
                    >{{ playerAndGameCount.name }} - {{ playerAndGameCount.value }}
                    {{ $t('message.times') }}</span
                  >
                </li>
              </ol>
            </div>
          </div>
        </CCol>
        <CCol>
          <div class="wrapwrapper">
            <h4>{{ $t('message.highestDiff') }}</h4>
            <div class="stats-wrapper">
              <ol>
                <li v-for="(diff, index) of stats?.highestDiff()" :key="index">
                  <span
                    >{{ diff.loser.name }} ({{ diff.loser.value }}) - {{ diff.winner.name }} ({{
                      diff.winner.value
                    }}) - {{ diff.diff }} {{ $t('message.points') }}
                  </span>
                </li>
              </ol>
            </div>
          </div>
        </CCol>
      </CRow>
      <CRow>
        <CCol>
          <div class="wrapwrapper">
            <h4>{{ $t('message.weighedWinner') }}</h4>
            <div class="stats-wrapper">
              <ol>
                <li v-for="(weighedWinner, index) of stats?.weighedWinners()" :key="index">
                  <span
                    >{{ weighedWinner.name }} - {{ weighedWinner.value
                    }}{{ $t('message.percentage') }}</span
                  >
                </li>
              </ol>
            </div>
          </div>
        </CCol>
      </CRow>
    </CContainer>
    <CChart
      type="bar"
      :options="options"
      :data="{
        labels: stats?.calendar().map((entry) => entry.name),
        datasets: [
          {
            label: $t('message.numberOfGames'),
            data: stats?.calendar().map((entry) => entry.value) ?? []
          }
        ]
      }"
      labels="months"
    />
    <CChart
      type="bar"
      :options="options"
      :data="{
        labels: stats?.weekdays().map((entry) => entry.name),
        datasets: [
          {
            label: $t('message.weekday'),
            data: stats?.weekdays().map((entry) => entry.value) ?? []
          }
        ]
      }"
      labels="months"
    />
  </div>
</template>

<script setup lang="ts">
import type { Game } from '@/models/Game'
import { Stats } from '@/components/stats/Stats'
import { CCol, CContainer, CRow } from '@coreui/vue/dist/esm/components/grid'
import { CChart } from '@coreui/vue-chartjs'

const props = defineProps<{
  games: Game[] | undefined
}>()

const stats = props.games ? new Stats(props.games) : undefined

const options = {
  legend: {
    display: false
  }
}
</script>

<style scoped>
.cards {
  text-align: -webkit-center;
}

.wrapwrapper {
  border: #1f1f1f 1px solid;
  box-shadow: 2px 2px 2px #3298dc;
  padding: 2px;
  margin: 5px;
}

.stats-wrapper {
  height: 7.5rem;
  overflow-y: scroll;
  font-size: 12pt;
}

h4 {
  text-align: left;
  padding-left: 20px;
  padding-top: 15px;
}

li {
  text-align: left;
}

li:first-child span {
  background-color: #ffb3c2;
  padding: 2px;
}

span {
  white-space: nowrap;
}

.title {
  white-space: nowrap;
}
</style>
