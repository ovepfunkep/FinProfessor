---
name: tax-calculator-ru
description: Calculate Russian taxes (NDFL 13% / 15%) and broker commissions for trades.
---

# Tax Calculator RU

Calculate taxes and commissions for trades on MOEX.

## Usage

Provide the profit amount and total transaction volume:

```bash
node scripts/tax.js [profit] [volume] [broker]
```

### Example

```bash
node scripts/tax.js 50000 1000000 tbank
```

Brokers: `tbank`, `alfa`, `finam`.