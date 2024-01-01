// Constants
const API_URL = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest';
const API_KEY = 'd846e90a-e8fa-4788-8eb4-bbd10d9f6a89';
const BTC_SYMBOL = 'BTC';
const USD_SYMBOL = 'USD';
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
    fetch(`${API_URL}?symbol=${BTC_SYMBOL}&convert=${USD_SYMBOL}`, {
        method: 'GET',
        headers: {
            'X-CMC_PRO_API_KEY': API_KEY,
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        // You need to adjust the following line based on the actual structure of the response
        let btcPerUsd = data.data[BTC_SYMBOL].quote[USD_SYMBOL].price;
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