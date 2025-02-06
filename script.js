const display = document.getElementById('display');
let expression = localStorage.getItem('expression') || '';
let hasError = false;

function updateDisplay() {
    display.textContent = expression || '0';
    localStorage.setItem('expression', expression);
}

document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', () => {
        if (hasError && button.id !== 'clear') return;

        const value = button.getAttribute('data-value');
        const lastChar = expression.slice(-1);

        if (button.classList.contains('number')) {
            expression += value;
        } else if (button.classList.contains('operator')) {
            if (['+', '/', '*', '**'].includes(value)) {
                // Запрещаем оператор в начале или после другого оператора
                if (expression === '' || ['+', '/', '*', '**', '-'].includes(lastChar)) return;
            }
            if (value === '-') {
                // Разрешаем минус в начале, но не допускаем несколько подряд
                if (expression === '-' || ['+', '/', '*', '**', '-'].includes(lastChar)) return;
            }
            expression += value;
        } else if (button.id === 'equal') {
            try {
                let result = eval(expression);
                if (!isFinite(result)) throw new Error('Infinity');
                expression = result.toString();
                hasError = false;
            } catch {
                expression = 'Ошибка';
                hasError = true;
            }
        } else if (button.id === 'clear') {
            expression = '';
            hasError = false;
            localStorage.clear();
        } else if (button.id === 'delete') {
            expression = expression.slice(0, -1);
        }
        updateDisplay();
    });
});

updateDisplay();

