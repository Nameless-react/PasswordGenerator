import { it, expect, describe } from "vitest";
import createPassword, { number, alpha, symbol } from "../passgen.js"
// import run, { ENTER } from 'inquirer-test';
// import { join } from "path";
 
describe("Generates the password with the parameters", () => {
    const length = 40
    let password = createPassword(length, true, true, false)

    // const savePath = join(__dirname, "../index.js")
    
    it("Generates correctly the password and with symbols and numbers", () => {
        expect(password).toHaveLength(length)
        expect(password).toMatch(new RegExp(`[${number}]+|${"\\" + symbol.split("").join("|\\")}`))
    })

    it("Generates correctly the password with symbols and letters", () => {
        password = createPassword(length, false, true, false);
        expect(password).toMatch(new RegExp(`[${alpha}}]+|${"\\" + symbol.split("").join("|\\")}`))
    })

    it("Generates correctly the password with number and letters", () => {
        password = createPassword(length, true, false, true);
        expect(password).toMatch(new RegExp(`[${number} ${alpha}]+`))
    })

    // it("The inputs work correctly", async () => {
    //     await run([savePath], ["s"])
    // })
})

