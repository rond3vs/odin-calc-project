document.addEventListener("DOMContentLoaded", () => {
    const screen = document.getElementById("screen");
    const buttons = document.querySelectorAll(".btn");
    let currentInput = ""; 
    let previousInput = ""; 
    let operator = null; 

    // Handle button clicks
    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            const value = button.dataset.value;

            if (button.classList.contains("number") || button.classList.contains("decimal")) {
                handleNumber(value);
            } else if (button.classList.contains("operator")) {
                handleOperator(value);
            } else if (button.classList.contains("equals")) {
                calculate();
            } else if (button.classList.contains("clear")) {
                clearScreen();
            }
        });
    });

  
    function handleNumber(value) {
        if (currentInput === "0" && value !== ".") {
            currentInput = value; 
        } else if (value === "." && currentInput.includes(".")) {
            return; 
        } else {
            currentInput += value; 
        }
        updateScreen(currentInput);
    }

    // Handle operators (+, -, *, /)
    function handleOperator(value) {
        if (currentInput === "") return;
        if (previousInput && operator) calculate();

        operator = value;
        previousInput = currentInput;
        currentInput = "";
    }

    // Perform calculation
    function calculate() {
        if (!previousInput || !currentInput || !operator) return;

        const a = parseFloat(previousInput);
        const b = parseFloat(currentInput);

        let result;

        switch (operator) {
            case "+":
                result = a + b;
                break;
            case "-":
                result = a - b;
                break;
            case "*":
                result = a * b;
                break;
            case "/":
                result = b !== 0 ? a / b : "Error"; 
                break;
            default:
                return;
        }

        currentInput = result.toString(); 
        previousInput = ""; 
        operator = null; 

        updateScreen(currentInput);
    }

  
    function clearScreen() {
        currentInput = "";
        previousInput = "";
        operator = null;

        updateScreen("0");
    }

    
    function updateScreen(value) {
        screen.textContent = value.substring(0, 12);
    }
});
