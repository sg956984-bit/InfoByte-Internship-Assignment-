
const calculator = {
    displayValue: '0',
    firstOperand: null,
    waitingForSecondOperand: false,
    operator: null,
};

// Function to update the calculator's display
function updateDisplay() {
    const display = document.querySelector('.calculator-screen');
    display.value = calculator.displayValue;
}

// Function to handle number and decimal input
function inputDigit(digit) {
    const { displayValue, waitingForSecondOperand } = calculator;

    if (waitingForSecondOperand === true) {
        // Start a new operand if we just pressed an operator
        calculator.displayValue = digit;
        calculator.waitingForSecondOperand = false;
    } else {
        // If display is '0', replace it; otherwise, append the digit
        calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
    }
    updateDisplay();
}


function inputDecimal(dot) {

    if (!calculator.displayValue.includes(dot)) {
        calculator.displayValue += dot;
    }
    updateDisplay();
}

function handleOperator(nextOperator) {
    const { firstOperand, displayValue, operator } = calculator;
    // Convert the current display value to a number
    const inputValue = parseFloat(displayValue);


    if (operator && calculator.waitingForSecondOperand) {
        calculator.operator = nextOperator;
        return;
    }

    if (firstOperand === null) {

        calculator.firstOperand = inputValue;
    } else if (operator) {

        const result = performCalculation[operator](firstOperand, inputValue);


        calculator.displayValue = String(result);
        calculator.firstOperand = result;
    }
    calculator.waitingForSecondOperand = true;
    calculator.operator = nextOperator;
    updateDisplay();
}

// Object containing the core mathematical functions
const performCalculation = {
    '/': (firstOperand, secondOperand) => firstOperand / secondOperand,
    '*': (firstOperand, secondOperand) => firstOperand * secondOperand,
    '+': (firstOperand, secondOperand) => firstOperand + secondOperand,
    '-': (firstOperand, secondOperand) => firstOperand - secondOperand,
};

// Function to reset the calculator's state
function resetCalculator() {
    calculator.displayValue = '0';
    calculator.firstOperand = null;
    calculator.waitingForSecondOperand = false;
    calculator.operator = null;
    updateDisplay();
}

// Event listener setup
const keys = document.querySelector('.calculator-keys');
keys.addEventListener('click', (event) => {
    // Determine what button was clicked
    const { target } = event;
    const { value } = target;

    // Check if the clicked element is a button
    if (!target.matches('button')) {
        return;
    }

    // Handle different button types using a switch statement
    switch (value) {
        case '+':
        case '-':
        case '*':
        case '/':
            handleOperator(value);
            break;
        case '=':
            // Calculate the final result
            handleOperator(calculator.operator);

            calculator.waitingForSecondOperand = true;
            calculator.operator = null;
            break;
        case '.':
            inputDecimal(value);
            break;
        case 'all-clear':
            resetCalculator();
            break;
        default:
            // Handle numeric input
            if (Number.isInteger(parseFloat(value))) {
                inputDigit(value);
            }
    }
});


updateDisplay();