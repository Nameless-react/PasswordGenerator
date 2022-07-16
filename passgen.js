import clipboardy from "clipboardy";

export const alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
export const number = '0123456789'
export const symbol = '!@#$%^&*_-+=¡%/+'

export default (length = 8, hasNumbers = true, hasSymbols = true, hasLetters = true) => {
    let characters = "";
    let password = ""

    hasNumbers ? (characters += number) : "";
    hasSymbols ? (characters += symbol) : "";
    hasLetters ? (characters += alpha) : "";

    if (characters.length === 0) return null
    
    for (let i = 0; i < length; i++) {
        password += characters.charAt(Math.floor(Math.random() * characters.length))
    };

    clipboardy.writeSync(password);
    return password
}