// @vitest-environment jsdom
import { beforeEach, describe, expect, test } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { mount } from '@vue/test-utils'
import LongerBoard from '@/components/boards/LongerBoard.vue'
import { usePlayersStore } from '@/stores/PlayersStore'

const globalStubs = {
  global: {
    mocks: { $t: (key: string) => key }
  }
}

beforeEach(() => {
  setActivePinia(createPinia())
})

describe('sum column', () => {
  test('shows the total of a player\'s longerPoints', () => {
    const store = usePlayersStore()
    store.numberOfPlayers = 1
    store.initPlayers()
    store.players[0].name = 'Alice'
    store.players[0].longerPoints = new Array(13).fill(0)
    store.players[0].longerPoints[0] = 4
    store.players[0].longerPoints[1] = 5

    const wrapper = mount(LongerBoard, globalStubs)

    expect(wrapper.get('.sum').text()).toBe('9')
  })
})
