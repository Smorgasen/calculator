function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(operator, a, b) {
    a = Number(a);
    b = Number(b);
    if (operator == '+') {
        return add(a, b);b;
    }
    else if (operator == '-') {
        return subtract(a, b);
    }
    else if (operator == 'x') {
        return multiply(a, b);
    }
    else if (operator == '÷') {
        if (b === 0) return null;
        else return divide(a, b);
    }
}

const numberButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.getElementById('equalsBtn');
const clearButton = document.getElementById('clearBtn');
const deleteButton = document.getElementById('deleteBtn');
const pointButton = document.getElementById('pointBtn');
const lastOperationScreen = document.getElementById('lastOperationScren');
const currentOperationScreen = document.getElementById('currentOperationScreen');

let previousOperand = '';
let currentOperand = '';
let currentOperation = null;
let screenReset = false;

numberButtons.forEach(button =>
    button.addEventListener('click', () => appendNumber(button.textContent))
);
operatorButtons.forEach(button =>
    button.addEventListener('click', () => setOperator(button.textContent))
);
equalsButton.addEventListener('click', evaluate);
clearButton.addEventListener('click', clear);
deleteButton.addEventListener('click', deleteNumer);
pointButton.addEventListener('click', appendPoint);



