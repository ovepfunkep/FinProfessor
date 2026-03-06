const args = process.argv.slice(2);
const profit = parseFloat(args[0]) || 0;
const volume = parseFloat(args[1]) || 0;
const broker = (args[2] || "tbank").toLowerCase();

let commissionRate = 0.003; // Default 0.3%
if (broker === "tbank") commissionRate = 0.003; // Standard tariff
else if (broker === "alfa") commissionRate = 0.001; // Example
else if (broker === "finam") commissionRate = 0.0005;

const ndflRate = profit > 5000000 ? 0.15 : 0.13;
const tax = profit > 0 ? profit * ndflRate : 0;
const commission = volume * commissionRate;

const netProfit = profit - tax - commission;

const result = {
    profit_gross: profit,
    tax_ndfl: tax,
    broker_commission: commission,
    profit_net: netProfit,
    broker_used: broker
};

console.log(JSON.stringify(result, null, 2));