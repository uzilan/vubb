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
            <h4 class="nowrap">{{ $t('message.lowestWinningPoints') }}</h4>
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
    </CContainer>
    <CContainer>
      <CRow>
        <CCol
          ><h4>{{ $t('message.setMasters') }}</h4></CCol
        >
      </CRow>
      <CRow class="justify-content-center">
        <CCol lg="3" xs="6">
          <div class="wrapwrapper">
            <h4 class="center">
              <CIcon :icon="cilCircle" size="l" />
              <CIcon :icon="cilCircle" size="l" />
            </h4>
            <div class="stats-wrapper">
              <ol>
                <li v-for="(playerAndPoints, index) of stats?.setLeagues().ss" :key="index">
                  <span
                    >{{ playerAndPoints.name }} - {{ playerAndPoints.value }}
                    {{ $t('message.points') }}</span
                  >
                </li>
              </ol>
            </div>
          </div>
        </CCol>
        <CCol lg="3" xs="6">
          <div class="wrapwrapper">
            <h4 class="center">
              <CIcon :icon="cilCircle" size="l" />
              <CIcon :icon="cilMinus" size="l" />
            </h4>
            <div class="stats-wrapper">
              <ol>
                <li v-for="(playerAndPoints, index) of stats?.setLeagues().sl" :key="index">
                  <span
                    >{{ playerAndPoints.name }} - {{ playerAndPoints.value }}
                    {{ $t('message.points') }}</span
                  >
                </li>
              </ol>
            </div>
          </div>
        </CCol>
        <CCol lg="3" xs="6">
          <div class="wrapwrapper">
            <h4 class="center">
              <CIcon :icon="cilMinus" size="l" />
              <CIcon :icon="cilMinus" size="l" />
            </h4>
            <div class="stats-wrapper">
              <ol>
                <li v-for="(playerAndPoints, index) of stats?.setLeagues().ll" :key="index">
                  <span
                    >{{ playerAndPoints.name }} - {{ playerAndPoints.value }}
                    {{ $t('message.points') }}</span
                  >
                </li>
              </ol>
            </div>
          </div>
        </CCol>
        <CCol lg="3" xs="6">
          <div class="wrapwrapper">
            <h4 class="center">
              <CIcon :icon="cilCircle" size="l" />
              <CIcon :icon="cilCircle" size="l" />
              <CIcon :icon="cilCircle" size="l" />
            </h4>
            <div class="stats-wrapper">
              <ol>
                <li v-for="(playerAndPoints, index) of stats?.setLeagues().sss" :key="index">
                  <span
                    >{{ playerAndPoints.name }} - {{ playerAndPoints.value }}
                    {{ $t('message.points') }}</span
                  >
                </li>
              </ol>
            </div>
          </div>
        </CCol>
        <CCol lg="3" xs="6">
          <div class="wrapwrapper">
            <h4 class="center">
              <CIcon :icon="cilCircle" size="l" />
              <CIcon :icon="cilCircle" size="l" />
              <CIcon :icon="cilMinus" size="l" />
            </h4>
            <div class="stats-wrapper">
              <ol>
                <li v-for="(playerAndPoints, index) of stats?.setLeagues().ssl" :key="index">
                  <span
                    >{{ playerAndPoints.name }} - {{ playerAndPoints.value }}
                    {{ $t('message.points') }}</span
                  >
                </li>
              </ol>
            </div>
          </div>
        </CCol>
        <CCol lg="3" xs="6">
          <div class="wrapwrapper">
            <h4 class="center">
              <CIcon :icon="cilCircle" size="l" />
              <CIcon :icon="cilMinus" size="l" />
              <CIcon :icon="cilMinus" size="l" />
            </h4>
            <div class="stats-wrapper">
              <ol>
                <li v-for="(playerAndPoints, index) of stats?.setLeagues().sll" :key="index">
                  <span
                    >{{ playerAndPoints.name }} - {{ playerAndPoints.value }}
                    {{ $t('message.points') }}</span
                  >
                </li>
              </ol>
            </div>
          </div> </CCol
        ><CCol lg="3" xs="6">
          <div class="wrapwrapper">
            <h4 class="center">
              <CIcon :icon="cilMinus" size="l" />
              <CIcon :icon="cilMinus" size="l" />
              <CIcon :icon="cilMinus" size="l" />
            </h4>
            <div class="stats-wrapper">
              <ol>
                <li v-for="(playerAndPoints, index) of stats?.setLeagues().lll" :key="index">
                  <span
                    >{{ playerAndPoints.name }} - {{ playerAndPoints.value }}
                    {{ $t('message.points') }}</span
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
import { cilCircle, cilMinus } from '@coreui/icons'
import { CIcon } from '@coreui/icons-vue'

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

.chart-wrapper {
  padding-top: 20px;
}

ol {
  padding-left: 25px;
}
</style>
