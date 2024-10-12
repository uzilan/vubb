<template>
  <img v-bind:src="imgSrc" v-bind:alt="alt" :height="height" />
</template>
<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  code: string
  height: string
}>()
const alt = ref<string>()
const imgSrc = ref<string>()
const loadData = () => {
  const imagePath = '../../SVG-cards'
  if (props.code === 'bj') {
    imgSrc.value = `${imagePath}/black_joker.svg`
    alt.value = `black_joker`
    return
  } else if (props.code === 'rj') {
    imgSrc.value = `${imagePath}/red_joker.svg`
    alt.value = `red_joker`
    return
  }

  let rank = ''
  let suit = ''

  switch (props.code[0]) {
    case 'c':
      suit = 'clubs'
      break
    case 'd':
      suit = 'diamonds'
      break
    case 'h':
      suit = 'hearts'
      break
    default:
      suit = 'spades'
      break
  }

  switch (props.code[1]) {
    case '0':
      rank = '10'
      break
    case '1':
      rank = 'ace'
      break
    case 'j':
      rank = 'jack'
      break
    case 'q':
      rank = 'queen'
      break
    case 'k':
      rank = 'king'
      break
    default:
      rank = String(props.code[1])
  }
  imgSrc.value = `${imagePath}/${rank}_of_${suit}.svg`
  alt.value = `${rank}_of_${suit}`
}

loadData()
</script>

<style scoped></style>
