# Perpl Explainers

Technical deep-dives into Perpl's exchange architecture. Hosted at [perplfoundation.github.io/explainers](https://perplfoundation.github.io/explainers/).

## Explainers

- **[Change vs Post/Cancel](https://perplfoundation.github.io/explainers/change-order/)** — How Perpl's native Change order keeps the book full on Monad's parallel execution engine
- **[Virtualized Funding](https://perplfoundation.github.io/explainers/funding/overview.html)** — How Perpl settles funding for 100,000+ positions with two storage reads instead of 100,000 writes
- **[Number Systems](https://perplfoundation.github.io/explainers/numbers/overview.html)** — CNS, PNS, LNS, ONS: the four integer representations powering the exchange, and the precision tradeoff baked into every market
- **[Withdrawal Rate Limiter](https://perplfoundation.github.io/explainers/security/overview.html)** — How the protocol caps fund outflows to survive an exploit — burst window, linear refill, bypass addresses, and owner force reset
- **[Order Book Data Structure](https://perplfoundation.github.io/explainers/order-book/overview.html)** — How Perpl achieves O(1) insert and cancel on a fully on-chain CLOB — and why sorted-tree alternatives scale in cost with book depth
- **[Leverage Descent](https://perplfoundation.github.io/explainers/leverage-descent/overview.html)** — How Perpl bounds open interest and descends leverage as a market fills, so a position opened near the cap is over-collateralised enough to cover itself
- **[Page-ified Storage (MIP-8)](https://perplfoundation.github.io/explainers/page-storage/overview.html)** — Whether Monad's MIP-8 page-storage upgrade would cut Perpl's gas, mapping each on-chain struct onto a 128-slot page — and why aggressive bit-packing already captured most of the win
