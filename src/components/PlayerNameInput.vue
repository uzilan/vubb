<template>
  <div class="player-name-input-container">
    <CFormInput
      type="text"
      :id="inputId"
      label=""
      placeholder=""
      v-model="inputValue"
      @input="handleInput"
      @blur="handleBlur"
      autocomplete="off"
      :autocapitalize="'on'"
      :autocorrect="'off'"
      :spellcheck="false"
    />
  </div>
</template>

<script setup lang="ts">
import { CFormInput } from '@coreui/vue/dist/esm/components/form'
import { ref, watch } from 'vue'

interface Props {
  modelValue: string
  inputId?: string
}

const props = withDefaults(defineProps<Props>(), {
  inputId: 'playerName'
})

const emit = defineEmits(['update:modelValue'])

const inputValue = ref(props.modelValue)

const handleInput = () => {
  emit('update:modelValue', inputValue.value)
}

const handleBlur = () => {
  // Trim the input value when blurring
  const trimmedValue = inputValue.value.trim()
  if (trimmedValue !== inputValue.value) {
    inputValue.value = trimmedValue
    emit('update:modelValue', trimmedValue)
  }
}

watch(
  () => props.modelValue,
  (newValue) => {
    inputValue.value = newValue
  }
)
</script>

<style scoped>
.player-name-input-container {
  position: relative;
  width: 100%;
}
</style>
