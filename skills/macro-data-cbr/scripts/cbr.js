// Mock data for Central Bank of Russia
const cbrData = {
    date: new Date().toISOString().split('T')[0],
    key_rate: 21.0,
    inflation_official: 8.5,
    inflation_expected: 10.0,
    usd_rub: 105.50
};

console.log(JSON.stringify(cbrData, null, 2));