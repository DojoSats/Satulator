// Constants
const API_ENDPOINT = 'https://api.coingecko.com/api/v3/coins/markets';
const API_KEY = 'CG-LmSoAfDJS5VACYvrGmTkmFsM';
const SATOSHI_PER_BTC = 100000000;

// Elements
const usdInput = document.getElementById('usdInput');
const convertBtn = document.getElementById('convertBtn');
const resultDisplay = document.getElementById('resultDisplay');
const numpadButtons = document.querySelectorAll('.numpad button');

// Add event listeners to numpad buttons
numpadButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (button.textContent === '.' && usdInput.value.includes('.')) {
            return; // Prevent multiple decimal points
        }
        usdInput.value += button.textContent;
    });
});

// Convert USD to Satoshi
function convertUsdToSatoshi(usdAmount) {
    // Input validation
    if (!usdAmount || isNaN(usdAmount) || usdAmount <= 0) {
        showError("Please enter a valid USD amount.");
        return;
    }

    // Indicate loading
    showLoading();

    // Construct the API request URL with the API Key
    const requestURL = `${API_ENDPOINT}?vs_currency=usd&ids=bitcoin`;

    // Fetch the current rate
    fetch(requestURL, {
        method: 'GET',
        headers: {
            'x-cg-demo-api-key': API_KEY
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        let btcPerUsd = data[0].current_price;
        let satoshi = (usdAmount / btcPerUsd) * SATOSHI_PER_BTC;
        showResult(satoshi);
    })
    .catch(error => {
        console.error('Error fetching the conversion rate:', error);
        showError('Failed to fetch conversion rate. Please try again later.');
    });
}

// Add loading animation
function showLoading() {
    resultDisplay.innerHTML = '<div class="loading-spinner"></div>';
}

// Improve error handling
function showError(message) {
    resultDisplay.innerHTML = `<div class="error-message">${message}</div>`;
}

// Add animation to result display
function showResult(satoshi) {
    resultDisplay.innerHTML = `<div class="result-animation">${satoshi.toLocaleString('en-US', {maximumFractionDigits:0})} Satoshi</div>`;
}

// Event Listener for Convert Button
convertBtn.addEventListener('click', function() {
    convertUsdToSatoshi(parseFloat(usdInput.value));
});

// Event Listener for Enter key
usdInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        convertUsdToSatoshi(parseFloat(usdInput.value));
    }
});
