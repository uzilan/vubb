import type { Row } from '@/models/Row'
import type { Winner } from '@/models/Winner'

export interface Game {
  playerNames: string[]
  rows: Row[]
  winner: Winner
  date: string
  savedBy: string
}
