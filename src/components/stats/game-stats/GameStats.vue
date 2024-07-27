<template>
  <div class="cards">
    <CCard class="card">
      <CCardBody>
        <CCardTitle class="title">Vinstligan</CCardTitle>
        <CCardText class="card-text">
          <ol>
            <li v-for="winner of stats?.winners().entries()" :key="winner[0]"><span>{{ winner[0] }} - {{ winner[1]
              }} ggr</span></li>
          </ol>
        </CCardText>
      </CCardBody>
    </CCard>

    <CCard class="card">
      <CCardBody>
        <CCardTitle class="title">Lägsta vinstpoäng</CCardTitle>
        <CCardText>
          <ol>
            <li v-for="winner of stats?.lowests()" :key="winner.name"><span>{{ winner.name
              }} - {{ winner.points }} p</span></li>
          </ol>
        </CCardText>
      </CCardBody>
    </CCard>

    <CCard class="card">
      <CCardBody>
        <CCardTitle class="title">Poängligan</CCardTitle>
        <CCardText class="card-text">
          <ol>
            <li v-for="(heighest, index) of stats?.highests()" :key="index"><span>{{ heighest[0]
              }} - {{ heighest[1] }} p</span></li>
          </ol>
        </CCardText>
      </CCardBody>
    </CCard>

    <CCard class="card">
      <CCardBody>
        <CCardTitle class="title">Högsta handen</CCardTitle>
        <CCardText>
          <ol>
            <li v-for="(hand, index) of stats?.highestHand()" :key="index"><span>{{ hand[0]
              }} - {{ hand[1] }} p</span></li>
          </ol>
        </CCardText>
      </CCardBody>
    </CCard>

    <CCard class="card">
      <CCardBody>
        <CCardTitle class="title">Flest spelat</CCardTitle>
        <CCardText class="card-text">
          <ol>
            <li v-for="(playerAndGameCount, index) of stats?.mostPlayed()" :key="index"><span>{{ playerAndGameCount[0]
              }} - {{ playerAndGameCount[1] }} ggr</span></li>
          </ol>
        </CCardText>
      </CCardBody>
    </CCard>

    <CCard class="card">
      <CCardBody>
        <CCardTitle class="title">Högsta diffen</CCardTitle>
        <CCardText>
          <ol>
            <li v-for="(diff, index) of stats?.highestDiff()" :key="index">
              <span>{{ diff[2] }} ({{ diff[3] }}) - {{ diff[0] }} ({{ diff[1] }}) - {{ diff[4] }} </span></li>
          </ol>
        </CCardText>
      </CCardBody>
    </CCard>

  </div>
</template>

<script setup lang="ts">
import type { Game } from '@/models/Game'
import { CCard, CCardBody, CCardText, CCardTitle } from '@coreui/vue/dist/esm/components/card'
import { Stats } from '@/components/stats/Stats'
import { CCol, CContainer, CRow } from '@coreui/vue/dist/esm/components/grid'

const props = defineProps<{
  games: Game[] | undefined,
}>()

const stats = props.games ? new Stats(props.games) : undefined

</script>


<style scoped>
.cards {
  text-align: -webkit-center;
}

.card {
  width: 80%;
  height: 12rem;
  margin-bottom: 5px;
}

.card-title {
  text-align: left;
  font-size: 15pt;
  padding-left: 25px;
}

.card-body {
  padding: 5px;
}

.card-text {
  height: 7.5rem;
  overflow-y: scroll;
  font-size: 12pt;
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
