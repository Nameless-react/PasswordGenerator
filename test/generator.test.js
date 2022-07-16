import stdin from 'mock-stdin';
import { it, expect, describe, beforeAll, afterAll } from "vitest";
import createPassword, { number, alpha, symbol } from "../passgen.js"
import { saveAnswers } from "../index.js"

describe("generates the password with the parameters", () => {
    const length = 40
    let io = null;
    let password = createPassword(length, true, true, false)

    // beforeAll(() => (io = stdin()));
    // afterAll(() => io.restore());

    it("generates correctly the password and with symbols and numbers", () => {
        expect(password).toHaveLength(length)
        expect(password).toMatch(new RegExp(`[${number}]+|${"\\" + symbol.split("").join("|\\")}`))
    })

    it("generates correctly the password with symbols and letters", () => {
        password = createPassword(length, false, true, false);
        expect(password).toMatch(new RegExp(`[${alpha}}]+|${"\\" + symbol.split("").join("|\\")}`))
    })

    it("generates correctly the password with number and letters", () => {
        password = createPassword(length, true, false, true);
        expect(password).toMatch(new RegExp(`[${number} ${alpha}]+`))
    })

    test("Save the password", async done => {
        await stdin.send("y");
        await stdin.send("\x0D");

        expect(saveAnswers()).toBeDefined()
       
    })

    done()
})