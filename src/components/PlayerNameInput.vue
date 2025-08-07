<template>
  <div class="player-name-input-container">
    <CFormInput
      type="text"
      :id="inputId"
      label=""
      placeholder=""
      v-model="inputValue"
      @input="handleInput"
      @focus="showSuggestions = true"
      @blur="handleBlur"
      @keydown="handleKeydown"
      :class="{ 'has-suggestions': filteredSuggestions.length > 0 && showSuggestions }"
    />
    <div v-if="filteredSuggestions.length > 0 && showSuggestions" class="suggestions-container">
      <div
        v-for="(suggestion, index) in filteredSuggestions"
        :key="suggestion"
        class="suggestion-item"
        :class="{ selected: index === selectedIndex }"
        @mousedown="selectSuggestion(suggestion)"
        @mouseenter="selectedIndex = index"
      >
        {{ suggestion }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CFormInput } from '@coreui/vue/dist/esm/components/form'
import { ref, computed, watch } from 'vue'
import { usePlayersStore } from '@/stores/PlayersStore'

interface Props {
  modelValue: string
  inputId?: string
}

const props = withDefaults(defineProps<Props>(), {
  inputId: 'playerName'
})

const emit = defineEmits(['update:modelValue'])

const playersStore = usePlayersStore()
const inputValue = ref(props.modelValue)
const showSuggestions = ref(false)
const selectedIndex = ref(-1)

const filteredSuggestions = computed(() => {
  if (!inputValue.value.trim()) return playersStore.existingPlayerNames
  return playersStore.existingPlayerNames.filter((name) =>
    name.toLowerCase().includes(inputValue.value.toLowerCase())
  )
})

const handleInput = () => {
  emit('update:modelValue', inputValue.value)
  showSuggestions.value = true
  selectedIndex.value = -1
}

const handleBlur = () => {
  setTimeout(() => {
    showSuggestions.value = false
    selectedIndex.value = -1
    // Trim the input value when blurring
    const trimmedValue = inputValue.value.trim()
    if (trimmedValue !== inputValue.value) {
      inputValue.value = trimmedValue
      emit('update:modelValue', trimmedValue)
    }
  }, 200)
}

const handleKeydown = (event: KeyboardEvent) => {
  if (!showSuggestions.value || filteredSuggestions.value.length === 0) return

  switch (event.key) {
    case 'ArrowDown':
      event.preventDefault()
      selectedIndex.value = Math.min(selectedIndex.value + 1, filteredSuggestions.value.length - 1)
      break
    case 'ArrowUp':
      event.preventDefault()
      selectedIndex.value = Math.max(selectedIndex.value - 1, -1)
      break
    case 'Enter':
      event.preventDefault()
      if (selectedIndex.value >= 0) {
        selectSuggestion(filteredSuggestions.value[selectedIndex.value])
      }
      break
    case 'Escape':
      showSuggestions.value = false
      selectedIndex.value = -1
      break
  }
}

const selectSuggestion = (suggestion: string) => {
  const trimmedSuggestion = suggestion.trim()
  inputValue.value = trimmedSuggestion
  emit('update:modelValue', trimmedSuggestion)
  showSuggestions.value = false
  selectedIndex.value = -1
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

.suggestions-container {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #ccc;
  border-top: none;
  max-height: 150px;
  overflow-y: auto;
  z-index: 1000;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.suggestion-item {
  padding: 8px 12px;
  cursor: pointer;
  border-bottom: 1px solid #eee;
}

.suggestion-item:hover,
.suggestion-item.selected {
  background-color: #f0f0f0;
}

.suggestion-item:last-child {
  border-bottom: none;
}

.has-suggestions {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
</style>
