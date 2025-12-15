document.addEventListener('DOMContentLoaded', () => {
    // 1. Get references to the HTML elements
    const tempInput = document.getElementById('tempInput');
    const fromUnit = document.getElementById('fromUnit');
    const toUnit = document.getElementById('toUnit');
    const convertBtn = document.getElementById('convertBtn');
    const resultOutput = document.getElementById('resultOutput');
    const errorMessage = document.getElementById('error-message');

    // 2. Main Conversion Function
    function convertTemperature() {
        const inputStr = tempInput.value.trim();
        const from = fromUnit.value;
        const to = toUnit.value;
        
        // --- Input Validation (1st Step) ---
        // Check if the input is empty
        if (inputStr === '') {
            errorMessage.textContent = 'Please enter a temperature value.';
            resultOutput.textContent = '---';
            return;
        }

        // Check if the input is a valid number
        const temp = Number(inputStr);
        if (isNaN(temp)) {
            errorMessage.textContent = 'Invalid input. Please enter a number.';
            resultOutput.textContent = '---';
            return;
        }

        // Clear error message if validation passes
        errorMessage.textContent = '';
        
        let convertedTemp = 0;

        // --- Core Conversion Logic ---
        
        // Step A: Convert the input temperature TO CELSIUS first. 
        // This acts as the intermediate standard unit.
        let tempInCelsius;

        if (from === 'celsius') {
            tempInCelsius = temp;
        } else if (from === 'fahrenheit') {
            // F to C: (F - 32) * 5/9
            tempInCelsius = (temp - 32) * (5 / 9);
        } else if (from === 'kelvin') {
            // K to C: K - 273.15
            tempInCelsius = temp - 273.15;
        }

        // Step B: Convert the intermediate Celsius value TO the target unit.
        if (to === 'celsius') {
            convertedTemp = tempInCelsius;
        } else if (to === 'fahrenheit') {
            // C to F: (C * 9/5) + 32
            convertedTemp = (tempInCelsius * (9 / 5)) + 32;
        } else if (to === 'kelvin') {
            // C to K: C + 273.15
            convertedTemp = tempInCelsius + 273.15;
        }

        // 3. Format and Display the Result

        // Determine the correct unit symbol
        let unitSymbol;
        if (to === 'celsius') {
            unitSymbol = '°C';
        } else if (to === 'fahrenheit') {
            unitSymbol = '°F';
        } else {
            unitSymbol = 'K';
        }
        
        // Round the result to two decimal places
        const formattedResult = convertedTemp.toFixed(2);
        
        // Update the display area
        resultOutput.textContent = `${formattedResult} ${unitSymbol}`;
    }

    // 4. Attach the event listener to the "Convert" button
    convertBtn.addEventListener('click', convertTemperature);

    // Also allow conversion on 'Enter' key press in the input field
    tempInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            convertTemperature();
        }
    });

    // Optional: Add a simple input check on keyup to immediately show an error
    tempInput.addEventListener('keyup', () => {
        const inputStr = tempInput.value.trim();
        const temp = Number(inputStr);
        if (inputStr !== '' && isNaN(temp)) {
             errorMessage.textContent = 'Invalid input. Please enter a number.';
        } else {
            errorMessage.textContent = '';
        }
    });
});