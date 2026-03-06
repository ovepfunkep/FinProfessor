const ticker = process.argv[2] || "SBER";

// In a real scenario, this would use fetch('https://iss.moex.com/iss/engines/stock/markets/shares/boards/TQBR/securities.json')
// For now, we return mock data based on the requested ticker.
const mockData = {
    ticker: ticker.toUpperCase(),
    price: 250.45 + (Math.random() * 10 - 5), // slightly randomized
    change_percent: (Math.random() * 2 - 1).toFixed(2),
    volume: Math.floor(Math.random() * 1000000)
};

console.log(JSON.stringify(mockData, null, 2));