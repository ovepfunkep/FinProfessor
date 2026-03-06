// Mock analysis for geopolitical and market trends
const trends = {
    date: new Date().toISOString().split('T')[0],
    sectors: {
        moex: {
            trend: "Bullish for IT, Bearish for Exporters",
            details: "IT sector (Yandex, Ozon) continues to grow due to internal demand and government subsidies. Exporters suffer from strong ruble and sanctions.",
            top_pick: "Yandex"
        },
        real_estate: {
            trend: "Stagnant",
            details: "High key interest rate (21%+) makes mortgage unaffordable. Prices are stagnant, liquidity is low.",
            top_pick: "None"
        },
        alternatives: {
            trend: "Growing interest",
            details: "Crypto and NFTs are gaining popularity as alternative ways to store value and bypass cross-border payment issues.",
            top_pick: "Bitcoin / TON"
        }
    },
    conclusion: {
        best_investment: "Yandex Shares",
        term: "1 - 3 months",
        potential_profit: "15-20%",
        reasoning: "Anticipated release of new AI products and restructuring completion."
    }
};

console.log(JSON.stringify(trends, null, 2));