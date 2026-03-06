---
name: market-data-moex
description: Fetch current stock and bond quotes from the Moscow Exchange (MOEX). Use this skill when you need real-time or historical data for Russian stocks or bonds.
---

# Market Data MOEX

This skill retrieves market data from the Moscow Exchange API.

## Usage

Run the script with the ticker symbol to get the latest data:

```bash
node scripts/moex.js [ticker]
```

### Example

```bash
node scripts/moex.js SBER
```

The script will return JSON with the current price, 24h change, and volume. Use this raw data to inform your logical deductions.