<template>
  <CButton
    v-if="authStore.user && playersStore.players.length"
    color="primary"
    @click="showReset = true"
    class="reset-button"
    >{{ $t('message.restart') }}
  </CButton>
  <CModal
    size="l"
    alignment="center"
    :backdrop="true"
    :keyboard="false"
    :visible="showReset"
    @close="showReset = false"
  >
    <CModalHeader>
      <CModalTitle>{{ $t('message.resetCertainty') }}</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <Reset @reset="resetGame()" />
    </CModalBody>
  </CModal>
</template>

<script setup lang="ts">
import {
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle
} from '@coreui/vue/dist/esm/components/modal'
import Reset from '@/components/Reset.vue'
import { CButton } from '@coreui/vue/dist/esm/components/button'
import { useAuthStore } from '@/stores/AuthStore'
import { usePlayersStore } from '@/stores/PlayersStore'
import { ref } from 'vue'

const showReset = ref<boolean>(false)
const authStore = useAuthStore()
const playersStore = usePlayersStore()

const resetGame = () => {
  showReset.value = false
  playersStore.reset()
}
</script>

<style scoped>
.reset-button {
  position: absolute;
  top: 0;
  left: 110px;
}
</style>
