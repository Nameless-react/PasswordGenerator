// const commander = require("commander");
// const chalk = require("chalk");
// const clipboardy = require("clipboardy");
// const fs = require("fs");
// const path = require("path");
// const os = require("os");
import { program }  from "commander";
import chalk from "chalk";
import clipboardy from "clipboardy";
import fs from "fs";
import path from "path";
import os from "os";

program.version("1.0.0").description("Password Generator by Joel Garcia (if you use the shorthand you do not need to use the equal sign, if you use the normal command and you want to customize your password use the equal sign)")

program
    .option("-l, --length <number>", "length of password", "8")
    .option("-s, --save <name>", "Save the password in a .txt document")
    .option("-nn, --no-numbers", "Make a password without numbers")
    .option("-ns, --no-symbols", "Make a password without symbols")
    .option("-nl, --no-letters", "Make a password without letters")
    .parse();

const {length, save, numbers, symbols, letters} = program.opts()
const alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
const number = '0123456789'
const symbol = '!@#$%^&*_-+='



const generatePassword = (length, characters) => {
    let password = ""
    for (let i = 0; i < length; i++) {
        password += characters.charAt(Math.floor(Math.random() * characters.length))
    };
    clipboardy.writeSync(password);
    return password
}



const createPassword = (length = 8, hasNumbers = true, hasSymbols = true, hasLetters = true) => {
    let characters = "";
    if (!hasLetters && !hasSymbols && !hasNumbers) {
        console.log(chalk.red("We cannot create a password without characters"));
        return "none";
    } else {
        hasNumbers ? (characters += number) :""
        hasSymbols ? (characters += symbol) :""
        hasLetters ? (characters += alpha) :""
        return generatePassword(length, characters);
    }
}

let generate = createPassword(length, numbers, symbols, letters);
if (generate === "none") {
    console.log(chalk.bold("Password: ") + chalk.red(generate))    
} else {
    console.log(chalk.bold("Password: ") + chalk.green(generate) + chalk.yellow("\nPassword copied to clipboard"));
}

if (save) {
    fs.open(path.join(__dirname, `${save}.txt`), "a", 666, (e, id) => {
        fs.write(id, generate + os.EOL, null, "utf-8", () => {
            fs.close(id, () => {
                console.log(chalk.green(`Password saved to ${save}.txt`))
            })
        })
    })
}