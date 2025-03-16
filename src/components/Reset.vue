<template>
  <CFormRange
    :label="label()"
    :min="0"
    :max="4"
    id="resetCertainty"
    @update:modelValue="changeCertainty"
    :modelValue="certainty"
  />
  <CButton color="primary" @click="emit('reset')" class="right" :disabled="Number(certainty) < 4"
    >{{ $t('message.reset') }}
  </CButton>
</template>

<script setup lang="ts">
import { CFormRange } from '@coreui/vue/dist/esm/components/form'
import { CButton } from '@coreui/vue/dist/esm/components/button'
import { useI18n } from 'vue-i18n'
import { ref } from 'vue'

const emit = defineEmits(['reset'])
const { t } = useI18n()
const certainty = ref<string>('2')
const label = () => {
  return t(`message.resetLevel${certainty.value}`)
}
const changeCertainty = (value: number) => {
  certainty.value = String(value)
}
</script>

<style scoped></style>
