#!/usr/bin/env node
import { program }  from "commander";
import chalk from "chalk";
import clipboardy from "clipboardy";
import inquirer from "inquirer";
import fs from "fs";
import path from "path";
import os from "os";
const __dirname = path.resolve();

program.version("1.5.0").description("Password Generator by Joel Garcia, if you use the shorthand you do not need to use the equal sign")

program
    .option("-l, --length <number>", "length of password", "8")
    .option("-nn, --no-numbers", "Make a password without numbers")
    .option("-ns, --no-symbols", "Make a password without symbols")
    .option("-nl, --no-letters", "Make a password without letters")
    .parse();

const {length, numbers, symbols, letters} = program.opts()
const alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
const number = '0123456789'
const symbol = '!@#$%^&*_-+=¡%/+'

const SaveAnswers = async () => {
    const { save } = await inquirer.prompt([
        {
            type: "confirm",
            name: "save",
            message: "Do you want to save your password?",
        }
        
    ]);
    if (save) {
        const { name } = await inquirer.prompt([
            {
                type: "input",
                name: "name",
                message: "What do you want to name your file?",
            }
        ]); 
        return { name, save }   
    };

    return { save };
};

const { name, save } = await SaveAnswers();

const generatePassword = (length, characters) => {
    if (characters.length === 0) return "none"
    let password = ""
    for (let i = 0; i < length; i++) {
        password += characters.charAt(Math.floor(Math.random() * characters.length))
    };
    clipboardy.writeSync(password);
    return password
}



const createPassword = (length = 8, hasNumbers = true, hasSymbols = true, hasLetters = true) => {
    let characters = "";

    hasNumbers ? (characters += number) : "";
    hasSymbols ? (characters += symbol) : "";
    hasLetters ? (characters += alpha) : "";

    return generatePassword(length, characters);
}


const generate = createPassword(length, numbers, symbols, letters);
generate === "none" ? console.log(chalk.red("We cannot create a password without characters")) : console.log(chalk.bold("Password: ") + chalk.green(generate) + chalk.yellow("\nPassword copied to clipboard"));  


if (save) {
    fs.open(path.join(__dirname, `${name}.txt`), "a", 0o666, (e, id) => {
        fs.write(id, `${generate}\n`, null, "utf-8", () => {
            fs.close(id, () => {
                console.log(chalk.green(`Password saved to ${name}.txt`))
            })
        })
    })
}