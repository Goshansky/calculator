const display = document.getElementById('display');
let expression = localStorage.getItem('expression') || '';
let hasError = false; // Флаг ошибки

function updateDisplay() {
    display.textContent = expression || '0';
    localStorage.setItem('expression', expression);
}

document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', () => {
        if (hasError && button.id !== 'clear') return; // Игнорируем ввод, если ошибка

        const value = button.getAttribute('data-value');

        if (button.classList.contains('number')) {
            expression += value;
        } else if (button.classList.contains('operator')) {
            if (value === '**') {
                // Автоматически добавляем скобки для отрицательных чисел перед возведением в степень
                const match = expression.match(/(-?\d+(\.\d+)?)$/);
                if (match) {
                    expression = expression.slice(0, -match[0].length) + `(${match[0]})` + value;
                }
            } else {
                expression += value;
            }
        } else if (button.id === 'equal') {
            try {
                expression = eval(expression).toString();
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
