<template>
  <CTableHeaderCell scope="col">
    <template v-for="(letter, index) of icons" v-bind:key="index">
      <CIcon :icon="letter === 'o' ? cilCircle : cilMinus" size="l" />
    </template>
  </CTableHeaderCell>
</template>

<script setup lang="ts">
import { cilCircle, cilMinus } from '@coreui/icons'
import { CTableHeaderCell } from '@coreui/vue'
import { CIcon } from '@coreui/icons-vue'

defineProps<{
  icons: string
}>()
</script>

<style scoped></style>
