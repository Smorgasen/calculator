// Pronounce empty numbers, operator and default reset value
let firstOperand = "";
let secondOperand = "";
let currentOperation = null;
let screenReset = false;

// Select buttons and result screen
const numberButtons = document.querySelectorAll("[data-number]");
const operatorButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.getElementById("equalsBtn");
const clearButton = document.getElementById("clearBtn");
const deleteButton = document.getElementById("deleteBtn");
const pointButton = document.getElementById("pointBtn");
const previousOperation = document.getElementById("previousOperationScreen");
const currentOperationScreen = document.getElementById("currentOperationScreen");

// Listen to buttons and use appropriate functions (add numbers to screen, add operator to screen, evaluate, clear, delete one digit, add point)
numberButtons.forEach((button) =>
  button.addEventListener("click", () => appendNumber(button.textContent))
);
operatorButtons.forEach((button) =>
  button.addEventListener("click", () => setOperator(button.textContent))
);
equalsButton.addEventListener("click", evaluate);
clearButton.addEventListener("click", clear);
deleteButton.addEventListener("click", deleteNumber);
pointButton.addEventListener("click", appendPoint);

// Reset screen after operator to enter new number from scratch
function resetScreen() {
  currentOperationScreen.textContent = "";
  screenReset = false;
};

// Add number to screen
function appendNumber(number) {
  if (currentOperationScreen.textContent === "0" || screenReset) resetScreen();
  currentOperationScreen.textContent += number;
};

// Add operator and last equation screen
function setOperator(operator) {
  if (currentOperation != null) evaluate();
  firstOperand = currentOperationScreen.textContent;
  currentOperation = operator;
  previousOperationScreen.textContent = `${firstOperand} ${currentOperation}`;
  screenReset = true;
};

// Evaluate and disallow diving by 0
function evaluate() {
  if (currentOperation == null || screenReset) {
    return;
  }
  if (currentOperation === "÷" && currentOperationScreen.textContent === '0') {
    alert('Division by 0 is not allowed!');
    return;
  }
  secondOperand = currentOperationScreen.textContent;
  currentOperationScreen.textContent = roundResult(
      operate(currentOperation, firstOperand, secondOperand)
  );
  previousOperationScreen.textContent = `${firstOperand} ${currentOperation} ${secondOperand} =`;
  currentOperation = null;
};

// Clear all
function clear() {
  currentOperationScreen.textContent = "0";
  previousOperationScreen.textContent = "";
  firstOperand = "";
  secondOperand = "";
  currentOperation = null;
};

// Remove last digit from current screen
function deleteNumber() {
  currentOperationScreen.textContent = currentOperationScreen.textContent
    .toString()
    .slice(0, -1);
};

// Add point and do not add more than one
function appendPoint() {
  if (screenReset) {
    return resetScreen();
  }
  if (currentOperationScreen.textContent === "") {
    return (secondOperand.textContent = "0");
  } else if (currentOperationScreen.textContent.includes(".")) return;
  currentOperationScreen.textContent += ".";
};

// Round result by 3 digits after point
function roundResult(number) {
    return Math.round(number * 1000) / 1000;
};

// Add numbers
function add(a, b) {
  return a + b;
};

// Subtract numbers
function subtract(a, b) {
  return a - b;
};

// Multiply numbers
function multiply(a, b) {
  return a * b;
};

// Divide numbers
function divide(a, b) {
  return a / b;
};

// Calculate using user input of operator button
function operate(operator, a, b) {
  a = Number(a);
  b = Number(b);
  if (operator == "+") {
    return add(a, b);
  } else if (operator == "-") {
    return subtract(a, b);
  } else if (operator == "x") {
    return multiply(a, b);
  } else if (operator == "÷") {
    if (b === 0) return null;
    else return divide(a, b);
  }
};

let copyright = document.querySelector('.copyright');
copyright.textContent = `Copyright © ${new Date().getFullYear()} Smorgasen`;