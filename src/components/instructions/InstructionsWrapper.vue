<template>
  <CButton color="primary" @click="showInstructions = true" class="instructions-button"
    ><CIcon :icon="cilInfo" class="me-1" />{{ $t('message.instructions') }}
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
import CIcon from '@coreui/icons-vue'
import { cilInfo } from '@coreui/icons'

const showInstructions = ref<boolean>(false)
</script>

<style scoped>
</style>
