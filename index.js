#!/usr/bin/env node
import { program }  from "commander";
import chalk from "chalk";
import inquirer from "inquirer";
import fs from "fs";
import path from "path";
const __dirname = path.resolve();
import createPassword from "./passgen.js"
import os from "os";

program.version("1.6.0").description("Password Generator by Joel Garcia")

program
    .option("-l, --length <number>", "length of password", "8")
    .option("-nn, --no-numbers", "Make a password without numbers")
    .option("-ns, --no-symbols", "Make a password without symbols")
    .option("-nl, --no-letters", "Make a password without letters")
    .parse();

const { length, numbers, symbols, letters } = program.opts()

const alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
const number = '0123456789'
const symbol = '!@#$%^&*_-+=¡%/+'

export const saveAnswers = async () => {
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
                message: "What name you want for your file?",
            }
        ]); 
        return { name, save }   
    };

    return { save };
};


const { name, save } = await saveAnswers();

const generate = createPassword(length, numbers, symbols, letters);
!generate ? console.log(chalk.red("We cannot create a password without characters")) : console.log(chalk.bold("Password: ") + chalk.green(generate) + chalk.yellow("\nPassword copied to clipboard"));  


if (save) {
    fs.open(path.join(`${os.homedir}/Desktop`, `${name}.txt`), "a", 0o666, (e, id) => {
        fs.write(id, `${generate}\n`, null, "utf-8", () => {
            fs.close(id, () => {
                console.log(chalk.green(`Password saved to ${os.homedir}/Desktop/${name}.txt/`))
            })
        })
    })
}