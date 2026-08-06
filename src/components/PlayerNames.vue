<template>
  <div class="player-names">
    <div v-for="(player, index) in playersStore.players" :key="index" class="player-name-row">
      <span class="player-label">{{ $t('message.player') }} {{ index + 1 }}</span>
      <PlayerNameInput v-model="player.name" :inputId="`playerName-${index}`" />
    </div>
    <div class="button-row">
      <CButton color="secondary" @click="playersStore.reset()">{{ $t('message.back') }}</CButton>
      <CButton color="primary" :disabled="!allNamesFilled" @click="playersStore.confirmNames()">
        {{ $t('message.continueLabel') }}
      </CButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CButton } from '@coreui/vue/dist/esm/components/button'
import PlayerNameInput from '@/components/PlayerNameInput.vue'
import { usePlayersStore } from '@/stores/PlayersStore'
import { computed } from 'vue'

const playersStore = usePlayersStore()

const allNamesFilled = computed(() =>
  playersStore.players.every((player) => player.name.trim().length > 0)
)
</script>

<style scoped>
.player-names {
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 280px;
  gap: 8px;
}

.player-name-row {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
}

.player-label {
  color: white;
  font-size: 14px;
  white-space: nowrap;
}

.button-row {
  display: flex;
  gap: 8px;
  margin-top: 8px;
}
</style>
