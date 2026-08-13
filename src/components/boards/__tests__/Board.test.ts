// @vitest-environment jsdom
import { beforeEach, describe, expect, test } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { mount } from '@vue/test-utils'
import Board from '@/components/boards/Board.vue'
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
  test('shows the total of a player\'s points', () => {
    const store = usePlayersStore()
    store.numberOfPlayers = 1
    store.initPlayers()
    store.players[0].name = 'Alice'
    store.players[0].points = [1, 2, 3, 0, 0, 0, 0]

    const wrapper = mount(Board, globalStubs)

    expect(wrapper.get('.sum').text()).toBe('6')
  })
})

describe('point validation', () => {
  test('a value that is not a multiple of 5 shows the illegal-points alert and zeroes the point', async () => {
    const store = usePlayersStore()
    store.numberOfPlayers = 1
    store.initPlayers()
    store.players[0].name = 'Alice'

    const wrapper = mount(Board, globalStubs)
    const input = wrapper.findAll('input')[0]
    input.element.value = '7'
    await input.trigger('blur')

    expect(wrapper.findComponent({ name: 'CAlert' }).props('visible')).toBe(true)
    expect(store.players[0].points[0]).toBe(0)
  })

  test('a multiple of 5 hides the illegal-points alert and stores the point', async () => {
    const store = usePlayersStore()
    store.numberOfPlayers = 1
    store.initPlayers()
    store.players[0].name = 'Alice'

    const wrapper = mount(Board, globalStubs)
    const input = wrapper.findAll('input')[0]
    input.element.value = '15'
    await input.trigger('blur')

    expect(wrapper.findComponent({ name: 'CAlert' }).props('visible')).toBe(false)
    expect(store.players[0].points[0]).toBe(15)
  })
})

describe('save button', () => {
  test('is hidden until the last set has a registered score', () => {
    const store = usePlayersStore()
    store.numberOfPlayers = 1
    store.initPlayers()
    store.players[0].name = 'Alice'

    const wrapper = mount(Board, globalStubs)

    expect(wrapper.find('button').exists()).toBe(false)
  })

  test('appears once the last set (index 6) has a score above zero', async () => {
    const store = usePlayersStore()
    store.numberOfPlayers = 1
    store.initPlayers()
    store.players[0].name = 'Alice'

    const wrapper = mount(Board, globalStubs)
    store.players[0].points[6] = 10
    await wrapper.vm.$nextTick()

    expect(wrapper.find('button').exists()).toBe(true)
  })
})

describe('dealer indicator', () => {
  test('starts on the first player when no set has been played', () => {
    const store = usePlayersStore()
    store.numberOfPlayers = 2
    store.initPlayers()
    store.players[0].name = 'Alice'
    store.players[1].name = 'Bob'

    const wrapper = mount(Board, globalStubs)
    const rows = wrapper.findAll('tbody tr')

    expect(rows[0].find('.dealer').exists()).toBe(true)
    expect(rows[1].find('.dealer').exists()).toBe(false)
  })

  test('moves to the next player after the first set is played', async () => {
    const store = usePlayersStore()
    store.numberOfPlayers = 2
    store.initPlayers()
    store.players[0].name = 'Alice'
    store.players[1].name = 'Bob'

    const wrapper = mount(Board, globalStubs)
    store.players[0].points[0] = 10
    store.players[1].points[0] = 5
    await wrapper.vm.$nextTick()
    const rows = wrapper.findAll('tbody tr')

    expect(rows[0].find('.dealer').exists()).toBe(false)
    expect(rows[1].find('.dealer').exists()).toBe(true)
  })
})
