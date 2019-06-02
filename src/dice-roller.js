import DiceRolls from './dice-rolls'

export const dieSizes = [4, 6, 8, 10, 12, 20, 100]

/**
 * @class DiceRoller
 * @classdesc Rolls a set of dice
 * @property {Number} size The size of the dice being rolled
 * @property {Number} n The default number of dice to roll
 * @property {Number} toRoll Overrides `n` when necessary
 * @this DiceRolls
 */
export default class DiceRoller {
  /**
   * Rolls dice of given quantity and sice
   * @param {Object.<String, Number>} param0 The dice parameters
   * @param {Number} param0.n How many dice to roll
   * @param {Number} param0.size What size of dice to roll
   * @param {Boolean} param0.shouldInit If `this.init()` should be called
   */
  /* istanbul ignore next */
  constructor({ n = 1, size, shouldInit = true } = { n: 1, shouldInit: true }) {
    this.n = n > 0 ? n : 1
    this.size = size
    this.toRoll = null

    // this way a d4 can't roll a d8, but you don't need to call `roll()`
    // if you only want to roll a single die of any size.
    if (!size && shouldInit) this.init()
  }

  /**
   * Rolls a die
   * @param {Number} size The size of the die to roll
   * @return {DiceRolls} The result
   */
  d(size) {
    // cache the dice to roll
    const n = this.toRoll || this.n
    // reset the property
    this.toRoll = null
    // roll
    return new DiceRolls({ n, size })
  }

  _makeDie(size) {
    return () => new DiceRoller({ n: this.toRoll || this.n, size, shouldInit: false }).roll()
  }

  /**
   * How many dice are you rolling?
   * @param {Number} nToRoll How many dice to roll
   * @return {DiceRolls|Array.<Function>} The result, or if there is no set size, the standard dice
   */
  roll(nToRoll = this.n) {
    this.toRoll = nToRoll > 0 ? nToRoll : 1
    // Just roll the die if a size is set already
    if (this.size) return this.d(this.size)
    // Define standard dice
    const dice = { d: this.d.bind(this) }
    dieSizes.forEach(size => (dice[`d${size}`] = this._makeDie(size)))

    return dice
  }

  init() {
    dieSizes.forEach(size => (this[`d${size}`] = this._makeDie(size)))
  }
}
