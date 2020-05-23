const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const allClearButton = document.querySelector('[data-all-clear]');
const deleteButton = document.querySelector('[data-delete]');
const previousOperand = document.querySelector('[data-previous-operand]');
const currentOperand = document.querySelector('[data-current-operand]');


let operations = [];
// after an operation is done make the previous result go to the previousOperand.
let changeToPreviousOperand = false;

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    updateDisplay(button.textContent);
  }) 
})

deleteButton.addEventListener('click', () => {
  deleteText();
});

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    // do not allow an operation button to be clicked on an 
    // operation in current operand
    if (!currentOperand.textContent){
      return;
    }
    else {
      updateDisplay(button.textContent);
    }
  });
});

allClearButton.addEventListener('click', () => {
  clearAll();
});

equalsButton.addEventListener('click', () => {
  operations.push(currentOperand.textContent);
  previousOperand.textContent = ''
  doOperations(operations);
  currentOperand.textContent = operations[0];
  operations.pop();
  changeToPreviousOperand = true;
})

const updateDisplay = (text) => {
  if (text == 'AC'){
    clearAll();
  }
  else if(text == 'DEL'){
    deleteText();
  }
  else if(checkOperation(text)){
    previousOperand.textContent += currentOperand.textContent + text;
    operations.push(currentOperand.textContent);
    operations.push(text);
    currentOperand.textContent = '';
    changeToPreviousOperand = false;
  }
  else {
    if (!changeToPreviousOperand){
      currentOperand.textContent += text;
    }
    // do not allow a number after a calculation (only symbols).
    else {
      return;
    }
  }
}

const deleteText = () => {
  // delete the last text element
  currentOperand.textContent = currentOperand.textContent.slice(0, 
    currentOperand.textContent.length - 1);
  // if currentOperand is empty after a calculation, a number can be clicked
  if (!currentOperand.textContent){
    changeToPreviousOperand = false;
  }
}

const checkOperation = (text) => {
  if (text == '+' || text == '-' || text == '*' || text == '÷'){
    return true;
  }

}


const doOperations = (arr) => {
  // the result for each function will be returned as an array.
  return doAdditions(doSubtractions(doMultiplications(doDivisions(arr))));
}

const doDivisions = (divisionArr) => {
  while (divisionArr.includes('÷')){
    // indexOf only returns the first occurence.
    const divisionIndex = divisionArr.indexOf('÷');
    const dividendIndex = divisionIndex - 1;
    const divisorIndex = divisionIndex + 1;

    const result = parseFloat(divisionArr[dividendIndex]) / parseFloat(divisionArr[divisorIndex]);

    // replace dividend, divisor and the division symbol with result.
    divisionArr.splice(dividendIndex, 3, result);
  }
  return divisionArr;
}

const doMultiplications = (multiplicationArr) => {
  while (multiplicationArr.includes('*')){
    const multiplicationIndex = multiplicationArr.indexOf('*');
    const firstNumberIndex = multiplicationIndex - 1;
    const secondNumberIndex = multiplicationIndex + 1;
    const product = parseFloat(multiplicationArr[firstNumberIndex]) * parseFloat(multiplicationArr[secondNumberIndex]);

    // replace the numbers and symbol with product.
    multiplicationArr.splice(firstNumberIndex, 3, product);
  }
  return multiplicationArr;
}

const doSubtractions = (subtractionArr) => {
  while (subtractionArr.includes('-')){
    const subtractionIndex = subtractionArr.indexOf('-');
    const firstNumberIndex = subtractionIndex - 1;
    const secondNumberIndex = subtractionIndex + 1;
    const result = parseFloat(subtractionArr[firstNumberIndex]) - parseFloat(subtractionArr[secondNumberIndex]);

    subtractionArr.splice(firstNumberIndex, 3, result);
  }
  return subtractionArr;
} 

const doAdditions = (additionArr) => {
  while (additionArr.includes('+')){
    const additionIndex = additionArr.indexOf('+');
    const firstNumberIndex = additionIndex - 1;
    const secondNumberIndex = additionIndex + 1;
    const result = parseFloat(additionArr[firstNumberIndex]) + parseFloat(additionArr[secondNumberIndex]);

    additionArr.splice(firstNumberIndex, 3, result);
  }
  return additionArr;
}

const clearAll = () => {
  operations = [];
  previousOperand.textContent = '';
  currentOperand.textContent = '';
  changeToPreviousOperand = false;  
}