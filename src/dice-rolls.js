/**
 * @class DiceRolls
 * @classdesc The results of rolling a set of dice
 * @property {Number} size The size of the dice being rolled
 * @property {Array.<Number>} rolls A result for each die
 * @property {Array.<Number>} sorted The results, but sorted
 * @property {Number} total The sum of the rolls
 * @this DiceRolls
 */
export default class DiceRolls {
  /**
   * Results for dice of given quantity and sice
   * @param {Object.<String, Number>} param0 The dice parameters
   * @param {Number} param0.n How many dice to roll
   * @param {Number} param0.size What size of dice to roll
   */
  /* istanbul ignore next */
  constructor({ n = 1, size = null } = { n: 1 }) {
    this.size = size
    this.rolls = Array.from({ length: n }, () => this._rollDie())
    this.oldRolls = null
  }

  /**
   * Rolls a die
   * @param {Number} size The size of the die to roll
   * @return {Number} The result
   */
  _rollDie(size = this.size) {
    return Math.ceil(Math.random() * size)
  }

  /**
   * Sums an array
   * @param {Array.<Number>} array The values to sum
   */
  _sum(array) {
    return array.reduce((a, c) => a + c, 0)
  }

  get total() {
    return this._sum(this.rolls)
  }

  get sorted() {
    return [...this.rolls].sort()
  }

  /**
   * Get the highest number
   * @return {Number} The highest number
   */
  advantage() {
    return Math.max(...this.rolls)
  }

  /**
   * Get the lowest number
   * @return {Number} The lowest number
   */
  disadvantage() {
    return Math.min(...this.rolls)
  }

  /**
   * Keeps the highest values
   * @param {Number} amount The number of values to keep
   * @return {Array.<Number>} The shortened list of values
   */
  keepHighest(amount = 1) {
    const rolls = [...this.sorted].reverse().slice(0, amount)
    const total = this._sum(rolls)
    return { rolls, total }
  }

  /**
   * Keeps the lowest values
   * @param {Number} amount The number of values to keep
   * @return {Array.<Number>} The shortened list of values
   */
  keepLowest(amount = 1) {
    const rolls = this.sorted.slice(0, amount)
    const total = this._sum(rolls)
    return { rolls, total }
  }

  /**
   * Rerolls specified values
   * @param  {Number} values Numbers to reroll
   * @return {Object.<string, Array.<Number>|Number>} The new rolls
   */
  reroll(...values) {
    this.oldRolls = [...this.rolls]

    this.rolls.forEach((roll, i, a) => {
      if (values.includes(roll)) a[i] = this._rollDie()
    })

    return this
  }
}
