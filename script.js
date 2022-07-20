let firstOperand = "";
let secondOperand = "";
let currentOperation = null;
let screenReset = false;

const numberButtons = document.querySelectorAll("[data-number]");
const operatorButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.getElementById("equalsBtn");
const clearButton = document.getElementById("clearBtn");
const deleteButton = document.getElementById("deleteBtn");
const pointButton = document.getElementById("pointBtn");
const previousOperation = document.getElementById("previousOperationScreen");
const currentOperationScreen = document.getElementById("currentOperationScreen");

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

function resetScreen() {
  currentOperationScreen.textContent = "";
  screenReset = false;
};

function appendNumber(number) {
  if (currentOperationScreen.textContent === "0" || screenReset) resetScreen();
  currentOperationScreen.textContent += number;
};

function setOperator(operator) {
  if (currentOperation != null) evaluate();
  firstOperand = currentOperationScreen.textContent;
  currentOperation = operator;
  previousOperationScreen.textContent = `${firstOperand} ${currentOperation}`;
  screenReset = true;
};

function evaluate() {
  if (currentOperation == null || screenReset) {
    return;
  }
  if (currentOperation === "÷" && currentOperationScreen.textContent === '0') {
    alert('You cannot divide by 0!');
    return;
  }
  secondOperand = currentOperationScreen.textContent;
  currentOperationScreen.textContent = roundResult(
      operate(currentOperation, firstOperand, secondOperand)
  );
  previousOperationScreen.textContent = `${firstOperand} ${currentOperation} ${secondOperand} =`;
  currentOperation = null;
};

function clear() {
  currentOperationScreen.textContent = "0";
  previousOperationScreen.textContent = "";
  firstOperand = "";
  secondOperand = "";
  currentOperation = null;
};

function deleteNumber() {
  currentOperationScreen.textContent = currentOperationScreen.textContent
    .toString()
    .slice(0, -1);
};

function appendPoint() {
  if (screenReset) {
    return resetScreen();
  }
  if (currentOperationScreen.textContent === "") {
    return (secondOperand.textContent = "0");
  } else if (currentOperationScreen.textContent.includes(".")) return;
  currentOperationScreen.textContent += ".";
};

function roundResult(number) {
    return Math.round(number * 1000) / 1000;
};

function add(a, b) {
  return a + b;
};

function subtract(a, b) {
  return a - b;
};

function multiply(a, b) {
  return a * b;
};

function divide(a, b) {
  return a / b;
};

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
