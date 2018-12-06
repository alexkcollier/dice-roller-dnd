import DiceRoller, { dieSizes } from '../src/dice-roller'
import DiceRolls from '../src/dice-rolls'
import { randInt } from './utils'

describe('DiceRoller', () => {
  let randN
  let randSize
  let Roller

  beforeEach(() => {
    // generate and cache random die parameters
    randN = randInt(100)
    randSize = randInt(100)
    Roller = new DiceRoller({ n: randN, size: randSize })
  })

  it('generates all dice', () => {
    const genericRoller = new DiceRoller()

    dieSizes.forEach(size => {
      expect(genericRoller[`d${size}`]).toBeTruthy()
      expect(genericRoller[`d${size}`]).toBeInstanceOf(Function)
      expect(genericRoller[`d${size}`]()).toBeInstanceOf(DiceRolls)
    })
  })

  it('chains `roll()` and `d()`', () => {
    const genericRoller = new DiceRoller()
    const result = genericRoller.roll(randN).d(randSize)

    expect(result).toBeTruthy()
    expect(result).toBeInstanceOf(DiceRolls)
  })

  it('always rolls at least one die', () => {
    const genericRoller = new DiceRoller()

    expect(genericRoller.roll(-1).d(randInt(100)).rolls.length).toBeGreaterThan(0)
    expect(genericRoller.roll(0).d(randInt(100)).rolls.length).toBeGreaterThan(0)
  })

  it('rolls dice of any size', () => {
    expect(Roller.d(randInt(100)).rolls.length).toBeGreaterThan(0)
  })

  it('rolls dice of any quantity', () => {
    expect(Roller.roll(randInt(100) - 1).rolls.length).toBeGreaterThan(0)
  })

  it('does not generate dice if size is specified', () => {
    dieSizes.forEach(size => expect(Roller[`d${size}`]).toBeUndefined())
  })

  it('rolls the correct number of dice', () => {
    expect(Roller.roll().rolls.length).toBe(randN)
  })
})
