<template>
  <CButton color="primary" @click="showInstructions = true" class="instructions-button"
    >{{ $t('message.instructions') }}
  </CButton>
  <CModal
    size="xl"
    alignment="center"
    :backdrop="true"
    :keyboard="false"
    :visible="showInstructions"
    @close="showInstructions = false"
  >
    <CModalHeader>
      <CModalTitle>{{ $t('message.instructions') }}</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <Instructions />
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
import Instructions from '@/components/instructions/Instructions.vue'
import { CButton } from '@coreui/vue/dist/esm/components/button'
import { ref } from 'vue'

const showInstructions = ref<boolean>(false)
</script>

<style scoped>
.instructions-button {
  position: absolute;
  top: 0;
  right: 0;
}
</style>
