const display = document.getElementById('display');
let currentInput = localStorage.getItem('currentInput') || '';
let operator = localStorage.getItem('operator') || '';
let previousInput = localStorage.getItem('previousInput') || '';

function updateDisplay() {
    display.textContent = currentInput || '0';
    localStorage.setItem('currentInput', currentInput);
    localStorage.setItem('operator', operator);
    localStorage.setItem('previousInput', previousInput);
}

document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');
        if (button.classList.contains('number')) {
            if (value === '(-)') {
                currentInput = currentInput.startsWith('-') ? currentInput.slice(1) : '-' + currentInput;
            } else {
                currentInput += value;
            }
        } else if (button.classList.contains('operator')) {
            if (currentInput !== '') {
                operator = value;
                previousInput = currentInput;
                currentInput = '';
            }
        } else if (button.id === 'equal') {
            if (previousInput && currentInput) {
                currentInput = eval(previousInput + operator + currentInput).toString();
                previousInput = '';
                operator = '';
            }
        } else if (button.id === 'clear') {
            currentInput = '';
            previousInput = '';
            operator = '';
            localStorage.clear();
        } else if (button.id === 'delete') {
            currentInput = currentInput.slice(0, -1);
        }
        updateDisplay();
    });
});

updateDisplay();