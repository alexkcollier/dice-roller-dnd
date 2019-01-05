import DiceRolls from '../src/dice-rolls'
import { randInt } from './utils'

describe('DiceRolls', () => {
  let randN
  let randSize
  let mockRolls

  beforeEach(() => {
    // generate and cache random die parameters
    randN = randInt(100)
    randSize = randInt(100)
    mockRolls = new DiceRolls({ n: randN, size: randSize })
  })

  it('roll the correct size of dice', () => {
    expect(mockRolls.size).toBe(randSize)
  })

  it('roll the correct number of dice', () => {
    expect(mockRolls.rolls.length).toBe(randN)
  })

  it('sums the results', () => {
    expect(mockRolls.total).toBe(mockRolls.rolls.reduce((sum, r) => (sum += r), 0))
  })

  it('has results between 1 and the die size', () => {
    const isBetween = mockRolls.rolls.every(v => v >= 1 && v <= randSize)
    expect(isBetween).toBe(true)
  })

  it('sorts results', () => {
    expect(mockRolls.sorted).toEqual(mockRolls.rolls.sort())
  })

  it('return the highest value', () => {
    expect(mockRolls.advantage()).toBe(Math.max(...mockRolls.rolls))
  })

  it('return the lowest value', () => {
    expect(mockRolls.disadvantage()).toBe(Math.min(...mockRolls.rolls))
  })

  describe('keepHighest', () => {
    it('returns one value by default', () => {
      expect(mockRolls.keepHighest().rolls.length).toBe(1)
    })

    it('returns high values', () => {
      const randLength = randInt(randN)

      expect(mockRolls.keepHighest(randLength).rolls.length).toBe(randLength)
      expect(mockRolls.keepHighest(randLength).rolls).toEqual(
        mockRolls.sorted.reverse().slice(0, randLength)
      )
    })
  })

  describe('keepHighest', () => {
    it('returns one value by default', () => {
      expect(mockRolls.keepLowest().rolls.length).toBe(1)
    })

    it('returns low values', () => {
      const randLength = randInt(randN)

      expect(mockRolls.keepLowest(randLength).rolls.length).toBe(randLength)
      expect(mockRolls.keepLowest(randLength).rolls).toEqual(mockRolls.sorted.slice(0, randLength))
    })
  })

  it('rerolls values', () => {
    // reroll() can roll the same result for any given value
    const valuesToReRoll = mockRolls.rolls.slice(0, randInt(mockRolls.rolls.length) - 1)

    mockRolls.reroll(...valuesToReRoll)
    expect(mockRolls.oldRolls).toBeTruthy()
    expect(mockRolls.rolls.length).toBe(mockRolls.oldRolls.length)
  })

  it('defaults to one die', () => {
    const rolls = new DiceRolls()
    expect(rolls.rolls.length).toBe(1)
  })

  it('defaults to null size', () => {
    const rolls = new DiceRolls()
    expect(rolls.size).toBeNull()
  })
})
