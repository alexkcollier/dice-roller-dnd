const dice_roller = require("./dice-roller")
// @ponicode
describe("d", () => {
    let inst

    beforeEach(() => {
        inst = new dice_roller.default()
    })

    test("0", () => {
        let callFunction = () => {
            inst.d(2)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            inst.d(1)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            inst.d(16)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            inst.d(10)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            inst.d(1000)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            inst.d(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("init", () => {
    let inst

    beforeEach(() => {
        inst = new dice_roller.default()
    })

    test("0", () => {
        let callFunction = () => {
            inst.init()
        }
    
        expect(callFunction).not.toThrow()
    })
})
