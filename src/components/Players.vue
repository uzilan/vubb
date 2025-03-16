<template>
  <div class="players">
    <CFormLabel for="numberOfPlayers" class="players-label"
      >{{ $t('message.numberOfPlayers') }}
    </CFormLabel>
    <CFormInput
      type="number"
      size="l"
      id="numberOfPlayers"
      placeholder=""
      v-model="playersStore.numberOfPlayers"
    />&nbsp;
    <CButton color="primary" @click="playersStore.initPlayers()">{{ $t('message.ok') }}</CButton>
  </div>
</template>

<script setup lang="ts">
import { CFormInput, CFormLabel } from '@coreui/vue/dist/esm/components/form'
import { CButton } from '@coreui/vue/dist/esm/components/button'
import { usePlayersStore } from '@/stores/PlayersStore'

const playersStore = usePlayersStore()
</script>

<style scoped>
.players {
  margin: auto;
  display: flex;
  width: 280px;
  justify-content: space-around;
}

.players-label {
  white-space: nowrap;
  vertical-align: center;
  font-weight: bolder;
  font-size: 22px;
  padding-right: 10px;
  padding-top: 10px;
}
</style>
