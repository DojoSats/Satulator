// Constants
const API_URL = 'https://api.coingecko.com/api/v3/coins/markets';
const API_KEY = 'CG-LmSoAfDJS5VACYvrGmTkmFsM'; // Your API Key
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

    // Construct the API request URL with the API Key
    const requestURL = `${API_URL}?vs_currency=${USD_SYMBOL}&ids=${BTC_ID}&x_cg_demo_api_key=${API_KEY}`;

    // Fetch the current rate
    fetch(requestURL, {
        method: 'GET'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        // Assuming the response structure is [{...}]
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
