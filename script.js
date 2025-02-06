const display = document.getElementById('display');
let currentInput = '';
let operator = '';
let previousInput = '';

document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');
        if (button.classList.contains('number')) {
            currentInput += value;
        } else if (button.classList.contains('operator')) {
            if (currentInput !== '') {
                operator = value;
                previousInput = currentInput;
                currentInput = '';
            }
        } else if (button.id === 'equal') {
            if (previousInput && currentInput) {
                currentInput = eval(previousInput + operator + currentInput);
                previousInput = '';
                operator = '';
            }
        } else if (button.id === 'clear') {
            currentInput = '';
            previousInput = '';
            operator = '';
        } else if (button.id === 'delete') {
            currentInput = currentInput.slice(0, -1);
        }
        display.textContent = currentInput || '0';
    });
});