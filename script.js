// Move the API key to a secure location (e.g., config file or environment variable)
const apiKey = 'QTHrvO2TrXBqiUMQjCyXss6aQkMJAq8y';

async function getStockData() {
    const symbol = document.getElementById("symbol").value;

    if (symbol === "") {
        alert("Please enter a stock symbol.");
        return;
    }

    try {
        const response = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`);
        const data = await response.json();

        if (data['Global Quote'] && Object.keys(data['Global Quote']).length) {
            const stockData = data['Global Quote'];
            displayStockData(symbol, stockData);
        } else {
            alert("Stock data not found. Please try again.");
        }
    } catch (error) {
        alert("Error retrieving stock data. Please try again.");
        console.error('Error:', error);
    }
}

function displayStockData(symbol, stockData) {
    const result = document.getElementById("result");
    result.innerHTML = `
        <h2>${symbol} Stock Data</h2>
        <p>Open: ${stockData['02. open']}</p>
        <p>High: ${stockData['03. high']}</p>
        <p>Low: ${stockData['04. low']}</p>
        <p>Price: ${stockData['05. price']}</p>
        <p>Volume: ${stockData['06. volume']}</p>
        <p>Last Refreshed: ${stockData['07. latest trading day']}</p>
    `;
}
