// Constants
const API_URL = 'https://api.coingecko.com/api/v3/coins/markets';
const BTC_ID = 'bitcoin'; // Bitcoin's ID on CoinGecko
const USD_SYMBOL = 'usd';
const SATOSHI_PER_BTC = 100000000;

// Elements
const usdInput = document.getElementById('usdInput');
const convertBtn = document.getElementById('convertBtn');
const resultDisplay = document.getElementById('resultDisplay');

// Convert USD to Satoshi
function convertUsdToSatoshi(usdAmount) {
    // Input validation
    if (!usdAmount || isNaN(usdAmount) || usdAmount <= 0) {
        alert("Please enter a valid USD amount.");
        return;
    }

    // Indicate loading
    resultDisplay.innerText = 'Fetching conversion rate...';

    // Fetch the current rate
    fetch(`${API_URL}?vs_currency=${USD_SYMBOL}&ids=${BTC_ID}`, {
        method: 'GET'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        // Use the current_price from the response data structure
        let btcPerUsd = data[0].current_price; // Accessing the current price
        let satoshi = (usdAmount / btcPerUsd) * SATOSHI_PER_BTC;
        resultDisplay.innerText = `${satoshi.toLocaleString('en-US', {maximumFractionDigits:0})} Satoshi`;
    })
    .catch(error => {
        console.error('Error fetching the conversion rate:', error);
        resultDisplay.innerText = 'Failed to fetch conversion rate. Please try again later.';
    });
}

// Event Listener for Convert Button
convertBtn.addEventListener('click', function() {
    convertUsdToSatoshi(usdInput.value);
});
