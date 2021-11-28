const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;
const operate = (operator, a, b) => operator(a, b)
const operatorMappings = {
    'add': add,
    'subtract': subtract,
    'multiply': multiply,
    'divide': divide, 
    '+': "add",
    '-': "subtract",
    '*': "multiply",
    '/': "divide", 
};
const screenText = document.querySelector(".screen p");
let display = '';
let firstValue = 0;
let secondValue = 0;
let symbol;
let operatorClicked = false;
let answer = 0;
decimalDisabled = false;

for (let i = 0; i < 10; i++) {
    document.getElementById(`number${i}`).addEventListener("click", displayNumber, false);
}
document.getElementById("decimal").addEventListener("click", displayNumber, false);
document.getElementById("decimal").addEventListener("click", disableDecimal, false);

function displayNumber(e) {
    if (display.length < 14) {
        display += e.target.value;
        screenText.textContent = display; 
    }
}

function disableDecimal() { 
    document.getElementById("decimal").disabled = true;
    decimalDisabled = true;
}

document.getElementById("add").addEventListener("click", enableSymbol, false);
document.getElementById("subtract").addEventListener("click", enableSymbol, false);
document.getElementById("multiply").addEventListener("click", enableSymbol, false);
document.getElementById("divide").addEventListener("click", enableSymbol, false);

function enableSymbol(e) {
    display = screenText.textContent;
    if (!operatorClicked && display.length > 0) {
        operatorClicked = true;
        firstValue = +display;
        document.getElementById(e.target.id).style.background = "red";
        display = '';
        screenText.textContent = '0'; 
        symbol = e.target.id;
    } else if (operatorClicked && display.length > 0) {
        calculate();
        document.getElementById(e.target.id).style.background = "red";
        symbol = e.target.id;
        display = '';
        operatorClicked = true;
    }
}

document.getElementById("equal").addEventListener("click", calculate, false);

function calculate() {
    if (operatorClicked && display.length > 0) {
        secondValue = +display;
        answer = operate(operatorMappings[symbol], firstValue, secondValue);
        display = `${Math.round(answer * 1000) / 1000}`;
        if (display == "Infinity") display = "NICE TRY";
        else if (display.length > 13) display = "TOO LONG"
        screenText.textContent = display;
        Array.from(document.getElementsByClassName("operator")).forEach(element => element.style.background = "rgba(255, 166, 0, 0.541)");
        firstValue = +display;
        display = '';
        if (display == "NICE TRY" || display == NaN) display = "";
        operatorClicked = false;
    }
}

document.getElementById("clear").addEventListener("click", clear, false);

function clear() {
    display = '';
    firstValue = 0;
    secondValue = 0;
    operatorClicked = false;
    answer = 0;
    screenText.textContent = "0";
    Array.from(document.getElementsByClassName("operator")).forEach(element => element.style.background = "rgba(255, 166, 0, 0.541)");
}

document.getElementById("delete").addEventListener("click", deleteNumber, false);

function deleteNumber() {
    if (display.length > 1) {
        display = display.slice(0, -1);
        screenText.textContent = display;
    } else if (screenText.textContent.length > 0) {
        screenText.textContent = screenText.textContent.slice(0, -1);
    } else {
        display = display.slice(0, -1);
        screenText.textContent = "0";
    }
    if (screenText.textContent.length == 0) screenText.textContent = "0";
}

document.addEventListener("keydown", keyboard, false);

function keyboard(e) {
    if (+e.key >= 0 && +e.key <= 9 || e.key == ".") {
        if (display.length < 14) {
            display += e.key;
            screenText.textContent = display; 
            if (e.key == '.' && decimalDisabled) deleteNumber();
            else if (e.key == '.' && !decimalDisabled) decimalDisabled = true; 
        }
    } 
    else if (e.key == "Backspace") deleteNumber();
    else if(e.key == "Enter") {
        e.preventDefault();
        e.stopPropagation();
        calculate();
    }
    else if (e.key == "+" || e.key == "-" || e.key == "*" || e.key == "/") keyboardEnableSymbol(operatorMappings[e.key]);
}

function keyboardEnableSymbol(keyboardOperator) {
    if (!operatorClicked && display.length > 0) {
        operatorClicked = true;
        firstValue = +display;
        document.getElementById(keyboardOperator).style.background = "red";
        display = '';
        screenText.textContent = '0'; 
        symbol = keyboardOperator;
    } else if (operatorClicked && display.length > 0) {
        calculate();
        document.getElementById(keyboardOperator).style.background = "red";
        symbol = keyboardOperator;
        display = '';
        operatorClicked = true;
    }
}