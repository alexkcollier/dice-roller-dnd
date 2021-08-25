const dice_rolls = require("./dice-rolls")
// @ponicode
describe("advantage", () => {
    let inst

    beforeEach(() => {
        inst = new dice_rolls.default()
    })

    test("0", () => {
        let callFunction = () => {
            inst.advantage()
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("reroll", () => {
    let inst

    beforeEach(() => {
        inst = new dice_rolls.default()
    })

    test("0", () => {
        let callFunction = () => {
            inst.reroll(["elio@example.com", "Elio", "Dillenberg"])
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            inst.reroll(1)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            inst.reroll(-100)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            inst.reroll(-5.48)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            inst.reroll(0)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            inst.reroll(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})
