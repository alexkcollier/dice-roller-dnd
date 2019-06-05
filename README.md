# dice-roller-dnd

[![Greenkeeper badge](https://badges.greenkeeper.io/alexkcollier/dice-roller-dnd.svg)](https://greenkeeper.io/)

A basic dice roller fo DnD 5e. Works in evergreen browsers, Node, and should work back to IE11.

## Usage

For generic dice:

```js
import DiceRoller from 'dice-roller-dnd'

// Create a generic roller
const dice = new DiceRoller()

// Roll 1d20
dice.d20() /* or */  dice.roll().d20()

// Roll 3d8
dice.roll(3).d8()

// Roll any size die
dice.d(123988) /* or */ dice.roll(2039).d(123988)
```

You can also pass a die size and a quantity of that die to roll to the constructor. The standard set
of dice is supported with their own methods (i.e.: `d4()`, `d6()`, `d8()`, `d10()`, `d20()`, `d100()`).

```js
const d20 = new DiceRoller({ size: 20 }) // or just alias the `d20()` method
const d4 = new DiceRoller({ size: 4 })
const d100 = new DiceRoller({ size: 100 })
const dice4d6 = new DiceRoller({ n: 4, size: 6 }) // `n` defaults to 1

d20.roll()
d4.roll()
d100.roll()
dice4d6.roll()
```

Each `DiceRoller` returns a `DiceRolls` if its `d()`, `dN()`, or `roll()` methods are called.

**Important:** If the `DiceRoller` has been not had its size set, you _must_ call one of the die
method after `roll()`.

`DiceRolls` expose the following properties and methods:

- Properties and Getters
  - `size`: the size of the die.
  - `rolls`: an array of all the die rolls.
  - `sorted` (getter): `rolls` sorted from smallest to largest.
  - `total` (getter): the sum of `rolls`.
- Methods
  - `advantage()`: Returns the highest roll. Does not check dice quantity of size.
  - `disadvantage()`: Returns the lowest roll. Does not check dice quantity of size.
  - `keepHighest(amount)`: Returns the `<amount>` largest values. Defaults to 1.
  - `keepLowest(amount)`: Returns the `<amount>` smallest values. Defaults to 1.
  - `reroll(...values)`: Rerolls the specified numbers in `rolls`, and updates `rolls`.
