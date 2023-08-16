
const { expect } = require("chai")
import { calculateTotalPrice } from "../../src/cart/handlers/addProductToCart"

console.log("test")
describe("Test calculateTotalPrice", () => {
    it.only("calc 3 items that cost 3 dollar", () => {
        const result1 = calculateTotalPrice(3, 3)
        expect(result1).equal(9)
    })
    it("Return 0 if price or quantity is not number", () => {
        const result2 = calculateTotalPrice("3", 3)
        expect(result2).equal(0)
        const result3 = calculateTotalPrice(3, "3")
        expect(result3).equal(0)
    })
})