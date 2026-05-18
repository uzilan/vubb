<template>
  <div class="players">
    <CFormLabel class="players-label">{{ $t('message.numberOfPlayers') }}: {{ playersStore.numberOfPlayers }}</CFormLabel>
    <div class="slider-wrap">
      <CFormRange
        id="numberOfPlayers"
        :min="2"
        :max="8"
        :step="1"
        v-model="playersStore.numberOfPlayers"
        class="players-slider"
      />
      <div class="scale">
        <span v-for="n in [2,3,4,5,6,7,8]" :key="n">{{ n }}</span>
      </div>
    </div>
    <CButton color="primary" @click="playersStore.initPlayers()">{{ $t('message.start') }}</CButton>
  </div>
</template>

<script setup lang="ts">
import { CFormLabel, CFormRange } from '@coreui/vue/dist/esm/components/form'
import { CButton } from '@coreui/vue/dist/esm/components/button'
import { usePlayersStore } from '@/stores/PlayersStore'
import { onMounted } from 'vue'

const playersStore = usePlayersStore()

onMounted(() => {
  if (playersStore.numberOfPlayers < 2) playersStore.numberOfPlayers = 4
})
</script>

<style scoped>
.players {
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 280px;
  gap: 8px;
}

.players-label {
  font-weight: bolder;
  font-size: 22px;
}

.slider-wrap {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.players-slider {
  width: 100%;
  margin-bottom: 0 !important;
  padding-bottom: 0 !important;
}

.scale {
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: white;
  opacity: 0.8;
}
</style>
