<template>
  <h1 v-if="!players.length">Välkommen till UBB!</h1>
  <Auth @user="setUser" />
  <template v-if="user">
    <Stats :games="games" />

    <div v-if="!players.length" class="players">
      <CFormInput
        type="number"
        size="l"
        id="numberOfPlayers"
        label="Antal spelare&nbsp;&nbsp;"
        placeholder=""
        v-model="numberOfPlayers"
      />&nbsp;
      <CButton color="primary" @click="initPlayers()">Ok</CButton>

    </div>
    <div v-if="players.length > 0" class="game" key="players.length">
      <Board :players="players" @saveGame="saveGame"></Board>
    </div>
  </template>
</template>
<script setup lang="ts">
import { CFormInput } from '@coreui/vue/dist/esm/components/form'
import { CButton } from '@coreui/vue/dist/esm/components/button'
import { ref } from 'vue'
import type { Player } from '@/models/Player'
import Board from '@/components/Board.vue'
import Auth from '@/components/Auth.vue'
import type { User } from '@firebase/auth'
import firebase from 'firebase/compat/app'
import type { Game } from '@/models/Game'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import Stats from '@/components/stats/Stats.vue'

const numberOfPlayers = ref<number>(0)
const players = ref<Player[]>([])

const initPlayers = () => {
  for (let i = 0; i < numberOfPlayers.value; i++) {
    players.value.push({ name: '', points: new Array(7).fill(null) })
  }
}

const user = ref<User>()
const setUser = (u: User) => {
  user.value = u
  loadStats()
}

const games = ref<Game[]>()
const loadStats = () => {
  firebase.firestore().collection('games').get().then((data: any) => {
    games.value = data.docs.map((doc: any) => ({
        playerNames: doc.get('playerNames'),
        rows: doc.get('rows'),
        winner: doc.get('winner'),
        date: doc.get('date')
      })
    )
  })
}

const saveGame = (game: Game) => {
  console.log("saving")
  firebase.firestore().collection('games').add(game)
  console.log("saved")
}

</script>
<style scoped lang="scss">

.players {
  display: flex;
  justify-content: space-around;
}

h1 {
  padding-top: 20px;
}

th, .sum {
  font-weight: bolder;
}

.game {
  padding-top: 10px;
  display: grid;
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}


</style>
