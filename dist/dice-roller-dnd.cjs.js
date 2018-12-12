'use strict';

/**
 * @class DiceRolls
 * @classdesc The results of rolling a set of dice
 * @property {Number} size The size of the dice being rolled
 * @property {Array.<Number>} rolls A result for each die
 * @property {Array.<Number>} sorted The results, but sorted
 * @property {Number} total The sum of the rolls
 * @this DiceRolls
 */
class DiceRolls {
  /**
   * Results for dice of given quantity and sice
   * @param {Object.<String, Number>} param0 The dice parameters
   * @param {Number} param0.n How many dice to roll
   * @param {Number} param0.size What size of dice to roll
   */
  constructor({ n = 1, size = null } = { n: 1 }) {
    this.size = size;
    this.rolls = Array.from({ length: n }, () => this._rollDie());
    this.oldRolls = null;
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
    return this.rolls.sort()
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
    return this.sorted.reverse().slice(0, amount)
  }

  /**
   * Keeps the lowest values
   * @param {Number} amount The number of values to keep
   * @return {Array.<Number>} The shortened list of values
   */
  keepLowest(amount = 1) {
    return this.sorted.slice(0, amount)
  }

  /**
   * Rerolls specified values
   * @param  {Number} values Numbers to reroll
   * @return {Object.<string, Array.<Number>|Number>} The new rolls
   */
  reroll(...values) {
    this.oldRolls = this.rolls;

    this.rolls.forEach((roll, i, a) => {
      if (values.includes(roll)) a[i] = this._rollDie();

      return roll
    });

    return this
  }
}

const dieSizes = [4, 6, 8, 10, 12, 20, 100];

/**
 * @class DiceRoller
 * @classdesc Rolls a set of dice
 * @property {Number} size The size of the dice being rolled
 * @property {Number} n The default number of dice to roll
 * @property {Number} toRoll Overrides `n` when necessary
 * @this DiceRolls
 */
class DiceRoller {
  /**
   * Rolls dice of given quantity and sice
   * @param {Object.<String, Number>} param0 The dice parameters
   * @param {Number} param0.n How many dice to roll
   * @param {Number} param0.size What size of dice to roll
   * @param {Boolean} param0.shouldInit If `this.init()` should be called
   */
  constructor({ n = 1, size, shouldInit = true } = { n: 1, shouldInit: true }) {
    this.n = n > 0 ? n : 1;
    this.size = size;
    this.toRoll = null;

    // this way a d4 can't roll a d8, but you don't need to call `roll()`
    // if you only want to roll a single die of any size.
    if (!size && shouldInit) this.init();
  }

  /**
   * Rolls a die
   * @param {Number} size The size of the die to roll
   * @return {DiceRolls} The result
   */
  d(size) {
    // cache the dice to roll
    const n = this.toRoll || this.n;
    // reset the property
    this.toRoll = null;
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
    this.toRoll = nToRoll > 0 ? nToRoll : 1;
    // Just roll the die if a size is set already
    if (this.size) return this.d(this.size)
    // Define standard dice
    const dice = { d: this.d.bind(this) };
    dieSizes.forEach(size => (dice[`d${size}`] = this._makeDie(size)));

    return dice
  }

  init() {
    dieSizes.forEach(size => (this[`d${size}`] = this._makeDie(size)));
  }
}

module.exports = DiceRoller;
