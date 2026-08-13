// @vitest-environment jsdom
import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import Card from '@/components/instructions/Card.vue'

describe('joker codes', () => {
  test('bj renders the black joker image', () => {
    const wrapper = mount(Card, { props: { code: 'bj', height: '60px' } })

    expect(wrapper.get('img').attributes('src')).toContain('black_joker.svg')
    expect(wrapper.get('img').attributes('alt')).toBe('black_joker')
  })

  test('rj renders the red joker image', () => {
    const wrapper = mount(Card, { props: { code: 'rj', height: '60px' } })

    expect(wrapper.get('img').attributes('src')).toContain('red_joker.svg')
    expect(wrapper.get('img').attributes('alt')).toBe('red_joker')
  })
})

describe('suit codes', () => {
  test.each([
    ['c', 'clubs'],
    ['d', 'diamonds'],
    ['h', 'hearts'],
    ['s', 'spades']
  ])('%s resolves to %s', (suitCode, suitName) => {
    const wrapper = mount(Card, { props: { code: `${suitCode}5`, height: '60px' } })

    expect(wrapper.get('img').attributes('alt')).toBe(`5_of_${suitName}`)
  })

  test('an unrecognized first letter falls back to spades', () => {
    const wrapper = mount(Card, { props: { code: 'x5', height: '60px' } })

    expect(wrapper.get('img').attributes('alt')).toBe('5_of_spades')
  })
})

describe('rank codes', () => {
  test.each([
    ['0', '10'],
    ['1', 'ace'],
    ['j', 'jack'],
    ['q', 'queen'],
    ['k', 'king'],
    ['7', '7']
  ])('%s resolves to rank %s', (rankCode, rankName) => {
    const wrapper = mount(Card, { props: { code: `c${rankCode}`, height: '60px' } })

    expect(wrapper.get('img').attributes('alt')).toBe(`${rankName}_of_clubs`)
  })
})
