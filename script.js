const display = document.getElementById('display');
const history = document.getElementById('history');
const buttons = document.querySelectorAll('button');

let currentInput = '';
let operator = '';
let firstValue = '';
let resetNext = false;

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.textContent;

    // Clear button
    if (value === 'AC') {
      currentInput = '';
      operator = '';
      firstValue = '';
      display.textContent = '0';
      history.textContent = '';
      return;
    }

    // Equals button
    if (value === '=') {
      if (firstValue && operator && currentInput) {
        try {
          const expression = `${firstValue}${operator}${currentInput}`;
          const result = eval(expression);
          history.textContent = expression;
          display.textContent = result;
          currentInput = result;
        } catch (error) {
          display.textContent = "Error";
          currentInput = '';
        }
        firstValue = '';
        operator = '';
        resetNext = true;
      }
      return;
    }

    // Operator buttons
    if (['+', '-', '*', '/'].includes(value)) {
      if (currentInput) {
        firstValue = currentInput;
        operator = value;
        history.textContent = `${firstValue} ${operator}`;
        currentInput = '';
        display.textContent = '0';
      }
      return;
    }

    // After result: start fresh if typing new number
    if (resetNext) {
      currentInput = '';
      resetNext = false;
    }

    // Append digits or dot
    currentInput += value;
    display.textContent = currentInput;
  });
});
